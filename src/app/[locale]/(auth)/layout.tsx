import { ReactNode } from 'react'

type RegisterLayoutProps = {
  children: ReactNode
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return <div className="min-h-screen bg-blue-50">{children}</div>
}
