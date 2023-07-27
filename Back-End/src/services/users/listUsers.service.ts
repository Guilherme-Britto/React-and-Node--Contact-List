import { Repository } from "typeorm";
import { TUsersResponse } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { usersSchemaResponse } from "../../schemas/users.schema";

const listUsersService = async (): Promise<TUsersResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  let users: User[] | undefined = await userRepository.find();

  const returnUsers: TUsersResponse = usersSchemaResponse.parse(users);

  return returnUsers;
};

export default listUsersService;
