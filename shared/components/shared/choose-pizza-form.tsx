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
import { useState } from 'react'
import { Ingredient as IngredientType, ProductItem } from '@prisma/client'
import { Ingredient } from './ingredient'
import { useSet } from 'react-use'

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
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)
  const [selectedIngredients, { toggle: toggleAddIngredient }] = useSet(new Set<number>([]))

  const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)?.price || 0
  const totalIngredientsPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)

  const totalPrice = pizzaPrice + totalIngredientsPrice
  const textDetaills = `${size} см, ${mapPizzaTypes[type]} пицца`

  const onClickAddToCart = () => {
    onClickAdd?.()
    console.log(selectedIngredients)
  }

  const availablePizzas = items.filter(item => item.pizzaType === type)

  const availablePizzaSizes = pizzaSizes.map(item => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizzas.some(pizza => Number(pizza.size) === Number(item.value)),
  }))

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