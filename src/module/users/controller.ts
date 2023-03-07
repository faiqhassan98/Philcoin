import * as express from "express";
import {
  serverErrorHandler,
  successHandler,
  // badRequestHandler,
  usersLogger,
} from "../../utils";
import User, { UserModel } from "./../users/model";

export const userInfo = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const userObj = req.user as User;
    const userData = await UserModel.findOne({ _id: userObj._id });
    usersLogger.info("User Data!");
    successHandler(res, userData, "User Data!");
  } catch (err) {
    usersLogger.error("Has Errors => " + err);
    serverErrorHandler(res, err);
  }
};
