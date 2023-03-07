import { Router } from "express";
import { requireAdminAuth } from "../../utils";
import validator, { ValidationSource } from "../../utils/validator";
import * as CategoryController from "./controller";
import rules from "./rules";

export const categoryRoutes = Router();
categoryRoutes.post(
  "/category",
  requireAdminAuth,
  validator(rules.createCategory, ValidationSource.BODY),
  CategoryController.createCategory
);

categoryRoutes.get(
  "/category",
  requireAdminAuth,
  CategoryController.getAllCategories
);

categoryRoutes.patch(
  "/category/:id",
  requireAdminAuth,
  validator(rules.updateCategory, ValidationSource.BODY),
  CategoryController.updateCategory
);

categoryRoutes.post(
  "/category/:id",
  requireAdminAuth,
  CategoryController.deleteCategory
);
