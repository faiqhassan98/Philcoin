import { Router } from "express";
import { requireAuth } from "../../utils";
import * as InvitationController from "./controller";
// import rules from "./rules";

export const invitationRoutes = Router();
invitationRoutes.post(
  "/invite",
  requireAuth,
  InvitationController.createInvitation
);
invitationRoutes.get(
  "/invite",
  requireAuth,
  InvitationController.getInvitation
);
