// Fixed uploadPaymentReceipt.js server action
"use server";
import { storage } from "@/Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadPaymentReceipt = async (file, userId) => {
  try {
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
        message: "User ID is required",
      };
    }

    // Convert file to buffer for Firebase upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop() || "png";
    const fileName = `payment_receipt_${timestamp}.${fileExtension}`;
    const storagePath = `payments/${userId}/${fileName}`;

    // Upload to Firebase Storage
    const receiptRef = ref(storage, storagePath);
    const uploadResult = await uploadBytes(receiptRef, buffer, {
      contentType: file.type,
    });

    // Get download URL
    const downloadURL = await getDownloadURL(receiptRef);

    // TODO: Save to database
    // Example: await savePaymentReceiptToDatabase({
    //   userId,
    //   fileName,
    //   downloadURL,
    //   uploadedAt: new Date(),
    //   fileSize: file.size,
    //   fileType: file.type
    // });

    return {
      success: true,
      url: downloadURL,
      message: "Receipt uploaded successfully",
      fileName: fileName,
    };
  } catch (error) {
    console.error("Error uploading payment receipt:", error);
    return {
      success: false,
      message: error.message || "Failed to upload receipt",
    };
  }
};
