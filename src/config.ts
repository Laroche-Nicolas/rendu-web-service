import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  apiUrl: process.env.API_URL,
  frontUrl: process.env.FRONT_URL,
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expirationTime: Number(process.env.JWT_EXP),
  },
};
