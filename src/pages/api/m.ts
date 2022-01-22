import authMiddleware from "../../middlewares/authMiddleware";

function handler(req, res) {
  res.status(200).json({ name: "Chegue na rota principal" });
}

export default authMiddleware(handler);
