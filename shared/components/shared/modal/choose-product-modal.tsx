'use client'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { Product } from '@prisma/client'
import { Title } from '../title'
import { useRouter } from 'next/navigation'
import { ChooseProductForm } from '../choose-product-form'
import { ProductWithRelations } from '@/@types/prisma'
import { ChoosePizzaForm } from '../choose-pizza-form'

interface Props {
  product: ProductWithRelations
  className?: string
}

export default function ChooseProductModal({ className, product }: Props) {
  const router = useRouter()
  const isPizzaForm = Boolean(product.items[0].pizzaType)
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  )
}
