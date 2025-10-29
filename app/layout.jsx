import './globals.css'

export const metadata = {
  title: 'Transport Booking System',
  description: 'Система бронирования транспорта',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}