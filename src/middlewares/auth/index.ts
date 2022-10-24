import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

import { User } from "../../interfaces/User";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);
    req.user = decoded as User;
  } catch (err) {
    console.error(err)
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default auth;