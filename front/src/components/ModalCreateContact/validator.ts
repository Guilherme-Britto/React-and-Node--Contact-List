import { z } from "zod";

const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().array(),
  phoneNumber: z.number().array(),
  createdAt: z.date(),
});

export const contactSchemaRequest = contactSchema.omit({
  id: true,
  createdAt: true,
});

export const contactSchemaRequestForm = contactSchemaRequest
  .omit({
    email: true,
    phoneNumber: true,
  })
  .extend({
    email1: z.string().optional(),
    email2: z.string().optional(),
    phoneNumber1: z.string().transform((value) => Number(value)),
    phoneNumber2: z.string().transform((value) => Number(value)),
  });

export type CreateContactData = z.infer<typeof contactSchemaRequest>;
export type ContactRequestForm = z.infer<typeof contactSchemaRequestForm>;
