'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import { Category } from '@prisma/client'
import { it } from 'node:test'

interface Props {
  items: Category[] 
  className?: string
}

export const Categories = ({ className ,items}: Props) => {
  const categoryActiveId = useCategoryStore(state => state.activeId)
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map(({ id, name }, index) => (
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
