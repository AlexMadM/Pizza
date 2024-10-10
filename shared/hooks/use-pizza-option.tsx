import { useEffect, useState } from 'react'
import { pizzaDetailsToText, PizzaSize, pizzaSizes, PizzaType } from '../constants/pizza'
import { ProductItem } from '@prisma/client'
import { useSet } from 'react-use'
import { addCartItem } from '../services/cart'
import toast from 'react-hot-toast'
import { useCart } from './use-cart'

export const usePizzaOption = (items: ProductItem[]) => {
  const { addCartItem, loading } = useCart()
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)
  const [selectedIngredients, { toggle: toggleAddIngredient }] = useSet(new Set<number>([]))
  const filteredPizzasByType = items.filter(item => item.pizzaType === type)

  const availablePizzaSizes = pizzaSizes.map(item => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(item.value)),
  }))
  const activeSizes = items?.filter(item => item.pizzaType === type).map(item => item.size)
  const productItem = items?.find(item => item.pizzaType === type && item.size === Number(size))

  const isActiveSize = (value: number | string) => {
    return activeSizes?.some(activeSize => activeSize === Number(value))
  }

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes.find(
      item => Number(item.value) === size && !item.disabled
    )
    const availableSize = availablePizzaSizes.find(item => !item.disabled)
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type])

  const addPizza = async () => {
    if (productItem) {
      try {
        await addCartItem({
          productItemId: productItem?.id,
          pizzaSize: size,
          type,
          ingredientsIds: Array.from(selectedIngredients),
          quantity: 1,
        })
        toast.success('Товар добавлен в корзину')
      } catch (error) {
        console.error(error)
        toast.error('Произошла ошибка при добавлении в корзину')
      }
    }
  }

  const isSelectedIngredient = (id: number) => {
    return selectedIngredients.has(id)
  }

  const textDetaills = pizzaDetailsToText(size, type)

  return {
    availablePizzaSizes,
    selectedIngredients,
    toggleAddIngredient,
    size,
    type,
    setSize,
    setType,
    isActiveSize,
    textDetaills,
    isSelectedIngredient,
    addPizza,
    loading,
  }
}
