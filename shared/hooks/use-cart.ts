import { useEffect } from 'react'
import { CreateCartItemValues } from '../services/dto/cart'
import { ICartItem, useCartStore } from '../store/cart'

import debounce from 'lodash.debounce'

type ReturnProps = {
  totalAmount: number
  items: ICartItem[]
  loading: boolean
  updateItemQuantity: (id: number, quantity: number) => void
  removeCartItem: (id: number) => void
  addCartItem: (values: CreateCartItemValues) => void
}

export const useCart = (runFetch?: boolean): ReturnProps => {
  const [
    totalAmount,
    items,
    fetchCartItems,
    loading,
    addCartItem,
    updateItemQuantity,
    removeCartItem,
  ] = useCartStore(state => [
    state.totalAmount,
    state.items,
    state.fetchCartItems,
    state.loading,
    state.addCartItem,
    debounce(state.updateItemQuantity, 200),
    state.removeCartItem,
  ])

  useEffect(() => {
    if (runFetch) {
      fetchCartItems()
    }
  }, [])

  return {
    totalAmount,
    items,
    loading,
    addCartItem,
    updateItemQuantity,
    removeCartItem,
  }
}
