import { useEffect, useState } from 'react'
import { PizzaSize, pizzaSizes, PizzaType } from '../constants/pizza'
import { ProductItem } from '@prisma/client'
import { useSet } from 'react-use'

export const usePizzaOption = (items: ProductItem[]) => {
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)
  const [selectedIngredients, { toggle: toggleAddIngredient }] = useSet(new Set<number>([]))
  const filteredPizzasByType = items.filter(item => item.pizzaType === type)

  const availablePizzaSizes = pizzaSizes.map(item => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(item.value)),
  }))

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes.find(
      item => Number(item.value) === size && !item.disabled
    )
    const availableSize = availablePizzaSizes.find(item => !item.disabled)
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type])

  return {
    availablePizzaSizes,
    selectedIngredients,
    toggleAddIngredient,
    size,
    type,
    setSize,
    setType,
  }
}
