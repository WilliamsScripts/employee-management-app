import { LoginDto, RegisterDto } from "@/types/auth.type"
import { requestHandler } from "@/utils/requestHandler"

export const registerRequest = async (data: RegisterDto) => {
  return await requestHandler('post', '/auth/register', data)
}

export const loginRequest = async (data: LoginDto) => {
  return await requestHandler('post', '/auth/login', data)
}