import { Response, Request } from "express";
import { createUserService } from "../services/users/createUser.service";
import {
  TUsersResponse,
  TUsersUpdateRequest,
} from "../interfaces/users.interfaces";
import listUsersService from "../services/users/listUsers.service";
import { AppError } from "../errors/AppError";
import updateUsersService from "../services/users/updateUsers.service";
import listUserService from "../services/users/listUsers.service";
import deleteUsersService from "../services/users/deleteUsers.service";

const createUserController = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body);

  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TUsersResponse = await listUsersService();
  return res.json(users);
};

const listUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idParams: string = req.params.id;
  const { id, isAdmin } = res.locals.token;

  if (isAdmin || idParams == id) {
    const user = await listUserService();

    return res.status(200).json(user);
  }

  throw new AppError("Insufficient permission", 403);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idParams: string = req.params.id;
  const { id, isAdmin } = res.locals.token;
  const userData: TUsersUpdateRequest = req.body;

  if (isAdmin || idParams == id) {
    const user = await updateUsersService(idParams, userData);

    return res.status(200).json(user);
  }

  throw new AppError("Insufficient permission", 403);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;

  await deleteUsersService(id);

  return res.status(204).send();
};
export {
  createUserController,
  listUsersController,
  updateUsersController,
  listUserController,
  deleteUsersController,
};
