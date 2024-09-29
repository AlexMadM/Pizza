'use client'

import { Input } from '../ui/input'
import { RangeSlider } from '../ui/range-slider'
import { CheckoxFiltersGroup } from './checkbox-filters-group'
import { Title } from './title'
import { useIngredients } from '@/shared/hooks/use-ingredients'
import { useFilters } from '@/shared/hooks/use-filters'
import { useQueryFilters } from '@/shared/hooks/use-query-filters'

interface Props {
  className?: string
}

export const Filter = ({ className }: Props) => {
  const { ingredients, loading } = useIngredients()
  const filters = useFilters()

  useQueryFilters(filters)

  const items = ingredients.map(ingredient => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }))

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0])
    filters.setPrices('priceTo', prices[1])
  }

  return (
    <div className={className}>
      <Title text="Фильтры" size="sm" className="mb-5 font-bold" />
      <CheckoxFiltersGroup
        name="pizzaTypes"
        title="Тип теста"
        className="mb-5"
        selectedIngredients={filters.pizzaTypes}
        onClickCheckbox={filters.setPizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },

          { text: 'Традиционное', value: '2' },
        ]}
      />
      <CheckoxFiltersGroup
        name="sizes"
        title="Размеры"
        className="mb-5"
        selectedIngredients={filters.sizes}
        onClickCheckbox={filters.setSizes}
        items={[
          { text: '20cm', value: '20cm' },
          { text: '30cm', value: '30cm' },
          { text: '40cm', value: '40cm' },
        ]}
      />

      <div className="mt-5 border-y border-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            step={10}
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={e => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            step={10}
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckoxFiltersGroup
        name="ingredients"
        title="Ингредиенты"
        className="mt-5"
        limit={5}
        defaultItems={items.slice(0, 5)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setIngredients}
        selectedIngredients={filters.selectedIngredients}
      />
    </div>
  )
}
