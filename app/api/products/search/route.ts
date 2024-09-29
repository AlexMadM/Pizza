import { GetSearchParams } from '@/shared/lib/find-pizzas'
import { getSearchParams } from '@/shared/lib/get-searh-params'
import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const params = getSearchParams<GetSearchParams>(req.url)

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: params.query,
        mode: 'insensitive',
      },
    },
    take: 5,
  })

  return NextResponse.json(products)
}
