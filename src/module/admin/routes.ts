import { Router } from "express";
import validator, { ValidationSource } from "../../utils/validator";
import * as AdminController from "./controller";
import rules from "./rules";

export const adminRoutes = Router();
adminRoutes.post(
  "/auth/admin/register",
  validator(rules.register, ValidationSource.BODY),
  AdminController.registerAdmin
);
adminRoutes.post(
  "/auth/admin/login",
  validator(rules.login, ValidationSource.BODY),
  AdminController.adminLogin
);
