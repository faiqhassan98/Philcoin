import * as express from "express";
import {
  serverErrorHandler,
  successHandler,
  badRequestHandler,
  categoryLogger,
} from "../../utils";
import Category, { CategoryModel } from "./model";

export const createCategory = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const categoryData = await CategoryModel.findOne({
      name: req.body.name,
    });
    if (categoryData) {
      categoryLogger.info("Category with this name already exist!");
      badRequestHandler(res, "Category with this name already exist!");
    } else {
      const category = new CategoryModel();
      category.name = req.body.name;
      await category.save();
      categoryLogger.info("Category Created!");
      successHandler(res, { category: category }, "Category Created!");
    }
  } catch (err) {
    categoryLogger.error("Has Errors => " + err);
    serverErrorHandler(res, err);
  }
};

export const getAllCategories = async (
  req: express.Request,
  res: express.Response
): Promise<Category | void> => {
  try {
    const pageNo = req.query.page ? req.query.page : 1;
    const categoryData = await CategoryModel.find()
      .skip((Number(pageNo) - 1) * 10)
      .limit(10);
    if (categoryData) {
      categoryLogger.info("Categories fetched successfully.");
      successHandler(
        res,
        { category: categoryData },
        "Categories fetched successfully."
      );
    } else {
      categoryLogger.info("Categories not found.");
      badRequestHandler(res, "Categories not found.");
    }
  } catch (err) {
    categoryLogger.error("Has Errors => " + err);
    serverErrorHandler(res, err);
  }
};

export const updateCategory = async (
  req: express.Request,
  res: express.Response
): Promise<Category | void> => {
  try {
    const categoryData = await CategoryModel.findOne({
      id: req.params.id,
    });
    if (!categoryData) {
      categoryLogger.info("Category not found!");
      badRequestHandler(res, "Category not found!");
    } else {
      categoryData.name = req.body.name;
      await categoryData.save();
      categoryLogger.info("Category Created!");
      successHandler(res, { category: categoryData }, "Category data updated!");
    }
  } catch (err) {
    categoryLogger.error("Has Errors => " + err);
    serverErrorHandler(res, err);
  }
};

export const deleteCategory = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const categoryData = await CategoryModel.findById(req.params.id);
    if (!categoryData) {
      categoryLogger.info("Category not found!");
      badRequestHandler(res, "Category not found!");
    } else {
      await CategoryModel.findByIdAndDelete(categoryData.id);
      categoryLogger.info("Category deleted duccessfully.");
      successHandler(res, {}, "Category deleted duccessfully.");
    }
  } catch (err) {
    categoryLogger.error("Has Errors => " + err);
    serverErrorHandler(res, err);
  }
};
