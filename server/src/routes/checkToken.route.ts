import express from "express";
import { checkToken } from "../controllers/checkToken.controller";
import asyncHandler from "express-async-handler";

const tokenRouter = express.Router();

tokenRouter.post("/checkToken", asyncHandler(checkToken));

export default tokenRouter;
