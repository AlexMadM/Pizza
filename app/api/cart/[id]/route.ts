import { prisma } from '@/prisma/prisma-client'
import { calcCartItemTotalAmount } from '@/shared/lib/calc-cart-item-total-amount'
import { NextRequest, NextResponse } from 'next/server'

async function updateCartTotalAmount(cartToken: string) {
  const userCart = await prisma.cart.findFirst({
    where: {
      OR: [
        {
          tokenId: cartToken,
        },
      ],
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  })

  const totalAmount = userCart?.items.reduce((acc, item) => {
    return acc + calcCartItemTotalAmount(item)
  }, 0)

  return await prisma.cart.update({
    where: {
      id: userCart?.id,
    },
    data: {
      totalAmount,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = (await req.json()) as { quantity: number }
    const token = req.cookies.get('cartToken')?.value
    if (!token) {
      return NextResponse.json({ error: 'No token' })
    }
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    })
    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' })
    }
    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: data.quantity,
      },
    })

    const updatedCart = await updateCartTotalAmount(token)
    return NextResponse.json(updatedCart)
  } catch (error) {
    console.log(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('cartToken')?.value
    // const currentUser = await getUserSession()
    // const userId = Number(currentUser?.id)

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(params.id),
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' })
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    })

    await updateCartTotalAmount(token)

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            tokenId: token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    })

    return NextResponse.json(userCart)
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: '[CART_DELETE] Server error' }, { status: 500 })
  }
}
