// @/Firebase/admin-side/clients/getClientsFromFirestore.js
import { db, storage } from "@/Firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const normalizePhone = phone => {
  if (!phone) return "";
  return phone.replace(/[^0-9]/g, ""); // keep only digits
};

const getClientsFromFirestore = async () => {
  try {
    // 1️⃣ Fetch users
    const usersQuery = query(
      collection(db, "users"),
      orderBy("fullname", "asc"),
    );
    const querySnapshot = await getDocs(usersQuery);

    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      fullname: doc.data().fullname || "",
      phonenumber: normalizePhone(doc.data().phonenumber || ""),
      rawPhone: doc.data().phonenumber || "",
      role: doc.data().role || "",
    }));

    // 2️⃣ Fetch verified payments to track which receipts are already verified
    const verifiedReceipts = new Set();
    try {
      const verifiedPaymentsQuery = collection(db, "verified_payments");
      const verifiedSnapshot = await getDocs(verifiedPaymentsQuery);

      verifiedSnapshot.docs.forEach(doc => {
        const data = doc.data();
        verifiedReceipts.add(`${data.userId}-${data.fileName}`);
      });
    } catch (error) {
      console.log("No verified payments found yet");
    }

    // 3️⃣ Fetch folders in storage
    const receiptsRootRef = ref(storage, "payment-receipts");
    const folderList = await listAll(receiptsRootRef);

    // 4️⃣ Match users to folders
    const clients = [];
    for (const user of users) {
      const matchedFolder = folderList.prefixes.find(
        prefixRef => normalizePhone(prefixRef.name) === user.phonenumber,
      );

      if (matchedFolder) {
        // use the actual folderRef, not a reconstructed path
        const fileList = await listAll(matchedFolder);

        if (fileList.items.length > 0) {
          const firstReceiptRef = fileList.items[0];
          const receiptUrl = await getDownloadURL(firstReceiptRef);

          // Check if this specific receipt is verified
          const isVerified = verifiedReceipts.has(
            `${user.phonenumber}-${firstReceiptRef.name}`,
          );

          clients.push({
            ...user,
            hasReceipt: true,
            receiptUrl,
            fileName: firstReceiptRef.name,
            receiptCount: fileList.items.length,
            isClient: true,
            isVerified: isVerified,
          });
        }
      }
    }

    return clients;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error(`Failed to fetch clients: ${error.message}`);
  }
};

export default getClientsFromFirestore;
