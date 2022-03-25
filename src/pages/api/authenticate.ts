import { NextApiRequest, NextApiResponse } from "next";
import secretKey from "../../config/secret-key.json";
import { compare } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";
import User from "../../utils/models/UserDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const key = secretKey["secret-key"];

  if (req.method === "POST") {
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) return res.status(400).json({ error: "User not found!" });

      if (!(await compare(password, user.password)))
        return res.status(400).json({ error: "Incorrect email or pass" });

      user.password = undefined;

      res.status(200).json({
        user,
        token: generateToken(user.id, key),
      });
    } catch (error) {
      throw new Error("Unexpected Error, please try again.");
    }
  }
}
