import { z } from "zod";
import {
  contactSchema,
  contactSchemaRequest,
  contactSchemaResponse,
  contactsSchemaResponse,
} from "../schemas/contacts.schema";
import { DeepPartial } from "typeorm";
contactSchemaResponse;
type TContact = z.infer<typeof contactSchema>;
type TContactRequest = z.infer<typeof contactSchemaRequest>;
type TContactsResponse = z.infer<typeof contactsSchemaResponse>;
type TContactResponse = z.infer<typeof contactSchemaResponse>;
type TContactUpdateRequest = DeepPartial<TContactRequest>;

export {
  TContact,
  TContactRequest,
  TContactsResponse,
  TContactResponse,
  TContactUpdateRequest,
};
