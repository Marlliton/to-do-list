import jwt from "jsonwebtoken";

export function generateToken(id: string, secretKey: string) {
  return jwt.sign({ id }, secretKey, {
    expiresIn: 60 * 60 * 8,
  });
}
