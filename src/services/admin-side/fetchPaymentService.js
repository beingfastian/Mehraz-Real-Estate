// Create this file at: src/services/fetchPaymentService.js

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Firebase/firebase";

export const fetchPaymentService = async (userId, projectType) => {
  try {
    if (!userId || !projectType) {
      throw new Error("User ID and project type are required");
    }

    const documentId = `${userId}_${projectType}`;
    console.log("Fetching payment data for:", documentId);

    // Reference to the payment document
    const paymentDocRef = doc(db, "payment", documentId);

    // Get document
    const docSnap = await getDoc(paymentDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Payment data found:", data);

      return {
        success: true,
        data: {
          userId: data.userId,
          projectType: data.projectType,
          selectedDesignServices: data.selectedDesignServices || [],
          selectedConstructionServices: data.selectedConstructionServices || [],
          selectedMaterials: data.selectedMaterials || [],
          selectedFurnitures: data.selectedFurnitures || [],
          costDesign: data.costDesign || 0,
          costConstruction: data.costConstruction || 0,
          costMaterials: data.costMaterials || 0,
          costFurnitures: data.costFurnitures || 0,
          totalCost: data.totalCost || 0,
          timestamp: data.timestamp,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      };
    } else {
      console.log("No payment data found for:", documentId);
      return {
        success: false,
        error: "No payment data found for this user and project",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error fetching payment data:", error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};
