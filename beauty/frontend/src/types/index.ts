export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  images: string[]
  category: ProductCategory
  ingredients?: string[]
  isNew?: boolean
  isBestSeller?: boolean
  createdAt: string
  updatedAt: string
}

export type ProductCategory =
  | 'cleansers'
  | 'serums'
  | 'moisturizers'
  | 'masks'
  | 'eye-care'
  | 'sunscreen'
  | 'sets'

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface Testimonial {
  id: string
  name: string
  title: string
  avatar: string
  content: string
  rating: number
}

export interface NavLink {
  label: string
  href: string
  isActive?: boolean
}

export interface AnimationVariant {
  hidden: object
  visible: object
  exit?: object
}

export type ThemeMode = 'light' | 'dark'
