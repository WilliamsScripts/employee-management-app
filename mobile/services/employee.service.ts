import { EmployeeDto } from "@/types/employee.type"
import { requestHandler } from "@/utils/requestHandler"

export const getEmployeesRequest = async (query: string, page: number) => {
  const url = '/employees' + (query ? query + page : '')
  return await requestHandler('get', url)
}

export const getEmployeeDetailRequest = async (id: string) => {
  const url = '/employees/' + id
  return await requestHandler('get', url)
}

export const createNewEmployeeRequest = async (data: EmployeeDto) => {
  return await requestHandler('post', '/employees', data)
}

export const editEmployeeRequest = async (data: EmployeeDto, id?: string) => {
  if (!id) return
  const url = '/employees/' + id
  return await requestHandler('put', url, data)
}

export const archiveEmployeeRequest = async (id: string) => {
  const url = '/employees/' + id
  return await requestHandler('patch', url, {})
}