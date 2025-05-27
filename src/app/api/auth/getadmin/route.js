import { NextResponse } from "next/server";

export async function GET(req) {
  const { user } = req; // This comes from the middleware
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }
  // Fetch user details from the database using `user.id` or similar
  try {
    // const userDetails = await getUserFromDatabase(user.username); // Replace with your DB access logic
    return NextResponse.json({ success: true, user: user });
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 },
    );
  }
}

// // Example function to get user details from the database
// async function getUserFromDatabase(userId) {
//   // Replace this with your actual database query logic
//   // Example: return await db.users.findUnique({ where: { id: userId } });
//   return { id: userId, name: "John Doe" }; // Mocked user data
// }
