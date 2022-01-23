import authMiddleware from "../../../middlewares/authMiddleware";
import User from "../../../utils/models/User";

async function handler(req, res) {
  const user = await User.findById(req.id);
  res.status(200).json({ user });
}

export default authMiddleware(handler);
