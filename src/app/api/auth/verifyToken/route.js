import jwt from "jsonwebtoken";

const JWT_SECRET = "qwertyuioplkjhgfdsazxcvbnm";

export default function handler(token) {
  console.log("handler run");

  // Ensure the request method is POST
  if (!token) {
    return { error: "token missing" };
    // res.status(405).json({ error: "Method Not Allowed" });
  }
  //   if (req.method !== "POST") {
  //     return { error: "Method Not Allowed" };
  //     // res.status(405).json({ error: "Method Not Allowed" });
  //   }

  //   const { token } = req.body;
  console.log("token is", token);
  if (!token) {
    return { error: "Authentication token missing" };
    // res.status(401).json({ error: "Authentication token missing" });
  }
  try {
    console.log("before decoding", token);
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded user is: ", decoded);
    return { user: decoded };
    // res.status(200).json({ user: decoded });
  } catch (error) {
    console.error("Error decoding token:", error);
    return { error: "Invalid or expired token" };
    // res.status(401).json({ error: "Invalid or expired token" });
  }
}
