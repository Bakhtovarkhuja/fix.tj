'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, LogOut, Menu, X } from 'lucide-react'
import Image from 'next/image'
import decode from '@/app/utils/axios-reguest'
import { JwtPayload } from 'jwt-decode'

interface MyJwtPayload extends JwtPayload {
	id?: string
}
import avatar from '@/app/assets/avatar.png'
import { useRouter } from 'next/navigation'
import useZapros from '@/app/store/zapros'
import Link from 'next/link'
import { CoolMode } from '@/components/magicui/cool-mode'

export default function Header() {
	const { me, mee } = useZapros()
	const router = useRouter()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(true)
	useEffect(() => {
		const token = localStorage.getItem('access_token')
		setIsLoggedIn(!!token)
	}, [])

	const handleLogout = () => {
		localStorage.removeItem('access_token')
		router.push('/login')
	}

	useEffect(() => {
		const jwt = decode.decode as MyJwtPayload
		if (jwt && jwt.id) {
			mee(Number(jwt.id))
		}
	}, [mee])

	return (
		<header className=' shadow-sm border-b sticky top-0 z-50 bg-[rgba(255,255,255,0.8)]'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<CoolMode>
						<Link href='/' className='flex items-center space-x-2'>
							<div className='w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center'>
								<span className='text-white font-bold text-xl'>F</span>
							</div>
							<span className='text-2xl font-bold text-red-500'>FIX.TJ</span>
						</Link>
					</CoolMode>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-8'>
						<CoolMode>
							<div className='hidden md:flex items-center space-x-8'>
								<Link
									href='/'
									className='text-gray-700 hover:text-red-500 font-medium transition-colors'
								>
									АСОСӢ
								</Link>
								<Link
									href='/master'
									className='text-gray-700 hover:text-red-500 font-medium transition-colors'
								>
									УСТОХО
								</Link>
								<Link
									href='/about'
									className='text-gray-700 hover:text-red-500 font-medium transition-colors'
								>
									ДАР БОРАИ МО
								</Link>
							</div>
						</CoolMode>
					</nav>

					{/* Profile Menu / Auth Buttons */}
					<div className='hidden md:flex items-center space-x-4'>
						{isLoggedIn ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										className='relative h-10 w-10 rounded-full'
									>
										<Image
											src={me?.avatar || avatar}
											alt='salom'
											fill
											className='rounded-[50%] bg-gray-200'
										/>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='w-56' align='end' forceMount>
									<DropdownMenuItem asChild>
										<Link href='/profile' className='flex items-center'>
											<User className='mr-2 h-4 w-4' />
											Профил
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href='/order' className='flex items-center'>
											<User className='mr-2 h-4 w-4' />
											Фармоишҳо
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleLogout}>
										<LogOut className='mr-2 h-4 w-4' />
										Баромад
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<CoolMode>
								<div className='flex items-center space-x-2'>
									<Button variant='outline' asChild>
										<Link href='/login'>Ворид шудан</Link>
									</Button>
									<Button asChild className='bg-red-500 hover:bg-red-600'>
										<Link href='/register'>Сабти ном</Link>
									</Button>
								</div>
							</CoolMode>
						)}
					</div>

					{/* Mobile Menu Button */}
					<Button
						variant='ghost'
						className='md:hidden'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className='h-6 w-6' />
						) : (
							<Menu className='h-6 w-6' />
						)}
					</Button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className='md:hidden py-4 border-t'>
						<CoolMode>
							<nav className='flex flex-col space-y-4'>
								<Link
									href='/'
									className='text-gray-700 hover:text-red-500 font-medium'
								>
									АСОСӢ
								</Link>
								<Link
									href='/master'
									className='text-gray-700 hover:text-red-500 font-medium'
								>
									УСТОХО
								</Link>
								<Link
									href='/about'
									className='text-gray-700 hover:text-red-500 font-medium'
								>
									ДАР БОРАИ МО
								</Link>
								{isLoggedIn ? (
									<>
										<Link
											href='/profile'
											className='text-gray-700 hover:text-red-500 font-medium'
										>
											Профил
										</Link>
										<Link
											href='/order'
											className='text-gray-700 hover:text-red-500 font-medium'
										>
											Фармоишҳо
										</Link>
										<button className='text-gray-700 hover:text-red-500 font-medium text-left'>
											Баромад
										</button>
									</>
								) : (
									<div className='flex flex-col space-y-2'>
										<Button variant='outline' asChild>
											<Link href='/login'>Ворид шудан</Link>
										</Button>
										<Button asChild className='bg-red-500 hover:bg-red-600'>
											<Link href='/register'>Сабти ном</Link>
										</Button>
									</div>
								)}
							</nav>
						</CoolMode>
					</div>
				)}
			</div>
		</header>
	)
}
