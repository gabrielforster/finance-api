import express, { Request, Response } from "express";
const router = express.Router();

import { User } from "../../database/models/user";

import { verifyIsAdmin } from "../utils/utils";

router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId;
  if (!userId) {
    res.status(400).send("Bad request");
    return;
  }

  const user = await verifyIsAdmin(userId as string);
  if (!user.isAdmin) {
    res.status(401).json({
      message: "User is not admin",
    });
  }

  if(user.isAdmin){
    try {
      const users = await User.find();
      const formatedUsers = users.map((user) => {
        return {
          _id: user._id,
          isAdmin: user.isAdmin,
          name: user.username,
          email: user.email,
          createdAt: user.createdAt,
          profilePicture: user.profilePicture,
        };
      });
      res.status(200).json(formatedUsers);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).send("Bad request");
    return;
  }
  
  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const userFormated = {
    _id: user._id,
    isAdmin: user.isAdmin,
    name: user.username,
    email: user.email,
    createdAt: user.createdAt,
    profilePicture: user.profilePicture,
  }

  res.status(200).json(userFormated);
});

router.post("/", async (req: Request, res: Response) => {
  const userRequestingId = req.body.userRequestingId;
  if (!userRequestingId) {
    res.status(400).send("Bad request");
    return;
  }

  const userRequesting = await verifyIsAdmin(userRequestingId as string);
  if (!userRequesting.isAdmin) {
    res.status(401).json({
      message: "User is not admin",
    });
  }

  const user = {
    username: req.body.user.username,
    email: req.body.user.email,
    password: req.body.user.password,
    isAdmin: req.body.user.sAdmin,
    profilePicture: req.body.user.profilePicture,
    userCredentials: req.body.user.userCredentials,
  };
  if (!user) {
    res.status(400).send("Bad request");
    return;
  }

  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created",
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).send("Bad request");
    return;
  }

  const userRequestingId = req.body.userRequestingId;
  const userRequesting = await verifyIsAdmin(userRequestingId as string);
  if (!userRequesting.isAdmin && userId !== userRequestingId) {
    res.status(401).json({
      message: "Conditional request failed",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const userToUpdate = {
    username: req.body.user.username,
    email: req.body.user.email,
    password: req.body.user.password,
    isAdmin: req.body.user.isAdmin,
    profilePicture: req.body.user.profilePicture,
  };
  if (!userToUpdate) {
    res.status(400).send("Bad request");
    return;
  }

  try {
    await User.findByIdAndUpdate(userId, userToUpdate);
    res.status(200).json({
      message: "User updated",
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).send("Bad request");
    return;
  }

  const userRequestingId = req.body.userRequestingId;
  const userRequesting = await verifyIsAdmin(userRequestingId as string);
  if (!userRequesting.isAdmin && userId !== userRequestingId) {
    res.status(401).json({
      message: "Conditional request failed",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User deleted",
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
