import express from "express";
import User from "../models/userModel.js";

const seed = express.Router();

seed.get("/", async (req, res) => {
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});

export default seed;
