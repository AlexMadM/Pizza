import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import { Container } from '@/shared/components/shared/container'

import { Title } from '@/shared/components/shared/title'
import GroupVariants from '@/shared/components/shared/group-variants'
import PizzaImage from '@/shared/components/shared/pizza-image'

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } })
  if (!product) {
    return notFound()
  }
  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} size={40} />
        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-400">Best off!!!</p>
          <GroupVariants
            items={[
              {
                name: 'Маленькая',
                value: '1',
              },
              {
                name: 'Средняя',
                value: '2',
              },
              {
                name: 'Большая',
                value: '3',
              },
            ]}
          />
        </div>
      </div>
    </Container>
  )
}
