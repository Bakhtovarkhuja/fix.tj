import { ReactNode } from 'react'
import Header from '../components/layout/header'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <div className="mt-[90px]">
        {children}
      </div>
    </>
  )
}
