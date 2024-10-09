import { prisma } from '@/prisma/prisma-client'
import { calcCartItemTotalAmount } from '@/shared/lib/calc-cart-item-total-amount'
import { CreateCartItemValues } from '@/shared/services/dto/cart'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value
    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] })
    }

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
  } catch (error) {
    console.log(error)
  }
}

async function findOrCreateCart(cartToken: string | undefined) {
  let userCart = await prisma.cart.findFirst({
    where: {
      OR: [
        {
          tokenId: cartToken,
        },
      ],
    },
  })

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        tokenId: cartToken,
      },
    })
  }

  return userCart
}

async function getCartTotalAmount(cartId: number): Promise<number> {
  const userCartAfterUpdate = await prisma.cart.findFirst({
    where: {
      id: cartId,
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
    orderBy: {
      createdAt: 'desc',
    },
  })

  const totalAmount = userCartAfterUpdate?.items.reduce(
    (acc, item) => acc + calcCartItemTotalAmount(item),
    0
  )

  return totalAmount ?? 0
}

async function updateCartTotalAmount(cartId: number, totalAmount: number) {
  const updatedCart = await prisma.cart.update({
    where: {
      id: cartId,
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

  return updatedCart
}

export async function POST(req: NextRequest) {
  try {
    // const currentUser = await getUserSession()
    // const userId = Number(currentUser?.id)
    let cartToken = req.cookies.get('cartToken')?.value

    const data = (await req.json()) as CreateCartItemValues

    if (!cartToken) {
      cartToken = crypto.randomUUID()
    }

    let userCart = await findOrCreateCart(cartToken)

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: { every: { id: { in: data.ingredientsIds } } },
      },
    })

    if (findCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + data.quantity,
        },
      })

      const resp = NextResponse.json(updatedCartItem)
      resp.cookies.set('cartToken', cartToken)
      return resp
    }

    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        quantity: data.quantity,
        type: data.type,
        pizzaSize: data.pizzaSize,
        ingredients: { connect: data.ingredientsIds?.map(id => ({ id })) },
      },
    })

    const totalAmount = await getCartTotalAmount(userCart.id)
    const updatedCart = await updateCartTotalAmount(userCart.id, totalAmount)

    const resp = NextResponse.json(updatedCart)
    resp.cookies.set('cartToken', cartToken)
    return resp
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: '[CART_POST] Server error' }, { status: 500 })
  }
}
