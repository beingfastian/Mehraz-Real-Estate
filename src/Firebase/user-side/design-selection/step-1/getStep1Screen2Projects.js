"use server";
import getStyleById from "@/Firebase/admin-side/roles-analytics-cities/styles/getStyleById";
import { db, storage } from "@/Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const getStep1Screen2Projects = async (
  categoryParam,
  cityParam,
  styleParam,
  styleCostParam,
) => {
  const readyProjectCollectionRef = collection(db, "READY_PROJECTS");
  const projects = [];
  try {
    const filterQuery = query(
      readyProjectCollectionRef,
      where("cities", "array-contains-any", [cityParam, "GENERAL"]),
    );
    const readyProjectDocs = await getDocs(filterQuery);
    for (const readyProjectDoc of readyProjectDocs.docs) {
      if (
        readyProjectDoc.exists() &&
        readyProjectDoc.data()?.uploadedScreensCount === 4
      ) {
        const projectId = readyProjectDoc.id;
        const styleId = readyProjectDoc.data().style;
        const styleData = {
          id: styleId,
          ...(await getStyleById(styleId, ["name", "budget"])),
        };
        // Getting images and videos
        const imageRef = ref(storage, `READY_PROJECTS/${projectId}/image`);
        const imageUrl = await getDownloadURL(imageRef);
        const videoRef = ref(storage, `READY_PROJECTS/${projectId}/video`);
        const videoUrl = await getDownloadURL(videoRef);

        const projectData = {
          id: projectId,
          style: styleData,
          cities: readyProjectDoc.data().cities,
          description: readyProjectDoc.data().description,
          productRates: readyProjectDoc.data().productRates,
          constructionRates: readyProjectDoc.data().constructionRates,
          image: imageUrl,
          video: videoUrl,
        };
        projects.push(projectData);
      }
    }

    // New sorting logic with updated priorities
    projects.sort((a, b) => {
      const aCost = a.productRates.styleCost;
      const bCost = b.productRates.styleCost;

      // First priority: exact cost match
      const aExactCostMatch = aCost === styleCostParam;
      const bExactCostMatch = bCost === styleCostParam;

      if (aExactCostMatch && bExactCostMatch) return 0;
      if (aExactCostMatch) return -1;
      if (bExactCostMatch) return 1;

      // Second priority: cost preference based on styleCostParam
      const getCostPriority = (cost, targetCost) => {
        if (targetCost === "LOW") {
          if (cost === "MEDIUM") return 1;
          if (cost === "HIGH") return 2;
          return 3; // for any other case
        } else if (targetCost === "MEDIUM") {
          if (cost === "HIGH") return 1;
          if (cost === "LOW") return 2;
          return 3; // for any other case
        } else if (targetCost === "HIGH") {
          if (cost === "MEDIUM") return 1;
          if (cost === "LOW") return 2;
          return 3; // for any other case
        }
        return 3; // fallback
      };

      const aPriority = getCostPriority(aCost, styleCostParam);
      const bPriority = getCostPriority(bCost, styleCostParam);

      return aPriority - bPriority;
    });

    // Reordering projects to place highest priority projects in the middle
    const reorderProjects = projects => {
      const midIndex = Math.floor(projects.length / 2);
      const reordered = [];
      let left = 0,
        right = projects.length - 1;
      for (let i = 0; i <= midIndex; i++) {
        if (i % 2 === 0 && left <= midIndex) {
          reordered.unshift(projects[left++]);
        } else if (right > midIndex) {
          reordered.push(projects[right--]);
        }
      }
      return reordered;
    };

    return reorderProjects(projects);
  } catch (error) {
    console.error("Error getting the project data for preview: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default getStep1Screen2Projects;
