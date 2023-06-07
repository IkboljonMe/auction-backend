import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import generateToken from "../helpers/generateToken.js";

export const getUser = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users);
});
export const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});
export const putChangeUserInfoById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    user.isSeller = Boolean(req.body.isSeller);

    // Check if the user is a seller before updating seller information
    if (user.isSeller && user.seller) {
      user.seller.name = req.body.sellerName || user.seller.name;
      user.seller.logo = req.body.sellerLogo || user.seller.logo;
      user.seller.description = req.body.sellerDescription || user.seller.description;
    }

    const updatedUser = await user.save();
    res.send({ message: "User Updated Successfully", user: updatedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});
export const deleteUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.email === "admin@example.com") {
      res.status(400).send({ message: "Can Not Delete Admin User" });
      return;
    }
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: "User Deleted" });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});
export const signInUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        seller: user.seller,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid Email/Password" });
});
export const signUpUser = expressAsyncHandler(async (req, res) => {
  // creating new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    seller: {
      name: req.body.sellerName,
      logo: req.body.sellerLogo,
      description: req.body.sellerDescription,
    },
  });
  // saving new user in mongodb
  const user = await newUser.save();
  // returns new user data to the frontend
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isSeller: user.isSeller,
    seller: user.seller,
    token: generateToken(user),
  });
});
export const putChangeUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    if (user.isSeller) {
      user.seller.name = req.body.sellerName || user.seller.name;
      user.seller.logo = req.body.sellerLogo || user.seller.logo;
      user.seller.description = req.body.sellerDescription || user.seller.description;
    }

    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: updatedUser.isSeller,
      token: generateToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});
