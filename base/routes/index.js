import express from "express";

const IndexRouter = express.Router();
import userRouter from "./userRoutes.js";
import auctionRouter from "./auctionRoutes.js";
import uploadRouter from "./uploadRoutes.js";

IndexRouter.use("/", userRouter);
IndexRouter.use("/", auctionRouter);
IndexRouter.use("/", uploadRouter);

export default IndexRouter;
