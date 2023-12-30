import { storage } from "../storage";

const request = async <TResponse>(url: string, config?: RequestInit): Promise<TResponse> => {
  const response = await fetch(url, {
    ...config,
    headers: {
      ...config?.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });

  const jsonResult = await response.json();

  if (!response.ok) {
    throw new Error(jsonResult.message);
  }

  return jsonResult;
};

export const baseClient = {
  get: <TResponse>(url: string): Promise<TResponse> => request<TResponse>(url),
  post: <TResponse>(url: string, body: unknown): Promise<TResponse> =>
    request<TResponse>(url, { method: "POST", body: JSON.stringify(body) }),
  put: <TResponse>(url: string, body: unknown): Promise<TResponse> =>
    request<TResponse>(url, { method: "PUT", body: JSON.stringify(body) }),
  patch: <TResponse>(url: string, body: unknown): Promise<TResponse> =>
    request<TResponse>(url, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <TResponse>(url: string): Promise<TResponse> =>
    request<TResponse>(url, { method: "DELETE" }),
};
