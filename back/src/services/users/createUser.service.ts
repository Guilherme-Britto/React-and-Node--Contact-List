import { hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { TUserRequest, TUserResponse } from "../../interfaces/users.interfaces";
import { AppError } from "../../errors/AppError";
import { userSchemaResponse } from "../../schemas/users.schema";
import { User } from "../../entities/user.entitie";

const createUserService = async (
  data: TUserRequest
): Promise<TUserResponse> => {
  const { email } = data;
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (findUser) {
    throw new AppError("user already exists", 409);
  }

  const hashedPassword = await hash(data.password, 10);
  const user = userRepository.create({
    ...data,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return userSchemaResponse.parse(user);
};

export { createUserService };
