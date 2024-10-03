import { ArrowRight, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/shared/lib/utils'
import { CartDrawer } from './cart-drawer'

interface Props {
  className?: string
}

export const CartButton = ({ className }: Props) => {
  return (
    <CartDrawer>
      <Button className={cn('group relative', className)}>
        {' '}
        <b>{23} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
          <b>{530}</b>
        </div>
        <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
      </Button>
    </CartDrawer>
  )
}
