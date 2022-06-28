import express, { Request, Response } from "express";
const router = express.Router();

import { User } from "../../database/models/user";

router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
  const password = req.query.password;
  const username = req.query.username;
  if (!password || !username) {
    res.status(400).send("Bad request");
    return;
  }

  try {
    const user = await User.findOne({ username: username });
    if (password === user.password) {
      res.status(200).json({
        hasAccess: true,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        userId: user._id,
      });
    } else if (password !== user.password) {
      res.status(401).json({
        message: "Wrong password",
        hasAccess: false,
        user: null,
      });
    } else {
      res.status(400).json({
        message: "Login failed",
        hasAccess: false,
        user: null,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
