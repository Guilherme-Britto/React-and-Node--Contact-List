import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entite";
import { User } from "../../entities/user.entitie";
import { AppError } from "../../errors/AppError";
import {
  TContact,
  TContactRequest,
} from "../../interfaces/contacts.interfaces";
import { contactSchema } from "../../schemas/contacts.schema";

const createContactService = async (
  data: TContactRequest,
  userId: string
): Promise<Contact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  const contact = contactRepository.create({
    ...data,
    user,
  });

  await contactRepository.save(contact);

  return contact;
};

export { createContactService };
