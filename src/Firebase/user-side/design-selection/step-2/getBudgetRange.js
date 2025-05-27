"use server";

import { db } from "@/Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const getBudgetRange = async () => {
  const budgetRangeCollectionRef = collection(db, "BUDGET_RANGES");
  try {
    const budgetRangeDocs = await getDocs(budgetRangeCollectionRef);
    const budgetRange = budgetRangeDocs.docs[0]?.data();
    
    if (!budgetRange) {
      console.error("No budget range found.");
      throw new Error("An error occurred. Please try again.");
      return;
    }
    return budgetRange;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("An error occurred. Please try again.");
  }
};
export default getBudgetRange;
