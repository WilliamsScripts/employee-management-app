export interface IUser {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type TCreateUser = Pick<IUser, 'name' | 'email'>;
