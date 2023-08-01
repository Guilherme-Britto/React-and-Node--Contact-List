import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().transform((value) => Number(value)),
  createdAt: z.date(),
  password: z.string(),
  isAdmin: z.boolean().default(false),
});

export const userSchemaRequest = userSchema
  .omit({
    id: true,
    createdAt: true,
    contacts: true,
  })
  .extend({
    passwordConfirmation: z.string().optional(),
  });

export const userSchemaRequestForm = userSchemaRequest.extend({
  passwordConfirmation: z.string(),
});

export type CreateUserData = z.infer<typeof userSchemaRequest>;
export type userRequestForm = z.infer<typeof userSchemaRequestForm>;
