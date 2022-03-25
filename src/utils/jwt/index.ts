import jwt from "jsonwebtoken";

export function generateToken(id: string, secretKey: string) {
  return jwt.sign({ id }, secretKey, {
    expiresIn: 300, //  5 minutes
  });
}

export function validateToken(
  token: string,
  secretKey: string,
  fun: (err, decoded) => void
) {
  return jwt.verify(token, secretKey, fun);
}
