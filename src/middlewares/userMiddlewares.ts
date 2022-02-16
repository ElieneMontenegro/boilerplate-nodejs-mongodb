import { Request, Response, NextFunction } from "express";
import * as emailValidator from "email-validator";

import UserRepository from "../repositories/userRepository";

const db = new UserRepository();

export const emailAndCPFValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.email) {
    const emailAlreadyExists = await db.getByEmail(req.body.email);
    if (emailAlreadyExists) {
      return res.status(400).json(`Try a different email`);
    }

    const isValid = emailValidator.validate(req.body.email);
    if (!isValid) {
      return res.status(400).json(`email is not valid`);
    }
  }

  return next();
};
