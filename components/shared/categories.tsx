'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'

interface Props {
  className?: string
}

const cats = [
  { id: 1, name: 'Пиццы' },
  { id: 2, name: 'Кофе' },
  { id: 3, name: 'Закуски' },
  { id: 4, name: 'Чай' },
  { id: 5, name: 'Напитки' },
  { id: 6, name: 'Пиццы' },
  { id: 7, name: 'Завтрак' },
  { id: 8, name: 'Закуски' },
]

export const Categories = ({ className }: Props) => {
  const categoryActiveId = useCategoryStore(state => state.activeId)
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {cats.map(({ id, name }, index) => (
        <a
          href={`/category/${name}`}
          key={id}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
          )}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  )
}
export default Categories
