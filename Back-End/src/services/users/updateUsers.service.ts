import { Repository } from "typeorm";
import {
  TUserResponse,
  TUsersUpdateRequest,
} from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { userSchemaResponse } from "../../schemas/users.schema";

const updateUsersService = async (
  userId: string,
  userData: TUsersUpdateRequest
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const newUserData: User = userRepository.create({
    ...oldUserData,
    ...userData,
  });
  await userRepository.save(newUserData);

  const returnUser: TUserResponse = userSchemaResponse.parse(newUserData);

  return returnUser;
};

export default updateUsersService;
