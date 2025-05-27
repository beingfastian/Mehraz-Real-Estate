import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create a response object
    const response = NextResponse.json({ success: true });

    // Set a cookie on the response
    response.cookies.set("test", "example_value", {
      // Optional: Configure cookie options
      httpOnly: true, // Cookie is not accessible via JavaScript (increased security)
      secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
      maxAge: 60 * 60 * 24, // Cookie expires in 24 hours
      path: "/", // Cookie is accessible on the entire site
    });

    return response;
  } catch (error) {
    console.log("error is:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
