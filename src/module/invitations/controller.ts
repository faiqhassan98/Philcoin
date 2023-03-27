import * as express from "express";
import {
  serverErrorHandler,
  successHandler,
  badRequestHandler,
} from "../../utils";
import { SendEmail } from "../../utils/sendEmail";
// import { SendEmail } from "../../utils/sendEmail";
// import { sendEmail } from "../../utils/sendEmailGrid";
import User from "../users/model";

import { InvitationModel } from "./model";

export const createInvitation = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const userObj = req.user as User;
    console.log(userObj);
    // if (userObj.role != "admin") badRequestHandler(res, "Admin can send invite only");
    const invitationData = await InvitationModel.findOne({
      email: req.body.email,
    });
    if (invitationData) {
      badRequestHandler(res, "invitation with this name already exist!");
    } else {
      const invitation = new InvitationModel();
      invitation.email = req.body.email;
      invitation.name = req.body.name;
      // invitation.status = req.body.status;
      invitation.userId = userObj._id;
      await invitation.save();
      const data = await SendEmail(
        invitation.email,
        // `<a href='https://7c1d-103-104-192-70.in.ngrok.io/sign-up/?ref=${userObj.refCode}'>Invitation Link</a>`
        `<a href='http://192.168.0.181:3000/sign-up/?ref=${userObj.refCode}'>Invitation Link</a>`
      );
      console.log(data);
      // const data1 = await sendEmail(invitation.email);
      console.log("data1");
      // console.log(data1);
      successHandler(res, { invitation: invitation }, "invitation Created!");
    }
  } catch (err) {
    serverErrorHandler(res, err);
  }
};

export const getInvitation = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    // const user = user
    const userObj = req.user as User;
    // if (userObj.role != "admin") badRequestHandler(res, "Admin can view the invitations list");
    const invitationData = await InvitationModel.find({
      userId: userObj._id,
    });
    console.log(userObj);
    console.log(invitationData);
    if (invitationData.length >= 1) {
      successHandler(
        res,
        { invitation: invitationData },
        "invitation fetched successfully!"
      );
    } else {
      successHandler(
        res,
        { invitation: invitationData },
        "invitation not found!"
      );
    }
  } catch (err) {
    serverErrorHandler(res, err);
  }
};
