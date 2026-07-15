import type { ApiResponse, PaginatedResponse, Product } from '@/types'

const API_BASE = '/api'

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE}${endpoint}`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new ApiError(response.status, error.message || 'Request failed')
  }

  return response.json()
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
}

export const productsApi = {
  getAll: (page = 1, limit = 12) =>
    api.get<PaginatedResponse<Product>>(`/products?page=${page}&limit=${limit}`),
  getById: (id: string) =>
    api.get<ApiResponse<Product>>(`/products/${id}`),
  getByCategory: (category: string) =>
    api.get<ApiResponse<Product[]>>(`/products?category=${category}`),
}

export { ApiError }
