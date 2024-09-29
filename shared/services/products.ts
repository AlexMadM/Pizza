import { prisma } from '@/prisma/prisma-client'
import { axiosInstance } from './instance'
import { Product } from '@prisma/client'
import { ApiRoutes } from './constants'

export const search = async (query: string) => {
  const { data } = await axiosInstance.get<Product[]>('/products/search', { params: { query } })

  return data
}
