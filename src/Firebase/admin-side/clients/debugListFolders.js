// @/Firebase/admin-side/users/debugListFolders.js
import { storage } from "@/Firebase/firebase";
import { ref, listAll } from "firebase/storage";

const debugListFolders = async () => {
  try {
    const baseRef = ref(storage, "payment-receipts");
    const result = await listAll(baseRef);

    console.log(
      "Prefixes (folders):",
      result.prefixes.map(p => p.fullPath),
    );
    console.log(
      "Files directly inside base folder:",
      result.items.map(i => i.fullPath),
    );

    return {
      folders: result.prefixes.map(p => p.fullPath),
      files: result.items.map(i => i.fullPath),
    };
  } catch (error) {
    console.error("Error listing payment-receipts:", error);
    return { folders: [], files: [] };
  }
};

export default debugListFolders;
