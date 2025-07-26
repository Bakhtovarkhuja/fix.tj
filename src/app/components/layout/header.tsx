'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Badge,
	Box,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { Heart, MenuIcon, User, LogOut, X } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const router = useRouter()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		alert('Вы вышли из системы')
		router.push('/login')
		handleMenuClose()
		localStorage.removeItem('access_token')
	}

	return (
		<AppBar
			position='sticky'
			sx={{
				backgroundColor: '#FFFFFF99',
				color: '#1f2937',
				boxShadow:
					'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				borderBottom: '1px solid #e5e7eb',
			}}
		>
				<div className='w-[100%]'>
					<Toolbar>
						<div className='flex justify-between w-[1200px] m-auto'>
							<div>
								<Link
									href='/'
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									<Typography
										variant='h5'
										component='h1'
										sx={{ fontWeight: 'bold', color: '#2563eb' }}
									>
										МастерСервис
									</Typography>
								</Link>
							</div>
							<div>
								<Box
									sx={{
										flex: 1,
										display: 'flex',
										alignItems: 'center',
										gap: 2,
									}}
								>
									{!isMobile && (
										<Box sx={{ display: 'flex', gap: 1 }}>
											<Link href='/' style={{ textDecoration: 'none' }}>
												<Button
													sx={{
														color: '#1f2937',
														fontWeight: 500,
														'&:hover': { backgroundColor: '#f3f4f6' },
													}}
												>
													Главная
												</Button>
											</Link>
											<Link href='/products' style={{ textDecoration: 'none' }}>
												<Button
													sx={{
														color: '#1f2937',
														fontWeight: 500,
														'&:hover': { backgroundColor: '#f3f4f6' },
													}}
												>
													Запчасти
												</Button>
											</Link>
											<Link href='/about' style={{ textDecoration: 'none' }}>
												<Button
													sx={{
														color: '#1f2937',
														fontWeight: 500,
														'&:hover': { backgroundColor: '#f3f4f6' },
													}}
												>
													О нас
												</Button>
											</Link>
										</Box>
									)}
								</Box>
							</div>
							<div>
								<Link href='/wishlist'>
									<IconButton
										sx={{
											color: '#1f2937',
											'&:hover': { backgroundColor: '#f3f4f6' },
										}}
									>
										<Badge badgeContent={3} color='error'>
											<Heart size={20} />
										</Badge>
									</IconButton>
								</Link>

								{/* Burger Menu */}
								<IconButton
									onClick={handleMenuOpen}
									sx={{
										color: '#1f2937',
										'&:hover': { backgroundColor: '#f3f4f6' },
										backgroundColor: Boolean(anchorEl)
											? '#f3f4f6'
											: 'transparent',
									}}
								>
									{Boolean(anchorEl) ? <X size={20} /> : <MenuIcon size={20} />}
								</IconButton>
							</div>
						</div>
					</Toolbar>
					{/* Mobile Navigation */}
					{isMobile && (
						<Toolbar
							sx={{
								justifyContent: 'center',
								gap: 3,
								pb: 2,
								borderTop: '1px solid #e5e7eb',
							}}
						>
							<Link href='/' style={{ textDecoration: 'none' }}>
								<Button
									sx={{
										color: '#1f2937',
										fontWeight: 500,
										'&:hover': { backgroundColor: '#f3f4f6' },
									}}
								>
									Главная
								</Button>
							</Link>
							<Link href='/products' style={{ textDecoration: 'none' }}>
								<Button
									sx={{
										color: '#1f2937',
										fontWeight: 500,
										'&:hover': { backgroundColor: '#f3f4f6' },
									}}
								>
									Запчасти
								</Button>
							</Link>
							<Link href='/about' style={{ textDecoration: 'none' }}>
								<Button
									sx={{
										color: '#1f2937',
										fontWeight: 500,
										'&:hover': { backgroundColor: '#f3f4f6' },
									}}
								>
									О нас
								</Button>
							</Link>
						</Toolbar>
					)}
					{/* Dropdown Menu */}
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						PaperProps={{
							sx: {
								mt: 1,
								minWidth: 200,
								boxShadow:
									'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
								border: '1px solid #e5e7eb',
								borderRadius: 2,
							},
						}}
					>
						<Link
							href='/profile'
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<MenuItem
								onClick={handleMenuClose}
								sx={{
									gap: 2,
									color: '#1f2937',
									'&:hover': { backgroundColor: '#f3f4f6' },
								}}
							>
								<User size={16} />
								Мой профиль
							</MenuItem>
						</Link>
						<MenuItem
							onClick={handleLogout}
							sx={{
								gap: 2,
								color: '#ef4444',
								borderTop: '1px solid #e5e7eb',
								mt: 1,
								pt: 2,
								'&:hover': { backgroundColor: '#fef2f2' },
							}}
						>
							<LogOut size={16} />
							Выход
						</MenuItem>
					</Menu>
				</div>
		</AppBar>
	)
}
