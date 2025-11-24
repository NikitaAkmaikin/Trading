import './globals.css'

export const metadata = {
  title: 'Transport Booking System',
  description: 'Система бронирования транспорта',
}

import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}