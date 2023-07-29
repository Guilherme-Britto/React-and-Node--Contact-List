import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entitie";
import { AppError } from "../errors/AppError";

const ensureUserIdIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: string = req.params.id;
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  try {
    const user: User | null = await userRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
  } catch (error: any) {
    throw new AppError(error.message, 404);
  }

  return next();
};

export default ensureUserIdIsValid;
