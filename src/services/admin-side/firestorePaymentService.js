// Create this file at: src/services/firestorePaymentService.js

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/Firebase/firebase";

export const savePaymentData = async paymentData => {
  try {
    const { userId, projectType } = paymentData;
    const documentId = `${userId}_${projectType}`;

    // Reference to the payment document
    const paymentDocRef = doc(db, "payment", documentId);

    // Check if document exists
    const docSnap = await getDoc(paymentDocRef);

    if (docSnap.exists()) {
      console.log("Payment document exists, updating...");
      // Update existing document
      await setDoc(
        paymentDocRef,
        {
          ...paymentData,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
    } else {
      console.log("Creating new payment document...");
      // Create new document
      await setDoc(paymentDocRef, {
        ...paymentData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    console.log("Payment data saved successfully!");
    return { success: true, documentId };
  } catch (error) {
    console.error("Error saving payment data:", error);
    return { success: false, error: error.message };
  }
};
