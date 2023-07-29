import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entitie";
import { AppError } from "../errors/AppError";

const ensureEmailIsUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;
  const id: string = req.params.id;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (email) {
    const user: User | null = await userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user && user.id !== id) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
};

export default ensureEmailIsUnique;
