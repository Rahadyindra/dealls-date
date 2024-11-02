import jwt, { JwtPayload } from "jsonwebtoken";

// Define the payload type
interface TokenPayload {
  email: string;
  username: string;
  id: number;
}

function createToken(payload: TokenPayload): string {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error(
      "JWT_SECRET_KEY is not defined in the environment variables"
    );
  }
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
}

function verifyToken(token: string): TokenPayload | null {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error(
      "JWT_SECRET_KEY is not defined in the environment variables"
    );
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY) as TokenPayload;
  } catch (error) {
    throw error;
  }
}

export { createToken, verifyToken };
