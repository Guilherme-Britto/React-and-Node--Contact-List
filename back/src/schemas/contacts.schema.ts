import { z } from "zod";

const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.array(z.string().email()),
  phoneNumber: z.array(
    z.number().refine((value: number) => value.toString().length === 9, {
      message: "Number must have exactly 9 characters.",
    })
  ),
  createdAt: z.date(),
});

const contactSchemaRequest = contactSchema.omit({
  id: true,
  createdAt: true,
});

const contactSchemaResponse = contactSchema.extend({
  phoneNumber: z.array(z.string()),
});

const contactsSchemaResponse = z.array(
  contactSchema.extend({
    phoneNumber: z.array(z.string()),
  })
);

const contactSchemaUpdateRequest = contactSchemaRequest.partial();
export {
  contactSchema,
  contactSchemaRequest,
  contactsSchemaResponse,
  contactSchemaUpdateRequest,
  contactSchemaResponse,
};
