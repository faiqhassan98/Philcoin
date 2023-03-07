import { Router } from "express";
import { requireAuth } from "../../utils/requireAuth";
// import validator, { ValidationSource } from "../../utils/validator";
import * as UserController from "./controller";
// import rules from "./rules";

export const userRoutes = Router();

userRoutes.get("/users", requireAuth, UserController.userInfo);
