import { NextResponse } from "next/server";
import axios from "axios";
import { parse } from "cookie";
import handler from "./app/api/auth/verifyToken/route";
import { jwtVerify } from "jose";
import { useAuth } from "./context/UserContext";
const JWT_SECRET = "qwertyuioplkjhgfdsazxcvbnm";
async function userprotectedmiddleware(req, res) {
  try {
    const usertoken = req.cookies.get("usertoken")?.value;
    // console.log("user token is:", usertoken);
    if (usertoken == undefined || !usertoken) {
      return false;
    }
    try {
      const { payload } = await jwtVerify(
        usertoken,
        new TextEncoder().encode(process.env.JWT_SECRET),
      );
      // console.log("user payload is:", payload);
      const response = payload;
      if (response == null) {
        throw new Error("Token verification failed");
      }
      const user = response;
      return user;
    } catch (error) {
      // console.error("Token verification failed:", error);
      return NextResponse.json(
        {
          error: "Invalid or expired token",
          message: error.message,
          success: false,
        },
        { status: 401 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "UNAITHORIZED",
        message: error.message,
        success: false,
      },
      { status: 401 },
    );
  }
}

export async function middleware(req, res) {
  try {
    const { cookies } = req;
    const url = req.nextUrl.pathname;
    if (url.startsWith("/api/auth/getuser")) {
      const user = await userprotectedmiddleware(req, res);
      if (user) {
        const response = NextResponse.next();
        response.headers.set("user", JSON.stringify(user)); // Set user in headers
        return response;
      }
      return NextResponse.json(
        { error: "User verification failed", success: false },
        { status: 401 },
      );
    }
    console.log("admin middleware run!");
    const token = cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Authentication token missing", success: false },
        { status: 401 },
      );
    }

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET),
      );
      // console.log("payload is:", payload);
      const response = payload;
      // Check if the response is successful
      if (response == null) {
        throw new Error("Token verification failed");
      }
      // Extract the user data from the response

      const user = response;
      req.user = user;
      return NextResponse.next();
    } catch (error) {
      // console.error("Token verification failed:", error);
      return NextResponse.json(
        {
          error: "Invalid or expired token",
          message: error.message,
          success: false,
        },
        { status: 401 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "UNAUTHORIZED",
        message: error.message,
        success: false,
      },
      { status: 401 },
    );
  }
}
export const config = {
  matcher: [
    "/api/auth/getadmin",
    "/api/auth/protectedRoute/:path*",
    "/api/auth/getuser",
  ],
};
