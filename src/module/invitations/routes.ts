import { Router } from "express";
import * as InvitationController from "./controller";
// import rules from "./rules";

export const invitationRoutes = Router();
invitationRoutes.post(
  "/addinvitation",
  InvitationController.createInvitation
);
