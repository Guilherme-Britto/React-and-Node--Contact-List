import { Router } from "express";
import {
  createUserController,
  deleteUsersController,
  listUserController,
  listUsersController,
  updateUsersController,
} from "../controllers/users.controller";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid";
import {
  userSchemaRequest,
  userSchemaUpdateRequest,
} from "../schemas/users.schema";
import ensureIsAdmin from "../middlewares/ensureIsAdmin";
import ensureTokenIsValid from "../middlewares/ensureTokenValid";
import ensureUserIdIsValid from "../middlewares/ensureUserIdIsValid";
import ensureEmailIsUnique from "../middlewares/ensureEmailIsUnique";

const userRoutes = Router();

userRoutes.post("", ensureDataIsValid(userSchemaRequest), createUserController);
userRoutes.get("", ensureTokenIsValid, ensureIsAdmin, listUsersController);
userRoutes.get(
  "/:id",
  ensureUserIdIsValid,
  ensureTokenIsValid,
  listUserController
);
userRoutes.patch(
  "/:id",
  ensureUserIdIsValid,
  ensureTokenIsValid,
  ensureDataIsValid(userSchemaUpdateRequest),
  ensureEmailIsUnique,
  updateUsersController
);
userRoutes.delete(
  "/:id",
  ensureUserIdIsValid,
  ensureTokenIsValid,
  deleteUsersController
);

export { userRoutes };
