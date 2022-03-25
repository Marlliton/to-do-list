import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "../../utils/jwt";
import secretKey from "../../config/secret-key.json";
import User from "../../utils/models/UserDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwtToken = req.headers.authorization;

  const parts = jwtToken.split(" ");
  const [scheme, token] = parts;

  try {
    if (!jwtToken) return res.status(401).json({ error: "Token not informed" });

    if (parts.length !== 2)
      return res.status(401).json({ error: "Token error" });

    if (!/^Bearer$/i.test(scheme))
      return res.status(401).json({ error: "Badly formatted token" });

    const decoded = validateToken(
      token,
      secretKey["secret-key"],
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Token malformed" });
        } else {
          return {
            id: decoded.id,
          };
        }
      }
    );

    const user = await User.findById({ _id: decoded.id });
    if (!user)
      return res.status(401).json({
        success: false,
        error: "User not found",
      });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Please log in to get access",
      error,
    });
  }
}
