import Header from '@/shared/components/shared/header'
import { Metadata } from 'next'
import { Container } from '@/shared/components/shared/container'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Header hasCart={false} hasSearch={false} className="border-gray-200" />
        {children}
      </Container>
    </main>
  )
}
