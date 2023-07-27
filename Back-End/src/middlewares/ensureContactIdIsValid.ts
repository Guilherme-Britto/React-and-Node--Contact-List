import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppError";
import { Contact } from "../entities/contacts.entite";

const ensureContactIdIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: string = req.params.id;

  const contactRepository = AppDataSource.getRepository(Contact);
  try {
    const contact: Contact | null = await contactRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });
    if (!contact) {
      throw new AppError("Contact not found", 404);
    }

    const userId: string = contact.user.id;

    res.locals.userId = userId;
  } catch (error: any) {
    throw new AppError(error.message, 404);
  }

  return next();
};

export default ensureContactIdIsValid;
