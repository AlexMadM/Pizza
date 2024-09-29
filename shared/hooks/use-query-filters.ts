import { useEffect } from 'react'
import qs from 'qs'
import { useRouter } from 'next/navigation'
import { PriceProps, QueryFilters, useFilters } from './use-filters'

interface Filters {
  selectedIngredients: Set<string>
  sizes: Set<string>
  pizzaTypes: Set<string>
  prices: PriceProps
}

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter()

  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    }
    const query = qs.stringify(params, { arrayFormat: 'comma' })
    router.push(`?${query}`, { scroll: false })
  }, [filters, router])
}
