import { Router } from "express";
import validator, { ValidationSource } from "../../utils/validator";
import * as AuthController from "./controller";
import rules from "./rules";

export const authRoutes = Router();
authRoutes.post(
  "/auth/register",
  validator(rules.register, ValidationSource.BODY),
  AuthController.registerUser
);
authRoutes.post(
  "/auth/login",
  validator(rules.login, ValidationSource.BODY),  
  AuthController.userLogin
);
