import { ICreateUserDTO, IUser, IUpdateUserDTO } from "../types/userDTOs";
import { NotFound } from "../responseHandlers/errorHandlers";
import UserRepository from "../repositories/userRepository";

const repository = new UserRepository();

export default class UserService {
  async createUser(user: ICreateUserDTO): Promise<IUser> {
    const id = await repository.create(user);

    return repository.getById(id);
  }

  async getById(_id: string): Promise<IUser> {
    const user = await repository.getById(_id);
    if (!user) {
      throw new NotFound("User");
    }

    return user;
  }

  async getByEmail(email: string): Promise<IUser> {
    const user = await repository.getByEmail(email);
    if (!user) {
      throw new NotFound("User");
    }

    return user;
  }

  async getAll(): Promise<IUser[]> {
    return repository.getAll();
  }

  async updateById(_id: string, user: IUpdateUserDTO): Promise<IUser> {
    const wasUpdated = await repository.updateById(_id, user);
    if (!wasUpdated) {
      throw new NotFound("User");
    }

    return repository.getById(_id);
  }

  async deleteById(_id: string): Promise<IUser> {
    const userFound = await repository.getById(_id);
    if (!userFound) {
      throw new NotFound("User");
    }

    await repository.deleteById(_id);

    return userFound;
  }
}
