import { cn } from '@/shared/lib/utils'
import { Container } from '@/shared/components/shared/container'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import { ArrowRight, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'
import { ProfileButton } from '@/shared/components/shared/profile-button'
import { AuthModal } from '@/shared/components/shared/modal/auth-modal'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
interface Props {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    let toastMessage = ''

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!'
    }

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.'
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/')
        toast.success(toastMessage, {
          duration: 3000,
        })
      }, 1000)
    }
  }, [])

  const onClickOpenAuthModal = () => setOpenAuthModal(true)

  return (
    <header className={cn('border-b border-gray-100', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={35} height={35} alt="Logo" />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={onClickOpenAuthModal} />

          <ProfileButton onClickOpenModal={onClickOpenAuthModal} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}
