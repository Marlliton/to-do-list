import jwt from "jsonwebtoken";

export function generateToken(id: string, secretKey: string) {
  return jwt.sign({ id }, secretKey, {
    expiresIn: 60 * 60 * 8, //  8 hours
  });
}

export function validateToken(
  token: string,
  secretKey: string,
  fun: (err, decoded) => void
) {
  return jwt.verify(token, secretKey, fun);
}
