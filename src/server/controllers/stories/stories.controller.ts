import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase.interface";
import  MultiString  from "./multiString.model";

const store = new MultiString();


class StoreyController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/stories", this.allStories );
  }

  allStories = (req: Request, res: Response) => {
   res.json(store.getAllStories());
  };


}

export default StoreyController;
