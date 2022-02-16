import { ICreateUserDTO, IUser, IUpdateUserDTO } from "../types/userDTOs";

import userModel from "../db/models/userModel";

export default class UserRepository {
  async create(user: ICreateUserDTO): Promise<string> {
    const { _id } = await userModel.create(user);

    return _id;
  }

  async getById(_id: string): Promise<IUser> {
    return userModel.findOne({ _id }).exec();
  }

  async getByEmail(email: string): Promise<IUser> {
    return userModel.findOne({ email }, "_id name email").exec();
  }

  async getAll(): Promise<IUser[]> {
    return userModel.find({}).exec();
  }

  async updateById(_id: string, user: IUpdateUserDTO): Promise<IUser> {
    return userModel.findOneAndUpdate({ _id }, user).exec();
  }

  async deleteById(_id: string): Promise<void> {
    await userModel.deleteOne({ _id }).exec();
  }
}
