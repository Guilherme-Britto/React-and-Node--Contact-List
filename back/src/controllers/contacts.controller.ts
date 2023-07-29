import { Response, Request } from "express";
import { createContactService } from "../services/contacts/createContact.service";
import { listContactsServicee } from "../services/contacts/listContacts.service";
import { updateContactService } from "../services/contacts/updateContact.service";
import { AppError } from "../errors/AppError";
import { deleteContactService } from "../services/contacts/deleteContact.service";

const createContactControllerr = async (req: Request, res: Response) => {
  const contact = await createContactService(req.body, res.locals.token.id);

  return res.status(201).json(contact);
};

const listContactsController = async (req: Request, res: Response) => {
  const contacts = await listContactsServicee(res.locals.token.id);

  return res.json(contacts);
};

const updateContactController = async (req: Request, res: Response) => {
  const { id, isAdmin } = res.locals.token;
  const userId = res.locals.userId;

  if (isAdmin || userId == id) {
    const updateTask = await updateContactService(req.body, req.params.id);
    return res.json(updateTask);
  }
  throw new AppError("Insufficient permission", 403);
};

const deleteContactController = async (req: Request, res: Response) => {
  const { id, isAdmin } = res.locals.token;
  const userId = res.locals.userId;

  if (isAdmin || userId == id) {
    await deleteContactService(req.params.id);
    res.status(204).send();
  }
  throw new AppError("Insufficient permission", 403);
};

export {
  createContactControllerr,
  listContactsController,
  updateContactController,
  deleteContactController,
};
