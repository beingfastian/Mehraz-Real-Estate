// utils/materialUtils.js
"use server";
import { db, storage } from "@/Firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

// Fetch all material categories
export const getMaterialCategories = async () => {
  try {
    const categoriesCollectionRef = collection(db, "MATERIAL_CATEGORIES");
    const categoriesSnapshot = await getDocs(categoriesCollectionRef);
    
    const categories = categoriesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      type: "SUCCESS",
      data: categories
    };
  } catch (error) {
    console.error("Error fetching material categories: " + error);
    return {
      type: "ERROR",
      message: "Failed to fetch material categories.",
      data: []
    };
  }
};

// Fetch materials by category
export const getMaterialsByCategory = async (categoryId) => {
  try {
    const materialsCollectionRef = collection(db, "MATERIALS");
    const materialsQuery = query(
      materialsCollectionRef,
      where("category", "==", categoryId),
      orderBy("name", "asc")
    );
    
    const materialsSnapshot = await getDocs(materialsQuery);
    
    const materials = await Promise.all(
      materialsSnapshot.docs.map(async (docSnapshot) => {
        const materialData = docSnapshot.data();
        
        // Get image URLs from Firebase Storage
        try {
          const image1Ref = ref(storage, `MATERIALS/${docSnapshot.id}/image1`);

          
          const [image1URL] = await Promise.all([
            getDownloadURL(image1Ref),

          ]);

          return {
            id: docSnapshot.id,
            ...materialData,
            image1: image1URL,

            image: image1URL, // For backward compatibility
          };
        } catch (imageError) {
          console.warn(`Error fetching images for material ${docSnapshot.id}:`, imageError);
          return {
            id: docSnapshot.id,
            ...materialData,
            image1: null,
            image: null,
          };
        }
      })
    );

    return {
      type: "SUCCESS",
      data: materials
    };
  } catch (error) {
    console.error("Error fetching materials by category: " + error);
    return {
      type: "ERROR",
      message: "Failed to fetch materials.",
      data: []
    };
  }
};

// Fetch all materials
export const getAllMaterials = async () => {
  try {
    const materialsCollectionRef = collection(db, "MATERIALS");
    const materialsQuery = query(materialsCollectionRef, orderBy("name", "asc"));
    const materialsSnapshot = await getDocs(materialsQuery);
    
    const materials = await Promise.all(
      materialsSnapshot.docs.map(async (docSnapshot) => {
        const materialData = docSnapshot.data();
        
        try {
          const image1Ref = ref(storage, `MATERIALS/${docSnapshot.id}/image1`);

          
          const [image1URL] = await Promise.all([
            getDownloadURL(image1Ref),
          ]);

          return {
            id: docSnapshot.id,
            ...materialData,
            image1: image1URL,

            image: image1URL,
          };
        } catch (imageError) {
          console.warn(`Error fetching images for material ${docSnapshot.id}:`, imageError);
          return {
            id: docSnapshot.id,
            ...materialData,
            image1: null,

            image: null,
          };
        }
      })
    );

    return {
      type: "SUCCESS",
      data: materials
    };
  } catch (error) {
    console.error("Error fetching all materials: " + error);
    return {
      type: "ERROR",
      message: "Failed to fetch materials.",
      data: []
    };
  }
};

// Fetch materials with filters
export const getFilteredMaterials = async (filters = {}) => {
  try {
    const { category, city, quality, sortBy } = filters;
    
    const materialsCollectionRef = collection(db, "MATERIALS");
    let materialsQuery = query(materialsCollectionRef);

    // Add category filter if specified
    if (category && category !== "ALL") {
      materialsQuery = query(materialsQuery, where("category", "==", category));
    }

    // Add city filter if specified
    if (city) {
      materialsQuery = query(materialsQuery, where("cities", "array-contains", city));
    }

    const materialsSnapshot = await getDocs(materialsQuery);
    
    let materials = await Promise.all(
      materialsSnapshot.docs.map(async (docSnapshot) => {
        const materialData = docSnapshot.data();
        
        try {
          const image1Ref = ref(storage, `MATERIALS/${docSnapshot.id}/image1`);

          
          const [image1URL] = await Promise.all([
            getDownloadURL(image1Ref),

          ]);

          return {
            id: docSnapshot.id,
            ...materialData,
            image1: image1URL,

            image: image1URL,
          };
        } catch (imageError) {
          return {
            id: docSnapshot.id,
            ...materialData,
            image1: null,

            image: null,
          };
        }
      })
    );

    // Apply quality filter (client-side since it might be based on rating calculation)
    if (quality) {
      const [min, max] = quality.split('–').map(Number);
      materials = materials.filter(material => {
        const rating = material.rating || 0;
        return rating >= min && rating <= max;
      });
    }

    // Apply sorting
    if (sortBy) {
      if (sortBy === "LOW TO HIGH") {
        materials.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
      } else if (sortBy === "HIGH TO LOW") {
        materials.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
      }
    }

    return {
      type: "SUCCESS",
      data: materials
    };
  } catch (error) {
    console.error("Error fetching filtered materials: " + error);
    return {
      type: "ERROR",
      message: "Failed to fetch filtered materials.",
      data: []
    };
  }
};

// Search materials by name
export const searchMaterials = async (searchTerm) => {
  try {
    const materialsCollectionRef = collection(db, "MATERIALS");
    const materialsSnapshot = await getDocs(materialsCollectionRef);
    
    const allMaterials = await Promise.all(
      materialsSnapshot.docs.map(async (docSnapshot) => {
        const materialData = docSnapshot.data();
        
        try {
          const image1Ref = ref(storage, `MATERIALS/${docSnapshot.id}/image1`);
          const image1URL = await getDownloadURL(image1Ref);

          return {
            id: docSnapshot.id,
            ...materialData,
            image: image1URL,
          };
        } catch (imageError) {
          return {
            id: docSnapshot.id,
            ...materialData,
            image: null,
          };
        }
      })
    );

    // Filter by search term
    const filteredMaterials = allMaterials.filter(material =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      type: "SUCCESS",
      data: filteredMaterials
    };
  } catch (error) {
    console.error("Error searching materials: " + error);
    return {
      type: "ERROR",
      message: "Failed to search materials.",
      data: []
    };
  }
};