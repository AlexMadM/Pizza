'use client'

import { useEffect, useRef } from 'react'
import { Title } from './title'
import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'
import { useIntersection } from 'react-use'
import { useCategoryStore } from '@/store/category'

interface Props {
  title: string
  listClassName?: string
  categoryId: number
  products: any[]
  className?: string
}

const ProductsGroupList = ({ className, title, listClassName, categoryId, products }: Props) => {
  const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [intersection])

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imgUrl={product.imgUrl}
          />
        ))}
      </div>
    </div>
  )
}
export default ProductsGroupList