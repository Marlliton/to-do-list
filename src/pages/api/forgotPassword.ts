import { NextApiRequest, NextApiResponse } from "next";
import { generateHash } from "../../utils/bcrypt";
import User from "../../utils/models/UserDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, newPassword } = req.body;

  if (req.method === "POST") {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ error: "User not found" });

    try {
      await User.findOneAndUpdate(
        { _id: user.id },
        { password: await generateHash(newPassword) },
        { new: true }
      );

      return res.status(200).json({ message: "Updated password field" });
    } catch (error) {
      throw new Error("Could not change your password");
    }
  }
}
