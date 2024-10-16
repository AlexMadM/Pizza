import { Container } from '@/shared/components/shared/container'
import { Title } from '@/shared/components/shared/title'
import { WhiteBlock } from '@/shared/components/shared/white-block'
import { Input } from '@/shared/components/ui/input'

export default function CheckoutPage() {
  return (
    <Container className="mt-10">
      <Title text="Oформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input name="lastName" className="text-base" placeholder="Фамилия" />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
            </div>
          </WhiteBlock>
        </div>
        <div className="w-[450px]">sdaf</div>
      </div>
    </Container>
  )
}
