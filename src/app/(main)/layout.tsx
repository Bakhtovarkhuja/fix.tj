import { ReactNode } from 'react'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <div className="mt-[40px] mb-[40px]">
        {children}
      </div>
      <Footer/>
    </>
  )
}
