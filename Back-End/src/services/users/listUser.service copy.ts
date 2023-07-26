import { Repository } from "typeorm";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { userSchemaResponse } from "../../schemas/users.schema";

const listUsersService = async (id: string): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  let user: User | null = await userRepository.findOneBy({
    id: id,
  });

  const returnUsers: TUserResponse = userSchemaResponse.parse(user);

  return returnUsers;
};

export default listUsersService;
