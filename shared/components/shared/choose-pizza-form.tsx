'use client'
import { cn } from '@/shared/lib/utils'

import { Title } from './title'
import { Button } from '../ui/button'
import PizzaImage from './pizza-image'
import GroupVariants from './group-variants'
import {
  pizzaSizes,
  PizzaSize,
  PizzaType,
  pizzaTypes,
  mapPizzaTypes,
} from '@/shared/constants/pizza'
import { useEffect, useState } from 'react'
import { Ingredient as IngredientType, ProductItem } from '@prisma/client'
import { Ingredient } from './ingredient'
import { useSet } from 'react-use'
import { calcPizzaPrices } from '@/shared/lib/calc-pizza-prices'
import { usePizzaOption } from '@/shared/hooks/use-pizza-option'
import toast from 'react-hot-toast'
interface Props {
  imageUrl: string
  name: string
  className?: string
  ingredients: IngredientType[]
  items: ProductItem[]
  onClickAdd?: VoidFunction
}

export const ChoosePizzaForm = ({
  imageUrl,
  name,
  className,
  ingredients,
  items,
  onClickAdd,
}: Props) => {
  const {
    size,
    type,
    selectedIngredients,
    toggleAddIngredient,
    availablePizzaSizes,
    setSize,
    setType,

    isSelectedIngredient,
    addPizza,
  } = usePizzaOption(items)
  const totalPrice = calcPizzaPrices({ ingredients, items, size, type, selectedIngredients })
  const textDetaills = `${size} см, ${mapPizzaTypes[type]} пицца`

  const onClickAddToCart = async () => {
    try {
      await addPizza()
      onClickAdd?.()
    } catch (error) {
      toast.error('Произошла ошибка при добавлении в корзину')
      console.error(error)
    }
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>
        {/* 
        <PizzaSelector
          pizzaSizes={availablePizzaSizes}
          selectedSize={String(size)}
          selectedPizzaType={String(type)}
          onClickSize={setPizzaSize}
          onClickPizzaType={setPizzaType}
        />

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
          <IngredientsList
            ingredients={ingredients}
            onClickAdd={toggleAddIngredient}
            selectedIds={selectedIngredientsIds}
          />
        </div> */}
        <div className="flex flex-col gap-5 ">
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={value => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={value => setType(Number(value) as PizzaType)}
          />
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-5 my-5">
            {ingredients.map(ingredient => (
              <Ingredient
                key={ingredient.id}
                onClick={() => toggleAddIngredient(ingredient.id)}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          // loading={loading}
          onClick={onClickAddToCart}
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
