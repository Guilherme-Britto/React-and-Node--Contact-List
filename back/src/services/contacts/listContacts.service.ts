import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { AppError } from "../../errors/AppError";
import { TUsersWithContactResponse } from "../../interfaces/users.interfaces";
import { userWithContactsSchemaResponse } from "../../schemas/users.schema";

const listContactsServicee = async (
  userId: string
): Promise<TUsersWithContactResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      contacts: true,
    },
  });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  return userWithContactsSchemaResponse.parse(user);
};

export { listContactsServicee };
