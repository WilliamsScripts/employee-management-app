import http from "@/lib/http";
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const requestHandler = async (
  method: HttpMethod,
  url: string,
  formData?: Record<string, any>) => {
  try {
    const response = await http[method](url, formData)
    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};