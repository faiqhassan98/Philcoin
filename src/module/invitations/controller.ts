import * as express from "express";
import {
  serverErrorHandler,
  successHandler,
  badRequestHandler,
} from "../../utils";
// import { SendEmail } from "../../utils/sendEmail";
import { sendEmail } from "../../utils/sendEmailGrid";
import User from "../users/model";

import { InvitationModel } from "./model";

export const createInvitation = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const userObj = req.user as User;
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
      // const data = await SendEmail(invitation.email);
      console.log("data1");
      const data1 = await sendEmail(invitation.email);
      console.log("data1");
      console.log(data1);
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
    const invitationData = await InvitationModel.find({
      userId: userObj._id,
    });
    console.log(userObj);
    console.log(invitationData);
    if (!invitationData) {
      badRequestHandler(res, "invitation not found");
    } else {
      successHandler(
        res,
        { invitation: invitationData },
        "invitation fetched successfully!"
      );
    }
  } catch (err) {
    serverErrorHandler(res, err);
  }
};
