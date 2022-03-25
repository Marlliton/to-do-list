import { validateToken } from "../utils/jwt";
import secretKey from "../config/secret-key.json";

const withDatabase = handler => {
  return async (req, res) => {
    const jwtToken = req.headers.authorization;
   
    const parts = jwtToken.split(" ");
    const [scheme, token] = parts;

    try {
      if (!jwtToken) return res.status(401).json({ error: "Token not informed" });

    if (parts.length !== 2)
      return res.status(401).json({ error: "Token error" });

    if (!/^Bearer$/i.test(scheme))
      return res.status(401).json({ error: "Badly formatted token" });

    validateToken(token, secretKey["secret-key"], (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token malformed" });
      } else {
        // req.id = decoded.id;
        console.log("chegou no final ");
        return handler(req, res);
      }
    });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Please log in to get access"
      })
    }
    // return handler(req, res);
  };
};

export default withDatabase;
