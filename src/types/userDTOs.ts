export interface ICreateUserDTO {
  name: string;
  email: string;
  photo?: string;
}

export interface IUpdateUserDTO {
  name?: string;
  email?: string;
  photo?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  photo?: string;
}
