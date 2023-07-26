import { Router } from "express";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid";
import { contactSchemaRequest } from "../schemas/contacts.schema";
import { createContactControllerr } from "../controllers/contacts.controller";

const contactRoutes = Router();

contactRoutes.post(
  "",
  ensureDataIsValid(contactSchemaRequest),
  createContactControllerr
);

export { contactRoutes };
