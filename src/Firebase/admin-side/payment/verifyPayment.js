// @/Firebase/admin-side/payments/verifyPayment.js
import { db } from "@/Firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Verifies a payment receipt by copying it to verified_payments collection
 * @param {Object} receiptData - The receipt data to verify
 * @param {string} receiptData.userId - User ID (phone number)
 * @param {string} receiptData.fileName - Receipt file name
 * @param {string} receiptData.receiptUrl - Receipt download URL
 * @param {number} receiptData.amount - Payment amount (from input)
 * @param {string} receiptData.fullname - User full name
 */
export const verifyPayment = async receiptData => {
  try {
    const { userId, fileName, receiptUrl, amount, fullname } = receiptData;

    // Copy receipt data to verified_payments collection
    const verifiedPaymentData = {
      userId,
      fullname,
      fileName,
      receiptUrl,
      amount,
      verifiedAt: serverTimestamp(),
      verifiedBy: "admin",
      timestamp: new Date().toISOString(),
      status: "verified",
    };

    const verifiedPaymentRef = await addDoc(
      collection(db, "verified_payments"),
      verifiedPaymentData,
    );

    return {
      success: true,
      verifiedPaymentId: verifiedPaymentRef.id,
      message: "Payment verified successfully",
    };
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw new Error(`Failed to verify payment: ${error.message}`);
  }
};

/**
 * Fetches all verified payments for admin dashboard
 */
export const getVerifiedPayments = async () => {
  try {
    const verifiedPaymentsQuery = collection(db, "verified_payments");
    const querySnapshot = await getDocs(verifiedPaymentsQuery);

    const verifiedPayments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore timestamp to readable format
      verifiedAt:
        doc.data().verifiedAt?.toDate?.() || new Date(doc.data().timestamp),
    }));

    // Sort by verification date (newest first)
    verifiedPayments.sort((a, b) => b.verifiedAt - a.verifiedAt);

    return verifiedPayments;
  } catch (error) {
    console.error("Error fetching verified payments:", error);
    throw new Error(`Failed to fetch verified payments: ${error.message}`);
  }
};
