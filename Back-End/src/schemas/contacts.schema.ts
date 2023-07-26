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

export { contactSchema, contactSchemaRequest };
