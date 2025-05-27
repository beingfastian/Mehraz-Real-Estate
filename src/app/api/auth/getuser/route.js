import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = req.headers.get("user");
    console.log("user is:", user);
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          usertoken: req.cookies.get("usertoken")?.value,
          success: false,
        },
        { status: 401 },
      );
    }
    try {
      return NextResponse.json({ success: true, user: JSON.parse(user) });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch user details" },
        { status: 500 },
        { message: error.message },
        { success: false },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 },
      { message: error.message },
      { success: false },
    );
  }
}
