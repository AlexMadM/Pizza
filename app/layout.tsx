import './globals.css'

import { Nunito } from 'next/font/google'
import { Providers } from './providers'

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={nunito.variable} lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
