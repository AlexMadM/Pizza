import Link from 'next/link'
import { Title } from './title'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

interface Props {
  id: string
  imgUrl?: string
  name: string
  price: number
  className?: string
}

export const ProductCard = ({ className, id, imgUrl, name, price }: Props) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imgUrl} alt="Logo" />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bolt" />
        <p className="text-sm text-gray-400">
          Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} р</b> ₽
          </span>
          <Button variant="secondary" className="text-base font-bolt">
            <Plus className="w-5 h-5 mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  )
}
