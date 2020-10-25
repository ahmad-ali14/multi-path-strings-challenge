import IconfigInterface from "./Iconfig.interface";

import * as dotenv from "dotenv";
dotenv.config();
const env = process.env;

const config: IconfigInterface = {
  __port__: Number(env.PORT),
};

export default config;
