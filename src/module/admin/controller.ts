import * as express from "express";
import {
  serverErrorHandler,
  successHandler,
  badRequestHandler,
  adminsLogger,
  hashPassword,
  createToken,
} from "../../utils";
import { AdminModel } from "./model";

export const registerAdmin = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const adminData = await AdminModel.find({
      $or: [{ email: req.body.email }, { fullName: req.body.fullName }],
    });
    if (adminData.length < 1) {
      const admin = new AdminModel();
      admin.fullName = req.body.fullName;
      admin.phone = req.body.phone;
      admin.email = req.body.email;
      admin.password = hashPassword(req.body.password, "10");
      await admin.save();
      const token = createToken(admin._id.toString());
      adminsLogger.info("Admin Created!");
      successHandler(res, { admin: admin, token: token }, "Admin Created!");
    } else {
      adminsLogger.info("Admin with this email and fullname already exist!");
      badRequestHandler(
        res,
        "Admin with this email and fullname  already exist!"
      );
    }
  } catch (err) {
    adminsLogger.error("Has Errors => " + err);
    serverErrorHandler(res, err);
  }
};

export const adminLogin = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const adminRecord = await AdminModel.findOne({
      email: req.body.email,
      password: hashPassword(req.body.password, "10"),
    });
    if (adminRecord) {
      const token = createToken(adminRecord._id.toString());
      adminsLogger.info("Admin Login Successfully!");
      successHandler(
        res,
        { admin: adminRecord, token: token },
        "Admin Login Successfully!"
      );
    } else {
      adminsLogger.info("Admin Not Found!");
      badRequestHandler(res, "Admin Not Found againts given credentials!");
    }
  } catch (err) {
    adminsLogger.error("Has Errors => " + err);
    serverErrorHandler(res, err);
  }
};
