import { cn } from '@/shared/lib/utils'
import { Container } from '@/shared/components/shared/container'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import { ArrowRight, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { SearchInput } from './search-input'
interface Props {
  className?: string
}

export const Header = ({ className }: Props) => {
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
        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        <div className="flex gap-3 items-center">
          <Button variant="outline" className="flex gap-1 items-center">
            <User size={16} />
            Войти
          </Button>
          <Button className="group relative">
            {' '}
            <b>{23} ₽</b>
            <span className="h-full w-[1px] bg-white/30 mx-3" />
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
              <b>{530}</b>
            </div>
            <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
          </Button>
        </div>
      </Container>
    </header>
  )
}

export default Header