import { Repository } from "typeorm";
import { TUsersWithContactResponse } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { userWithContactsSchemaResponse } from "../../schemas/users.schema";
import { AppError } from "../../errors/AppError";

const listUserServicee = async (
  id: string
): Promise<TUsersWithContactResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  let user: User | null = await userRepository.findOne({
    where: {
      id: id,
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

export default listUserServicee;
