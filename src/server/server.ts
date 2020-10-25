import App from "./app";
import * as bodyParser from "body-parser";
import constants from "./config/constants";

// middlewares
import loggerMiddleware from "./middlewares/logger";

// controllers
import StoreyController from "./controllers/stories/stories.controller";
const app = new App({
  port: Number(process.env.PORT) || constants.__port__ || 3000,
  controllers: [
    new StoreyController(),
  ],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware,
  ],
});

app.listen();
