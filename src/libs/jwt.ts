import { verify, sign } from "jsonwebtoken";


const JWT_SECRET = "PAPA_CON_QUESO";

export const createToken = (payload: any) => {
  return sign(payload, JWT_SECRET);
}

export const verifyToken = (token: string) => {
  return verify(token, JWT_SECRET);
}