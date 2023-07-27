import { Router } from "express";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid";
import {
  contactSchemaRequest,
  contactSchemaUpdateRequest,
} from "../schemas/contacts.schema";
import {
  createContactControllerr,
  deleteContactController,
  listContactsController,
  updateContactController,
} from "../controllers/contacts.controller";
import ensureTokenIsValid from "../middlewares/ensureTokenValid";
import ensureContactIdIsValid from "../middlewares/ensureContactIdIsValid";

const contactRoutes = Router();

contactRoutes.post(
  "",
  ensureTokenIsValid,
  ensureDataIsValid(contactSchemaRequest),
  createContactControllerr
);
contactRoutes.get("", ensureTokenIsValid, listContactsController);
contactRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureContactIdIsValid,
  ensureDataIsValid(contactSchemaUpdateRequest),
  updateContactController
);
contactRoutes.delete(
  "/:id",
  ensureContactIdIsValid,
  ensureTokenIsValid,
  deleteContactController
);

export { contactRoutes };
