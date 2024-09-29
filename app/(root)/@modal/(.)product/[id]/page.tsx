import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

import ChooseProductModal from '@/shared/components/shared/modal/choose-product-modal'

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          product: {
            include: {
              items: true,
            },
          },
        },
      },
    },
  })

  if (!product) {
    return notFound()
  }
  return <ChooseProductModal product={product} />
}
