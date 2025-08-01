'use client'

import useZapros from '@/app/[locale]/components/store/zapros'
import avatar from '@/app/assets/avatar.png'
import decode from '@/app/utils/axios-reguest'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { JwtPayload } from 'jwt-decode'
import { LogOut, Menu, User, X } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface MyJwtPayload extends JwtPayload {
	id?: string
}

export default function Header() {
	const t = useTranslations('header')
	const locale = useLocale()
	const pathname = usePathname()
	const router = useRouter()

	const { me, mee } = useZapros()
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

	const changeLocale = (newLocale: string) => {
		const pathWithoutLocale = pathname.replace(/^\/(ru|en|tj)/, '')
		router.replace(`/${newLocale}${pathWithoutLocale}`)
	}

	return (
		<header className='shadow-sm border-b sticky top-0 z-50 bg-[rgba(255,255,255,0.8)]'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<Link href='/' className='flex items-center space-x-2'>
						<div className='w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center'>
							<span className='text-white font-bold text-xl'>F</span>
						</div>
						<span className='text-2xl font-bold text-red-500'>FIX.TJ</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-8'>
						<Link href='/' className='text-gray-700 hover:text-red-500 font-medium'>
							{t('1')}
						</Link>
						<Link href='/master' className='text-gray-700 hover:text-red-500 font-medium'>
							{t('2')}
						</Link>
						<Link href='/about' className='text-gray-700 hover:text-red-500 font-medium'>
							{t('3')}
						</Link>
					</nav>

					{/* Profile Menu / Auth Buttons */}
					<div className='hidden md:flex items-center space-x-4'>
						{/* Language Select */}
						<select
							value={locale}
							onChange={(e) => changeLocale(e.target.value)}
							className='border rounded-md text-sm px-2 py-1'
						>
							<option value='ru'>🇷🇺 Русский</option>
							<option value='tj'>🇹🇯 Тоҷикӣ</option>
							<option value='en'>🇬🇧 English</option>
						</select>

						{isLoggedIn ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant='ghost' className='relative h-10 w-10 rounded-full'>
										<Image
											src={me?.avatar || avatar}
											alt='avatar'
											fill
											className='rounded-full bg-gray-200 object-cover'
										/>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='w-56' align='end' forceMount>
									<DropdownMenuItem asChild>
										<Link href='/profile' className='flex items-center'>
											<User className='mr-2 h-4 w-4' />
											{t('4')}
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href='/order' className='flex items-center'>
											<User className='mr-2 h-4 w-4' />
											{t('5')}
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleLogout}>
										<LogOut className='mr-2 h-4 w-4' />
										{t('6')}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<div className='flex items-center space-x-2'>
								<Button variant='outline' asChild>
									<Link href='/login'>{t('7')}</Link>
								</Button>
								<Button asChild className='bg-red-500 hover:bg-red-600'>
									<Link href='/register'>{t('8')}</Link>
								</Button>
							</div>
						)}
					</div>

					{/* Mobile Menu Button */}
					<Button variant='ghost' className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
						{isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
					</Button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className='md:hidden py-4 border-t'>
						<nav className='flex flex-col space-y-4'>
							<Link href='/' className='text-gray-700 hover:text-red-500 font-medium'>
								{t('1')}
							</Link>
							<Link href='/master' className='text-gray-700 hover:text-red-500 font-medium'>
								{t('2')}
							</Link>
							<Link href='/about' className='text-gray-700 hover:text-red-500 font-medium'>
								{t('3')}
							</Link>
							<select
								value={locale}
								onChange={(e) => changeLocale(e.target.value)}
								className='border rounded-md text-sm px-2 py-1 w-fit'
							>
								<option value='ru'>Русский</option>
								<option value='tj'>Тоҷикӣ</option>
								<option value='en'>English</option>
							</select>
							{isLoggedIn ? (
								<>
									<Link href='/profile' className='text-gray-700 hover:text-red-500 font-medium'>
										{t('4')}
									</Link>
									<Link href='/order' className='text-gray-700 hover:text-red-500 font-medium'>
										{t('5')}
									</Link>
									<button
										onClick={handleLogout}
										className='text-gray-700 hover:text-red-500 font-medium text-left'
									>
										{t('6')}
									</button>
								</>
							) : (
								<div className='flex flex-col space-y-2'>
									<Button variant='outline' asChild>
										<Link href='/login'>{t('7')}</Link>
									</Button>
									<Button asChild className='bg-red-500 hover:bg-red-600'>
										<Link href='/register'>{t('8')}</Link>
									</Button>
								</div>
							)}
						</nav>
					</div>
				)}
			</div>
		</header>
	)
}
