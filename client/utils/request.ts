import axios, { Method } from 'axios'

export function request(
  method: Method, query: string, data?: unknown, auth?: string,
): Promise<any> {
  return axios.request({
    method,
    url: `${document.location.origin}/api/${query}`,
    data,
    validateStatus: () => true,
    headers: { 'Authorization': auth },
  })
}