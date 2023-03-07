import { Server, createServer } from "http";
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") config();
import { serverLogger, dbLogger } from "./utils";

import app from "./app";
import db from "./config/db";

const server: Server = createServer(app);
const port = Number(process.env.PORT || 9000);

db()
  .then(() => {
    server.listen(port, () => {
      serverLogger.info("Express server started on port: " + port);
    });
  })
  .catch((err) => {
    dbLogger.error("Connection error: " + err);
  });
