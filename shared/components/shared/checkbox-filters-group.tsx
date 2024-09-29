'use client'
import { useState } from 'react'
import { Input } from '../ui/input'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox'
import { Skeleton } from '../ui/skeleton'

type Item = FilterChecboxProps
interface Props {
  loading?: boolean
  className?: string
  title: string
  items: Item[]
  defaultItems?: Item[]
  limit?: number
  searchInputPlaceholder?: string
  onClickCheckbox?: (id: string) => void
  defaultValue?: string[]
  selectedIngredients?: Set<string>
  name?: string
}

export const CheckoxFiltersGroup = ({
  loading,
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Поиск',
  onClickCheckbox,
  defaultValue,
  className,
  selectedIngredients,
  name,
}: Props) => {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  if (loading) {
    return (
      <div>
        <p className="font-bolt mb-3">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="mb-3 h-6" />)}
      </div>
    )
  }
  const list = showAll
    ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    : (defaultItems ?? items).slice(0, limit)
  return (
    <div className={className}>
      <p className="font-bold mb-5">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onSearchChange}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list?.map(item => (
          <FilterCheckbox
            key={item.value}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selectedIngredients?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(prev => !prev)} className="text-primery mt-3">
            {showAll ? 'Скрыть' : 'Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}
