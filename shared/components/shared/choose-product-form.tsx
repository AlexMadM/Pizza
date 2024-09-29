import { cn } from '@/shared/lib/utils'
import ProductImage from './pizza-image'
import { Title } from './title'
import { Button } from '../ui/button'

interface Props {
  imageUrl: string
  name: string
  className?: string

  items?: any[]
  onClickAdd?: VoidFunction
}

export const ChooseProductForm = ({
  imageUrl,
  name,
  className,

  items,
  onClickAdd,
}: Props) => {
  const textDetaills = 'Выберите размер и состав пиццы'
  const totalPrice = 100
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]"
        />
      </div>

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <Button
          //   loading={loading}
          //   onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}