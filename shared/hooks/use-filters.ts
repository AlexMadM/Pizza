import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useSet } from 'react-use'

export interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

export interface QueryFilters extends PriceProps {
  pizzaTypes: string
  sizes: string
  ingredients: string
}

export const useFilters = () => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>
  /*filters ingredients*/
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
  )

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : [])
  )
  //filters pizzaTypes
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []
    )
  )
  //filters prices
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  })

  const updatePrice = (name: keyof PriceProps, value: number) => {
    // setPrices({ ...prices, [name]: value })
    setPrices(prev => ({ ...prev, [name]: value }))
  }

  return {
    selectedIngredients,
    setIngredients: toggleIngredients,
    sizes,
    setSizes: toggleSizes,
    pizzaTypes,
    setPizzaTypes: togglePizzaTypes,
    prices,
    setPrices: updatePrice,
  }
}
