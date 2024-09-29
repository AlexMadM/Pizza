import { axiosInstance } from './instance'
import { Ingredient } from '@prisma/client'
import { ApiRoutes } from './constants'

export const getAll = async () => {
  const { data } = await axiosInstance.get<Ingredient[]>('/ingredients')

  return data
}
