'use client'

import type React from 'react'

import { useEffect, useState } from 'react'
import {
	Container,
	Typography,
	Box,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Card,
	CardContent,
	Grid,
	Chip,
	IconButton,
	Slider,
	InputAdornment,
	Avatar,
} from '@mui/material'
import { Search, Filter, Star, MapPin, Heart } from 'lucide-react'
import Link from 'next/link'
import Main from '../components/container/main'
import useZapros from '../store/zapros'
import Image from 'next/image'
import avatar from '@/app/assets/avatar.png'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { LocationOn } from '@mui/icons-material'

const categories = [
	'Ремонт холодильников',
	'Автоэлектрик',
	'Сантехник',
	'Электрик',
	'Ремонт стиральных машин',
	'Ремонт телевизоров',
]

const locations = [
	,
	'Москва',
	'Санкт-Петербург',
	'Екатеринбург',
	'Новосибирск',
	'Казань',
]

export default function Home() {
	const {
		users,
		getUsers,
		changeWishStatus,
		filterByExperiense,
		filterByCountry,
		filterByJob,
		filterByName,
	} = useZapros()
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [selectedLocation, setSelectedLocation] = useState('')
	const [experienceRange, setExperienceRange] = useState([0])

	const addToWish = (el) => {
		const user = {
			...el,
			wish: !el.wish,
		}

		changeWishStatus(el.id, user)
	}

	const handleSeeAll = () => {
		setSearchTerm('')
		setSelectedCategory('')
		setSelectedLocation('')
		setExperienceRange([0])
		getUsers()
	}

	const handleFilter = () => {
		filterByExperiense(experienceRange)
		filterByCountry(selectedLocation)
		filterByJob(selectedCategory)
		filterByName(searchTerm)
	}

	useEffect(() => {
		getUsers()
	}, [])

	return (
		<Main>
			<Container maxWidth='xl'>
				<Box sx={{ textAlign: 'center', mb: 6 }}>
					<Typography
						variant='h3'
						component='h1'
						sx={{ fontWeight: 'bold', color: '#1f2937', mb: 2 }}
					>
						Найдите лучших мастеров
					</Typography>
					<Typography
						variant='h6'
						sx={{ color: '#6b7280', maxWidth: '800px', mx: 'auto' }}
					>
						Профессиональные мастера для ремонта техники и решения бытовых
						проблем
					</Typography>
				</Box>

				<Card sx={{ mb: 4, borderRadius: 3, border: '1px solid #e5e7eb' }}>
					<CardContent sx={{ p: 3 }}>
						<div className='flex gap-[25px] items-start'>
							<div className='w-[20%]'>
								<TextField
									fullWidth
									placeholder='Поиск мастеров...'
									value={searchTerm}
									onChange={e => setSearchTerm(e.target.value)}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<Search size={20} color='#6b7280' />
											</InputAdornment>
										),
									}}
								/>
							</div>
							<div className='w-[20%]'>
								<FormControl fullWidth>
									<InputLabel>Категория</InputLabel>
									<Select
										value={selectedCategory}
										onChange={e => setSelectedCategory(e.target.value)}
										label='Категория'
									>
										{categories.map(category => (
											<MenuItem key={category} value={category}>
												{category}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
							<div className='w-[20%]'>
								<FormControl fullWidth>
									<InputLabel>Город</InputLabel>
									<Select
										value={selectedLocation}
										onChange={e => setSelectedLocation(e.target.value)}
										label='Город'
									>
										{locations.map(location => (
											<MenuItem key={location} value={location}>
												{location}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
							<div className='w-[20%]'>
								<Box>
									<Typography
										variant='body2'
										sx={{ color: '#1f2937', mb: 1, fontWeight: 500 }}
									>
										Опыт: от {experienceRange[0]} лет
									</Typography>
									<Slider
										value={experienceRange}
										onChange={(_, newValue) =>
											setExperienceRange(newValue as number[])
										}
										max={20}
										min={0}
										step={1}
										color='primary'
									/>
								</Box>
							</div>
							<div className='w-[20%]'>
								<Button
									fullWidth
									variant='contained'
									onClick={handleFilter}
									startIcon={<Filter size={16} />}
									sx={{ py: 1.5 }}
								>
									Применить
								</Button>
							</div>
							<div className='w-[15%]'>
								<Button
									fullWidth
									variant='contained'
									onClick={() => handleSeeAll()}
									startIcon={<Filter size={16} />}
									sx={{ py: 1.5 }}
								>
									See All
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
					{users
						.filter(user => user.role === 'master')
						.map(el => (
							<div
								key={el.id}
								className='w-full p-2 transition-transform transform hover:-translate-y-1'
							>
								<Card
									sx={{
										borderRadius: '20px',
										overflow: 'hidden',
										position: 'relative',
										backgroundColor: '#fefcfb', 
										border: '1px solid #e7ddd2',
										boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
										transition: 'all 0.3s ease-in-out',
										'&:hover': {
											boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
											transform: 'translateY(-4px)',
										},
									}}
								>
									<div
										className='absolute top-3 right-3 z-10 cursor-pointer'
										onClick={() => addToWish(el)}
									>
										{el.wish ? (
											<StarIcon className='text-yellow-400 w-6 h-6 drop-shadow-md' />
										) : (
											<StarBorderIcon className='text-gray-300 w-6 h-6 hover:text-yellow-400 transition-colors duration-300' />
										)}
									</div>

									<CardContent className='pb-2'>
										<Box className='flex items-center gap-4'>
                      <Link href={`/${el.id}`}>
											<Image
												src={el.avatar || avatar}
												alt={el.name}
												width={60}
												height={60}
												className='rounded-full bg-gray-100 border border-gray-300'
											/>
                      </Link>
											<Box>
												<Typography
													variant='h6'
													sx={{
														fontWeight: 700,
														color: '#5b3924',
														fontSize: '1rem',
													}}
												>
													{el.name}
												</Typography>
												<Typography
													variant='body2'
													sx={{ color: '#8b5e3c', fontWeight: 500 }}
												>
													{el.job}
												</Typography>
											</Box>
										</Box>
									</CardContent>

									<Box className='px-6 py-2 border-t border-b border-[#f1ebe6] bg-[#fcf9f6]'>
										<Box className='flex items-center justify-between text-sm text-gray-600'>
											<Box className='flex items-center gap-1'>
												<Star/>
												<span className='font-medium'>{el.rating}</span>
												<span className='text-gray-400'>({el.review.length})</span>
											</Box>
											<Box className='flex items-center gap-1'>
												<LocationOn sx={{ fontSize: 16, color: '#9ca3af' }} />
												<span>{el.country}</span>
											</Box>
										</Box>
									</Box>

									<CardContent className='pt-2 text-sm text-gray-700'>
										<Box className='flex justify-between items-center mb-2'>
											<span className='text-gray-500'>Опыт:</span>
											<span className='font-medium'>{el.experience} лет</span>
										</Box>

										<Box className='flex justify-between items-center'>
											<span className='text-gray-500'>Стоимость:</span>
											<span className='font-bold text-green-600'>
												от {el.price} сомони
											</span>
										</Box>
									</CardContent>

									<Box className='px-4 pb-4 pt-1'>
										<Chip
											label={el.status ? 'Доступен' : 'Занят'}
											size='small'
											sx={{
												backgroundColor: el.status ? '#16a34a' : '#f59e0b',
												color: 'white',
												fontWeight: 500,
												fontSize: '0.75rem',
											}}
										/>
									</Box>
								</Card>
							</div>
						))}
				</div>

				{users?.length === 0 && (
					<Box sx={{ textAlign: 'center', py: 8 }}>
						<Typography variant='h5' sx={{ color: '#6b7280', mb: 1 }}>
							Мастера не найдены
						</Typography>
						<Typography variant='body1' sx={{ color: '#1f2937' }}>
							Попробуйте изменить параметры поиска
						</Typography>
					</Box>
				)}
			</Container>
		</Main>
	)
}
