// Fixed uploadPaymentReceipt.js - Server Action Compatible
"use server";
import { storage, db } from "@/Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const uploadPaymentReceipt = async formData => {
  try {
    // Extract data from FormData
    const file = formData.get("file");
    const userId = formData.get("userId");
    const userName = formData.get("userName");
    const uploadTimestamp = formData.get("uploadTimestamp");
    const paymentAmount = formData.get("paymentAmount");
    const paymentType = formData.get("paymentType");

    // Validate inputs
    if (!file) {
      return {
        success: false,
        message: "No file provided",
      };
    }

    if (!userId) {
      return {
        success: false,
        message: "User phone number is required",
      };
    }

    console.log("Starting upload for user:", userId);
    console.log("File details:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    // Convert file to buffer for Firebase upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename with better naming convention
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop() || "png";
    const sanitizedUserId = userId.replace(/[^a-zA-Z0-9]/g, "_"); // Remove special characters from phone number
    const fileName = `receipt_${sanitizedUserId}_${timestamp}.${fileExtension}`;
    const storagePath = `payment-receipts/${sanitizedUserId}/${fileName}`;

    console.log("Uploading to path:", storagePath);

    // Upload to Firebase Storage
    const receiptRef = ref(storage, storagePath);
    const uploadResult = await uploadBytes(receiptRef, buffer, {
      contentType: file.type,
    });

    // Get download URL
    const downloadURL = await getDownloadURL(receiptRef);

    // Save receipt metadata to Firestore database
    const receiptData = {
      userId: userId, // Phone number as user ID
      userName: userName || "Unknown",
      fileName: fileName,
      originalFileName: file.name,
      downloadURL: downloadURL,
      storagePath: storagePath,
      fileSize: file.size,
      fileType: file.type,
      uploadedAt: serverTimestamp(),
      uploadTimestamp: uploadTimestamp || new Date().toISOString(),
      status: "pending", // Can be 'pending', 'approved', 'rejected'
      paymentAmount: paymentAmount ? parseFloat(paymentAmount) : null,
      paymentType: paymentType || "full", // 'initial', 'advance', 'full'
    };

    try {
      const docRef = await addDoc(
        collection(db, "payment-receipts"),
        receiptData,
      );
      console.log("Receipt metadata saved to database with ID:", docRef.id);

      return {
        success: true,
        url: downloadURL,
        message: "Receipt uploaded and saved successfully",
        fileName: fileName,
        documentId: docRef.id,
        storagePath: storagePath,
      };
    } catch (dbError) {
      console.error("Failed to save to database, but file uploaded:", dbError);
      // File uploaded successfully, but database save failed
      return {
        success: true,
        url: downloadURL,
        message: "Receipt uploaded successfully, but metadata save failed",
        fileName: fileName,
        storagePath: storagePath,
        warning: "Database save failed - please contact support",
      };
    }
  } catch (error) {
    console.error("Error uploading payment receipt:", error);

    // Return more specific error messages
    if (error.code === "storage/unauthorized") {
      return {
        success: false,
        message: "Upload failed: Unauthorized. Please check your permissions.",
      };
    } else if (error.code === "storage/canceled") {
      return {
        success: false,
        message: "Upload was canceled. Please try again.",
      };
    } else if (error.code === "storage/unknown") {
      return {
        success: false,
        message: "Upload failed due to unknown error. Please try again.",
      };
    } else {
      return {
        success: false,
        message: error.message || "Failed to upload receipt. Please try again.",
      };
    }
  }
};
