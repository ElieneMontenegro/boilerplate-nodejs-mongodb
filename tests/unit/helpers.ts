import faker from "faker-br";

import { ICreateUserDTO } from "../../src/types/userDTOs";

export const mockUser = (user?: Partial<ICreateUserDTO>): ICreateUserDTO => {
  const name = user.name ?? faker.name.firstName();

  return {
    name,
    email: user.email ?? faker.internet.email(name),
    photo: user.photo ?? "sem foto",
  };
};

export const getFakeId = () => {
  return "61796a9e148cbf1e386637ec";
};
