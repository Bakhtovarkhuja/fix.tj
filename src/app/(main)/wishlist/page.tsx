'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import {
	Container,
	Typography,
	Box,
	Grid,
	Card,
	CardContent,
	Avatar,
	IconButton,
	Chip,
	Button,
} from '@mui/material'
import { Favorite, Star, LocationOn } from '@mui/icons-material'
import Link from 'next/link'
import Main from '@/app/components/container/main'
import useZapros from '@/app/store/zapros'
import avatar from "@/app/assets/avatar.png"
import Image from 'next/image'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'

export default function FavoritesPage() {
	const { users, getUsers } = useZapros()

	useEffect(() => {
		getUsers()
	},[])

	return (
		<Box sx={{ minHeight: '80vh'}}>
			<Main>
				<div className='flex w-[100%] justify-center items-center flex-col'>
					<Typography
						variant='h3'
						component='h1'
						sx={{ fontWeight: 'bold', color: '#1f2937', mb: 1 }}
					>
						Избранные мастера
					</Typography>
					<Typography variant='h6' sx={{ color: '#6b7280' }}>
						Ваши любимые мастера в одном месте
					</Typography>
				</div>

				{users.filter(el => el.wish == true).length === 0 ? (
					<Card>
						<CardContent sx={{ textAlign: 'center', mt: 10 }}>
							<Favorite sx={{ fontSize: 80, color: '#e5e7eb', mb: 2 }} />
							<Typography
								variant='h4'
								sx={{ fontWeight: 600, color: '#6b7280', mb: 1 }}
							>
								Нет избранных мастеров
							</Typography>
							<Typography variant='h6' sx={{ color: '#1f2937', mb: 3 }}>
								Добавьте мастеров в избранное, чтобы быстро их находить
							</Typography>
							<Link href='/' style={{ textDecoration: 'none' }}>
								<Button
									variant='contained'
									size='large'
									sx={{ px: 4, py: 1.5 }}
								>
									Найти мастеров
								</Button>
							</Link>
						</CardContent>
					</Card>
				) : (
						<div className='flex flex-wrap gap-[35px] mt-[20px] w-[1200px]'>
							{users.filter(el => el.wish == true).map(el => (
								<div key={el.id} className='w-[calc(33.333%-24px)] min-w-[250px]'>

								<Link
									href={`/${el.id}`}
									style={{ textDecoration: 'none' }}
								>
									<Card
										sx={{
											height: '100%',
											cursor: 'pointer',
											transition: 'all 0.3s ease',
											position: 'relative',
											borderRadius: 3,
											width: "100%",
											border: '1px solid #e5e7eb',
											'&:hover': {
												transform: 'translateY(-4px)',
												boxShadow:
													'0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
											},
										}}
									>
										<div className='absolute top-2 right-3'>

										{el.wish ? (
										<StarIcon className='text-[#eab308] text-3xl drop-shadow-md w-[25px] h-[25px]' />
									) : (
										<StarBorderIcon className='text-[#d8b4fe] text-2xl group-hover:text-[#eab308] transition-colors duration-300' />
									)}
										</div>

										<CardContent sx={{ textAlign: 'center', p: 3 }}>
											<Box sx={{ position: 'relative', mb: 2 }}>
												<Image
													src={el.avatar || avatar}
													alt={el.name}
													width={80}
													height={80}
													className='bg-[#f3f4f6] m-auto rounded-[50%]'
												/>
												
												<Chip
													label={
														el.status  ? 'Доступен' : 'Занят'
													}
													size='small'
													sx={{
														position: 'absolute',
														bottom: -8,
														left: '50%',
														transform: 'translateX(-50%)',
														backgroundColor:
															el.status 
																? '#10b981'
																: '#facc15',
														color: 'white',
														fontWeight: 500,
													}}
												/>
											</Box>

											<Typography
												variant='h6'
												sx={{ fontWeight: 600, color: '#1f2937', mb: 1 }}
											>
												{el.name}
											</Typography>
											<Typography
												variant='body2'
												sx={{ color: '#6b7280', fontWeight: 500, mb: 2 }}
											>
												{el.job}
											</Typography>

											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													gap: 0.5,
													mb: 1,
												}}
											>
												<Star sx={{ fontSize: 16, color: '#facc15' }} />
												<Typography
													variant='body2'
													sx={{ fontWeight: 600, color: '#1f2937' }}
												>
													{el.rating}
												</Typography>
												<Typography variant='body2' sx={{ color: '#6b7280' }}>
													({el.review.length})
												</Typography>
											</Box>

											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													gap: 0.5,
													mb: 1,
												}}
											>
												<LocationOn sx={{ fontSize: 14, color: '#6b7280' }} />
												<Typography variant='body2' sx={{ color: '#6b7280' }}>
													{el.country}
												</Typography>
											</Box>

											<Typography
												variant='body2'
												sx={{ color: '#6b7280', mb: 2 }}
											>
												Опыт: {el.experience} лет
											</Typography>

											<Typography
												variant='h6'
												sx={{ fontWeight: 'bold', color: '#10b981' }}
											>
												От{el.price}
											</Typography>
										</CardContent>
									</Card>
								</Link>
								</div>
							))}
						</div>
				)}
			</Main>
		</Box>
	)
}
