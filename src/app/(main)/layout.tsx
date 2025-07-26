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
      
        {children}
     
      <Footer/>
    </>
  )
}
