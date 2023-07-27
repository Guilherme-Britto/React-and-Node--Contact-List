import { z } from "zod";
import {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  userWithContactsSchemaResponse,
  usersSchemaResponse,
} from "../schemas/users.schema";
import { DeepPartial } from "typeorm";
userWithContactsSchemaResponse;
type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserResponse = z.infer<typeof userSchemaResponse>;
type TUsersResponse = z.infer<typeof usersSchemaResponse>;
type TUsersWithContactResponse = z.infer<typeof userWithContactsSchemaResponse>;
type TUsersUpdateRequest = DeepPartial<TUserRequest>;

export {
  TUser,
  TUserRequest,
  TUserResponse,
  TUsersResponse,
  TUsersUpdateRequest,
  TUsersWithContactResponse,
};
