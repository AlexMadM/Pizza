'use client'
import { CartSidebar } from '@/shared/components/shared/cart-sidebar'
import { Container } from '@/shared/components/shared/container'
import { Title } from '@/shared/components/shared/title'
import { WhiteBlock } from '@/shared/components/shared/white-block'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useCart } from '@/shared/hooks/use-cart'
import { Api } from '@/shared/services/api-client'
import { toast } from 'react-hot-toast'
import { CartItem } from '@/shared/components/shared/cart-item'
import { Trash2 } from 'lucide-react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { CartItemSkeleton } from '@/shared/components/shared/skeletons/cart-item-skeleton'
import { orderFormSchema, TFormOrderData } from '@/shared/schemas/order-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput, FormTextarea } from '@/shared/components/shared/form'
import { AdressInput } from '@/shared/components/adress-input'
import { createOrder } from '@/app/actions'

const VAT = 15
const DELIVERY_PRICE = 250

export default function CheckoutPage() {
  const { totalAmount, items, loading, updateItemQuantity, removeCartItem } = useCart(true)
  const [submitting, setSubmitting] = useState(false)
  const { data: session } = useSession()
  const form = useForm<TFormOrderData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  })

  // useEffect(() => {
  //   async function fetchUserInfo() {
  //     const data = await Api.auth.getMe();
  //     const [firstName, lastName] = data.fullName.split(' ');
  //
  //     form.setValue('firstName', firstName);
  //     form.setValue('lastName', lastName);
  //     form.setValue('email', data.email);
  //   }
  //
  //   if (session) {
  //     fetchUserInfo();
  //   }
  // }, [session]);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const value = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, value)
  }

  const vatPrice = (totalAmount * VAT) / 100
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice

  const onSubmit = async (data: TFormOrderData) => {
    try {
      setSubmitting(true)

      const url = await createOrder(data)

      toast.error('Заказ успешно оформлен! 📝', {
        icon: '✅',
      })

      if (url) {
        location.href = url
      }
    } catch (error) {
      return toast.error('Неверный E-Mail или пароль', {
        icon: '❌',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className="mt-10">
      <Title text="Oформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <WhiteBlock
                title="1. Корзина"
                endAdornment={
                  totalAmount > 0 && (
                    <button className="flex items-center gap-3 text-gray-400 hover:text-gray-600">
                      <Trash2 size={16} />
                      Очистить корзину
                    </button>
                  )
                }
              >
                <div className="flex flex-col gap-5">
                  {loading
                    ? [...Array(3)].map((_, index) => <CartItemSkeleton key={index} />)
                    : items.map(item => (
                        <CartItem
                          key={item.id}
                          name={item.name}
                          imageUrl={item.imageUrl}
                          price={item.price}
                          quantity={item.quantity}
                          onClickRemove={() => removeCartItem(item.id)}
                          onClickCountButton={type =>
                            onClickCountButton(item.id, item.quantity, type)
                          }
                        />
                      ))}
                </div>

                {!totalAmount && <p className="text-center text-gray-400 p-10">Корзина пустая</p>}
              </WhiteBlock>

              <WhiteBlock
                title="2. Персональная информация"
                className={!totalAmount ? 'opacity-50 pointer-events-none' : ''}
                contentClassName="p-8"
              >
                <div className="grid grid-cols-2 gap-5">
                  <FormInput name="firstName" className="text-base" placeholder="Имя" />
                  <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
                  <FormInput name="email" className="text-base" placeholder="E-Mail" />
                  <FormInput name="phone" className="text-base" placeholder="Телефон" />
                </div>
              </WhiteBlock>

              <WhiteBlock
                className={!totalAmount ? 'opacity-50 pointer-events-none' : ''}
                title="3. Адрес доставки"
                contentClassName="p-8"
              >
                <div className="flex flex-col gap-5">
                  <Controller
                    control={form.control}
                    name="address"
                    render={({ field }) => <AdressInput onChange={field.onChange} />}
                  />

                  <FormTextarea
                    name="comment"
                    className="text-base"
                    placeholder="Комментарий к заказу"
                    rows={5}
                  />
                </div>
              </WhiteBlock>
            </div>
            <div className="w-[450px]">
              <CartSidebar
                totalPrice={totalPrice}
                totalAmount={totalAmount}
                vatPrice={vatPrice}
                deliveryPrice={DELIVERY_PRICE}
                submitting={submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
