import { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
}

export default function Main({ children }: MainProps) {
  return (
    <main className='max-w-[1200px] m-auto'>
      {children}
    </main>
  )
}
