import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const alg = "HS256";

export const generateToken = async (id) => {
  try {
    const jwt = await new jose.SignJWT({ id })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret);
    return jwt;
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw new Error("Failed to generate token");
  }
};
