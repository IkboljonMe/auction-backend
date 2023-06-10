import jwt from "jsonwebtoken";

//It is a generateToken method that helps to keep auth privately in frontend side

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
export default generateToken;
