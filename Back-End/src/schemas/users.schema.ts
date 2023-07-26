import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z
    .number()
    .refine((value: number) => value.toString().length === 9, {
      message: "Number must have exactly 9 characters.",
    }),
  createdAt: z.date(),
  password: z.string(),
  isAdmin: z.boolean().default(false),
});

const userSchemaRequest = userSchema.omit({
  id: true,
  createdAt: true,
});

const userSchemaResponse = userSchema.omit({
  password: true,
});

const usersSchemaResponse = z.array(userSchemaResponse);

const userSchemaUpdateRequest = userSchemaRequest
  .omit({ isAdmin: true })
  .partial();

export {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  usersSchemaResponse,
  userSchemaUpdateRequest,
};
