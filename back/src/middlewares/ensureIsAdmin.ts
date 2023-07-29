import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

const ensureIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const admin = res.locals.token.isAdmin;

  if (admin) {
    return next();
  }

  throw new AppError("Insufficient permission", 403);
};

export default ensureIsAdmin;
