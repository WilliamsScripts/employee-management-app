import { UserType } from "./user.type"

export interface RegisterDto {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginDto = {
  email: string
  password: string
}

export type UserResponse = {
  token: string,
  user: UserType
}