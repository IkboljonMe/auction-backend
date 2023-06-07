import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import path from "path";

import seed from "./base/seed/seed.js";
import Auction from "./base/models/auctionModel.js";
import IndexRouter from "./base/routes/index.js";
import database from "./base/database/database.js";
import serverError from "./base/error/serverError.js";
import createSocketServer from "./base/socket/socket.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/seed", seed);
database();
app.use("/api", IndexRouter);
app.use(serverError);

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = createSocketServer(server);

server.listen(port, () => {
  console.log(`Server at port: ${port}`);
});

export { server, io };
