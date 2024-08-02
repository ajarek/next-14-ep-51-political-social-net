import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Polityczna Sieć Społeczna',
  description:
    'Dołącz do społeczności, twórz i dziel się swoimi przemyśleniami.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-[1440px] mx-auto">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
