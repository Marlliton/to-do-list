import { NextApiRequest, NextApiResponse } from "next";
import { generateHash } from "../../utils/bcrypt";
import User from "../../utils/models/UserDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { email } = req.body;
    const user = { ...req.body };
    
    if (!user.email || !user.name || !user.password) {
      return res.status(400).json({ message: "Missing data" });
    }
    const hash = await generateHash(user.password);
    user.password = hash;

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ Err: "User already existis." });
      }
      const newUser = await User.create(user);
      newUser.password = undefined;

      res.status(200).json({
        newUser,
        // token: generateToken({ id: user.id }),
      });
    } catch (error) {
      return res.status(400).send({ Error: "Registration failed", error });
    }
  }
}
