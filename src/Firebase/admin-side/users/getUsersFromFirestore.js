// @/Firebase/admin-side/users/getUsersFromFirestore.js

import { db } from "@/Firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

/**
 * Fetches all users from Firestore database
 * @returns {Promise<Array>} Array of user objects
 */
const getUsersFromFirestore = async () => {
  try {
    const usersCollectionRef = collection(db, "users");

    // Create query with ordering by fullname
    const usersQuery = query(usersCollectionRef, orderBy("fullname", "asc"));

    const querySnapshot = await getDocs(usersQuery);

    if (querySnapshot.empty) {
      console.log("No users found in the database");
      return [];
    }

    const users = [];

    querySnapshot.forEach(doc => {
      const userData = doc.data();

      users.push({
        id: doc.id,
        fullname: userData.fullname || "",
        phonenumber: userData.phonenumber || "",
        role: userData.role || "",
      });
    });

    console.log(`Successfully fetched ${users.length} users from Firestore`);
    return users;
  } catch (error) {
    console.error("Error fetching users from Firestore:", error);
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

export default getUsersFromFirestore;
