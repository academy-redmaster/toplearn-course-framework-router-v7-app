import * as jose from "jose";
import { User } from "../../model/users";

export const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        // Convert the secret to a cryptographic key
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secretKey);
        // Find the user by ID from the payload
        const user = await User.findById(payload?.id).select("-password");
        // Attach the user to the request object
        req.user = user;
        next();
      }
    } catch (error) {
      console.error("Error in JWT verification:", error);
      throw new Error(`Not Authorized: token expired, login again`);
    }
  } else {
    throw new Error("Authorization header missing or malformed :(");
  }
};
