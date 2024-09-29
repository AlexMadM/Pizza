import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Container } from '@/shared/components/shared/container'
import Categories from '@/shared/components/shared/categories'
import SortPopup from '@/shared/components/shared/sort-popup'
import { Category } from '@prisma/client'

interface Props {
  className?: string
  categories: Category[]
}

const TopBar = ({ className, categories }: Props) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  )
}

export default TopBar
