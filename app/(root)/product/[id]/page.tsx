import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import { Container } from '@/shared/components/shared/container'

import { Title } from '@/shared/components/shared/title'
import GroupVariants from '@/shared/components/shared/group-variants'
import PizzaImage from '@/shared/components/shared/pizza-image'
import { ChoosePizzaForm } from '@/shared/components/shared/choose-pizza-form'
import { ChooseProductForm } from '@/shared/components/shared/choose-product-form'

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
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

  const isPizzaForm = Boolean(product.items[0].pizzaType)
  const firstItem = product.items[0]
  return (
    <Container className="flex flex-col my-10">
      {isPizzaForm ? (
        <ChoosePizzaForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={product.ingredients}
          items={product.items}
        />
      ) : (
        <ChooseProductForm items={product.items} imageUrl={product.imageUrl} name={product.name} />
      )}
    </Container>
  )
}
