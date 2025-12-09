import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ARCH CONTRACTORS LLC | Building Better Living',
  description: 'Premier General Contracting. Specializing in multi-family renovations for management companies.',
  icons: {
    icon: '/images/logo.png', // <--- THIS TELLS THE BROWSER TO USE YOUR LOGO
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0a0a0a] text-[#EAEAEA] selection:bg-[#D4AF37] selection:text-black overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}