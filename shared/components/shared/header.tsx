import { cn } from '@/shared/lib/utils'
import { Container } from '@/shared/components/shared/container'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import { ArrowRight, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'
interface Props {
  className?: string
  hasSearch?: boolean
  hasCart?: boolean
}

export const Header = ({ className, hasSearch = true, hasCart = true }: Props) => {
  return (
    <header className={cn('border border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt={'logo'} width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">NextPizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex gap-3 items-center">
          <Button variant="outline" className="flex gap-1 items-center">
            <User size={16} />
            Войти
          </Button>
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}

export default Header
