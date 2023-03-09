//jshint esversion:6
import express, { Application } from "express";
import { errorHandler } from "./utils";
import middleware from "./config/middleware";
import * as path from "path";
import bodyParser from "body-parser";
import { authRoutes } from "./module/auth";
import { invitationRoutes } from "./module/invitations";
// import { userRoutes } from "./module/users";
// import { adminRoutes } from "./module/admin";
// import { categoryRoutes } from "./module/categories";

const app: Application = express();

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  }) 
);
middleware(app);
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/api/v1", [authRoutes, invitationRoutes]);

app.use(errorHandler);

export default app;
 