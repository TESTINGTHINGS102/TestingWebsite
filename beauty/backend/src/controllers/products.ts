import { type Request, type Response } from 'express'
import { asyncHandler } from '../middleware/errorHandler'
import type { ApiResponse, PaginatedResult, Product } from '../types'

const products: Product[] = [
  {
    id: '1',
    name: 'Radiance Renewal Serum',
    description: 'A potent concentrate of vitamin C and hyaluronic acid for luminous skin.',
    price: 185,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600'],
    category: 'serums',
    ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid'],
    isNew: true,
    isBestSeller: false,
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Silk Protein Moisturizer',
    description: 'Ultra-rich cream infused with silk amino acids and ceramides.',
    price: 220,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600'],
    category: 'moisturizers',
    ingredients: ['Silk Amino Acids', 'Ceramides', 'Shea Butter', 'Squalane'],
    isNew: false,
    isBestSeller: true,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: '3',
    name: 'Golden Eye Treatment',
    description: 'Luxurious eye cream with 24k gold micro-particles and peptides.',
    price: 275,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600'],
    category: 'eye-care',
    ingredients: ['24k Gold', 'Peptides', 'Caffeine', 'Hyaluronic Acid'],
    isNew: true,
    isBestSeller: false,
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2025-02-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Rose Clay Mask',
    description: 'Detoxifying mask with Moroccan rose clay and chamomile.',
    price: 95,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1570194065650-d99fb4ee8e39?w=600'],
    category: 'masks',
    ingredients: ['Moroccan Rose Clay', 'Chamomile', 'Kaolin', 'Aloe Vera'],
    isNew: false,
    isBestSeller: true,
    createdAt: '2024-12-20T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
  },
]

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 12))
  const category = req.query.category as string | undefined

  let filtered = products
  if (category) {
    filtered = products.filter((p) => p.category === category)
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  const items = filtered.slice(start, start + limit)

  const result: PaginatedResult<Product> = {
    items,
    total,
    page,
    limit,
    totalPages,
  }

  const response: ApiResponse<PaginatedResult<Product>> = {
    success: true,
    data: result,
  }

  res.json(response)
})

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id)

  if (!product) {
    res.status(404).json({
      success: false,
      error: 'Product not found',
    })
    return
  }

  const response: ApiResponse<Product> = {
    success: true,
    data: product,
  }

  res.json(response)
})
