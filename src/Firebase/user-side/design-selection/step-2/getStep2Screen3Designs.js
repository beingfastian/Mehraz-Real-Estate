"use server";
import { db, storage } from "@/Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import replaceFamilyUnitIdWithDoc from "../replaceFamilyUnitIdWithDoc";
import replaceAreaIdWithDoc from "../replaceAreaIdWithDoc";
import replaceFloorIdWithDoc from "../replaceFloorIdWithDoc";

const getStep2Screen3Designs = async (
  areaParam,
  floorParam,
  familyUnitParam,
  requirementsParam,
  // Additional params from search
  categoryParam,
  cityParam,
  styleParam,
  styleCostParam,
  budgetParam, // assuming budget is also passed
) => {
  const designsCollectionRef = collection(db, "RP_DESIGNS");
  const designs = [];

  try {
    // Build base query (keep existing filtering for performance)
    let designQuery = designsCollectionRef;

    // Apply basic filters first for performance
    if (areaParam) {
      designQuery = query(designQuery, where("areaId", "==", areaParam));
    }
    if (floorParam) {
      designQuery = query(designQuery, where("floorId", "==", floorParam));
    }
    if (familyUnitParam) {
      designQuery = query(
        designQuery,
        where("familyUnitId", "==", familyUnitParam),
      );
    }
    if (cityParam) {
      designQuery = query(
        designQuery,
        where("cities", "array-contains-any", [cityParam, "GENERAL"]),
      );
    }

    const querySnapshot = await getDocs(designQuery);

    // Process documents with error handling for each
    await Promise.all(
      querySnapshot.docs.map(async doc => {
        try {
          const docData = doc.data();
          const designId = doc.id;
          const storageBasePath = `RP_DESIGNS/${designId}`;

          // Get primary image
          const imageRef = ref(storage, `${storageBasePath}/image`);
          const imageUrl = await getDownloadURL(imageRef).catch(() => null);

          designs.push({
            id: designId,
            area: await replaceAreaIdWithDoc(docData.areaId),
            floors: await replaceFloorIdWithDoc(docData.floorId),
            familyUnit: await replaceFamilyUnitIdWithDoc(docData.familyUnitId),
            description: docData.description,
            designCost: docData.designCost,
            constructionCost: docData.constructionCost,
            cities: docData.cities,
            styleId: docData.styleId,
            image: imageUrl,
            // Store raw data for scoring
            rawData: docData,
          });
        } catch (error) {
          console.error(`Error processing design ${doc.id}:`, error);
        }
      }),
    );

    // Apply scoring algorithm
    const scoredDesigns = designs.map(design => ({
      ...design,
      matchScore: calculateMatchScore(design, {
        areaParam: parseFloat(areaParam),
        floorParam: parseInt(floorParam),
        familyUnitParam: parseInt(familyUnitParam),
        styleParam,
        cityParam,
        budgetParam: parseFloat(budgetParam),
        requirementsParam,
      }),
    }));

    // Sort by match score (highest first)
    scoredDesigns.sort((a, b) => b.matchScore - a.matchScore);

    // Format costs for display
    return scoredDesigns.map(design => ({
      ...design,
      designCost: formatCost(design.designCost),
      constructionCost: formatCost(design.constructionCost),
    }));
  } catch (error) {
    console.error("Error getting design data:", error);
    throw new Error("Failed to fetch design data. Please try again.");
  }
};

// Scoring algorithm implementation
const calculateMatchScore = (design, userParams) => {
  let score = 0;

  // Area scoring (30 points max)
  if (userParams.areaParam && design.area?.value) {
    const designArea = parseFloat(design.area.value);
    const userArea = userParams.areaParam;

    if (designArea === userArea) {
      score += 30;
    } else if (isWithinPercentage(designArea, userArea, 10)) {
      score += 20;
    }
  }

  // Budget scoring (25 points max) - using construction cost as primary budget
  if (userParams.budgetParam && design.constructionCost) {
    const designBudget = design.constructionCost;
    const userBudget = userParams.budgetParam;

    if (designBudget === userBudget) {
      score += 25;
    } else if (isWithinPercentage(designBudget, userBudget, 10)) {
      score += 18;
    } else if (isWithinPercentage(designBudget, userBudget, 20)) {
      score += 10;
    }
  }

  // Floor scoring (20 points max)
  if (userParams.floorParam && design.floors?.value) {
    const designFloors = parseInt(design.floors.value);
    const userFloors = userParams.floorParam;

    if (designFloors === userFloors) {
      score += 20;
    } else if (Math.abs(designFloors - userFloors) === 1) {
      score += 10;
    }
  }

  // Family Units scoring (15 points max)
  if (userParams.familyUnitParam && design.familyUnit?.value) {
    const designUnits = parseInt(design.familyUnit.value);
    const userUnits = userParams.familyUnitParam;

    if (designUnits === userUnits) {
      score += 15;
    } else if (Math.abs(designUnits - userUnits) === 1) {
      score += 10;
    }
  }

  // Style scoring (10 points max)
  if (userParams.styleParam && design.styleId) {
    if (design.styleId === userParams.styleParam) {
      score += 10;
    }
    // Could add similar style logic here if you have style relationships
  }

  // Location scoring (5 points max)
  if (userParams.cityParam && design.cities) {
    if (design.cities.includes(userParams.cityParam)) {
      score += 5;
    } else if (design.cities.includes("GENERAL")) {
      score += 3;
    }
  }

  // Search keywords scoring (20 points max)
  if (userParams.requirementsParam && design.description) {
    const keywordScore = calculateKeywordScore(
      design.description,
      userParams.requirementsParam,
    );
    score += Math.min(keywordScore, 20);
  }

  return score;
};

// Helper functions
const isWithinPercentage = (value1, value2, percentage) => {
  const difference = Math.abs(value1 - value2);
  const average = (value1 + value2) / 2;
  return (difference / average) * 100 <= percentage;
};

const calculateKeywordScore = (description, requirements) => {
  if (!description || !requirements) return 0;

  const keywords = requirements.toLowerCase().split(/\s+|,/);
  const descriptionLower = description.toLowerCase();

  let matches = 0;
  keywords.forEach(keyword => {
    if (keyword.length > 2 && descriptionLower.includes(keyword.trim())) {
      matches++;
    }
  });

  return matches * 5; // 5 points per keyword match
};

// Helper function to format cost display
const formatCost = cost => {
  return cost ? cost.toLocaleString() : "N/A";
};

export default getStep2Screen3Designs;
