import mongoose from "mongoose";
const database = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("[DB] Connection Success");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default database;
