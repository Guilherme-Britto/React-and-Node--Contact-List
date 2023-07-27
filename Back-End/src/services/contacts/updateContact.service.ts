import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entite";
import { AppError } from "../../errors/AppError";
import {
  TContact,
  TContactUpdateRequest,
} from "../../interfaces/contacts.interfaces";
import { contactSchema } from "../../schemas/contacts.schema";

const updateContactService = async (
  data: TContactUpdateRequest,
  contactId: string
): Promise<TContact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const oldContact = await contactRepository.findOneBy({ id: contactId });

  if (!oldContact) {
    throw new AppError("Contact not found", 404);
  }

  const newContact = contactRepository.create({
    ...oldContact,
    ...data,
  });

  await contactRepository.save(newContact);

  return contactSchema.parse(newContact);
};

export { updateContactService };
