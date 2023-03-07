import * as express from "express";
import {
  serverErrorHandler,
  successHandler,
  badRequestHandler
  
} from "../../utils";
import { SendEmail } from "../../utils/sendEmail";

import { InvitationModel } from "./model";

export const createInvitation = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
        const invitationData = await InvitationModel.findOne({
          email: req.body.email
        });
        if (invitationData) {
            badRequestHandler(res, "invitation with this name already exist!");
          } else {
            const invitation = new InvitationModel();
            invitation.email = req.body.email;
            invitation.name = req.body.name;
            invitation.status = req.body.status;
            await invitation.save();
            await SendEmail(invitation.email);
            successHandler(res, { invitation: invitation }, "invitation Created!");
          }
        
      } catch (err) {
        serverErrorHandler(res, err);
      }
    };