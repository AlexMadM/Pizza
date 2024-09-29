import Header from '@/shared/components/shared/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
