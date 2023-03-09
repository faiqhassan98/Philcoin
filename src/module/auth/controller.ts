import * as express from "express";
import {
  serverErrorHandler,
  successHandler,
  badRequestHandler,
  usersLogger,
  hashPassword,
  createToken,
  generateRandomString,
} from "../../utils";
import { UserModel } from "./../users/model";

export const registerUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const userData = await UserModel.findOne({ email: req.body.email });
    console.log(userData)
    if (userData) {
      usersLogger.info("User with this email already exist!");
      return badRequestHandler(res, "User with this email already exist!");
    } else {
      if (req.query.ref) {
        const refData = await UserModel.findOne({ refCode: req.query.ref });
        if (refData) {
          const user = new UserModel();
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.phone = req.body.phone;
          user.email = req.body.email;
          user.password = hashPassword(req.body.password, "10");
          user.refCode = generateRandomString(10);
          await user.save();
          const token = createToken(user._id.toString());
          refData.signupCount = refData.signupCount + 1;
          await refData.save();
          usersLogger.info("User Created!");
          successHandler(res, { user: user, token: token }, "User Created!");
        } else {
          const user = new UserModel();
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.phone = req.body.phone;
          user.email = req.body.email;
          user.password = hashPassword(req.body.password, "10");
          user.refCode = generateRandomString(10);
          await user.save();
          const token = createToken(user._id.toString());
          usersLogger.info("User Created!");
          successHandler(res, { user: user, token: token }, "User Created!");
        }
      } else {
        const user = new UserModel();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.password = hashPassword(req.body.password, "10");
        user.refCode = generateRandomString(10);
        await user.save();
        const token = createToken(user._id.toString());
        usersLogger.info("User Created!");
        successHandler(res, { user: user, token: token }, "User Created!");
      }
    }
  } catch (err) {
    usersLogger.error("Has Errors => " + err);
    serverErrorHandler(res, err);
  }
 
};

export const userLogin = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const userRecord = await UserModel.findOne({
      email: req.body.email,
      password: hashPassword(req.body.password, "10"),
    });
    if (userRecord) {
      const token = createToken(userRecord._id.toString());
      usersLogger.info("User Login Successfully!");
      successHandler(
        res,
        { user: userRecord, token: token },
        "User Login Successfully!"
      );
    } else {
      usersLogger.info("User Not Found!");
      badRequestHandler(res, "User Not Found againts given credentials!");
    }
  } catch (err) {
    usersLogger.error("Has Errors => " + err);
    serverErrorHandler(res, err);
  }
};
