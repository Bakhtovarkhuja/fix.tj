'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
	Container,
	Typography,
	Box,
	Card,
	CardContent,
	Button,
	Chip,
} from '@mui/material'
import {
	LocationOn,
	Schedule,
	ShoppingCart,
	ArrowBack,
	CalendarToday,
} from '@mui/icons-material'
import Link from 'next/link'
import Image from 'next/image'
import Main from '@/app/components/container/main'
import useZapros from '@/app/store/zapros'
import { Star, StarOff } from 'lucide-react'
import Rating from 'react-rating'
import avatar from '@/app/assets/avatar.png'

function StarRating({
	value,
	onChange,
	readOnly = false,
	maxStars = 5,
	starSize = 24,
	activeColor = '#facc15',
	inactiveColor = '#e5e7eb',
}: {
	value: number
	onChange?: (value: number) => void
	readOnly?: boolean
	maxStars?: number
	starSize?: number
	activeColor?: string
	inactiveColor?: string
}) {
	return (
		<Rating
			readonly={readOnly}
			initialRating={value}
			onChange={onChange}
			emptySymbol={
				<StarOff
					style={{ width: starSize, height: starSize, color: inactiveColor }}
				/>
			}
			fullSymbol={
				<Star
					style={{ width: starSize, height: starSize, color: activeColor }}
				/>
			}
			stop={maxStars}
		/>
	)
}

export default function MasterProfile() {
	const { masterById, getMasterById } = useZapros()
	const params = useParams()

	const [isOrdering, setIsOrdering] = useState(false)
	const [newReview, setNewReview] = useState('')
	const [rating, setRating] = useState(0)
	const [reviews, setReviews] = useState<
		{
			id: number
			desc: string
			rating: number
			name: string
			avatar: string
		}[]
	>([])

	useEffect(() => {
		getMasterById(params['master-by-id'])
	}, [params, getMasterById])

	useEffect(() => {
		if (masterById?.review?.length) {
			setReviews(
				masterById.review.map((r: any) => ({
					id: r.id,
					desc: r.desc,
					rating: r.raiting || 0,
					name: r.name,
					avatar: r.avatar || '/default-avatar.png',
				}))
			)
		} else {
			setReviews([])
		}
	}, [masterById])

	if (!masterById) {
		return (
			<Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
				<Container maxWidth='lg' sx={{ py: 8, textAlign: 'center' }}>
					<Typography
						variant='h4'
						sx={{ fontWeight: 'bold', color: '#1f2937', mb: 2 }}
					>
						Мастер не найден
					</Typography>
					<Link href='/' style={{ textDecoration: 'none' }}>
						<Button variant='contained'>Вернуться к поиску</Button>
					</Link>
				</Container>
			</Box>
		)
	}

	const handleSubmit = () => {
		if (!newReview.trim() || rating === 0) return

		const reviewObj = {
			id: Date.now(),
			desc: newReview,
			rating,
			name: 'Вы',
			avatar: '/default-avatar.png',
		}

		setReviews(prev => [reviewObj, ...prev])
		setNewReview('')
		setRating(0)
	}

	return (
		<Main>
			<Box>
				<Container maxWidth='xl' sx={{ py: 4 }}>
					{/* Назад */}
					<Box sx={{ mb: 3 }}>
						<Link href='/' style={{ textDecoration: 'none' }}>
							<Button
								startIcon={<ArrowBack />}
								sx={{
									color: '#6b7280',
									'&:hover': { backgroundColor: '#f3f4f6', color: '#1f2937' },
								}}
							>
								Назад к поиску
							</Button>
						</Link>
					</Box>

					<Card
						sx={{
							borderRadius: 3,
							border: '1px solid #e5e7eb',
							position: 'relative',
							mb: 5,
						}}
					>
						<CardContent sx={{ p: 4 }}>
							<Box className='flex gap-[25px] items-start'>
								<Image
									src={masterById.avatar || avatar}
									alt={masterById.name}
									width={200}
									height={200}
									className='mb-[5px] m-auto rounded-[50%]'
								/>
								<Button
									fullWidth
									variant='contained'
									size='large'
									disabled={isOrdering}
									sx={{
										py: 2,
										mb: 2,
										fontSize: '14px',
										fontWeight: 600,
										position: 'absolute',
										top: '10px',
										right: '10px',
										width: '200px',
									}}
								>
									{isOrdering ? 'Оформление...' : 'Заказать мастера'}
								</Button>

								<Box sx={{ width: '100%' }}>
									<Typography
										variant='h4'
										sx={{ fontWeight: 'bold', color: '#1f2937' }}
									>
										{masterById.surname + ' ' + masterById.name}
									</Typography>
									<Typography
										variant='h5'
										sx={{ color: '#6b7280', fontWeight: 500 }}
									>
										{masterById.job}
									</Typography>

									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 2,
											mt: 1,
										}}
									>
										<StarRating
											value={masterById.raiting || 0}
											readOnly
											starSize={20}
											inactiveColor='#ddd'
											activeColor='#facc15'
										/>
										<Typography variant='h6' sx={{ fontWeight: 600, ml: 1 }}>
											{masterById.raiting}
										</Typography>
										<Typography variant='body1' sx={{ color: '#6b7280' }}>
											({masterById.review?.length || 0} отзывов)
										</Typography>
										<Chip
											label={masterById?.status ? 'Доступен' : 'Занят'}
											sx={{
												backgroundColor: masterById?.status
													? '#10b981'
													: '#facc15',
												color: 'white',
												fontWeight: 500,
												fontSize: '0.875rem',
												px: 2,
												ml: 2,
											}}
										/>
									</Box>

									{/* Информация */}
									<Box className='flex gap-[25px] mt-2 flex-wrap'>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<LocationOn sx={{ color: '#6b7280', fontSize: 16 }} />
											<Typography>{masterById.country}</Typography>
										</Box>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<Schedule sx={{ color: '#6b7280', fontSize: 16 }} />
											<Typography>Опыт: {masterById.experience} лет</Typography>
										</Box>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<ShoppingCart sx={{ color: '#6b7280', fontSize: 16 }} />
											<Typography>
												Выполнено: {masterById.completedOrders} заказов
											</Typography>
										</Box>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<CalendarToday sx={{ color: '#6b7280', fontSize: 16 }} />
											<Typography>Пн-Вс: 9:00-21:00</Typography>
										</Box>
									</Box>

									{/* Цена */}
									<Box className='flex items-end gap-[15px] mt-4'>
										<Typography
											variant='h5'
											sx={{ fontWeight: 'bold', color: '#10b981' }}
										>
											От
										</Typography>
										<Typography
											variant='h4'
											sx={{ fontWeight: 'bold', color: '#10b981' }}
										>
											{masterById.price}
										</Typography>
										<Typography
											variant='h5'
											sx={{ fontWeight: 'bold', color: '#10b981' }}
										>
											сомони
										</Typography>
									</Box>
								</Box>
							</Box>
						</CardContent>
					</Card>

					<Box
						sx={{
							border: '1px solid #e5e7eb',
							borderRadius: 3,
							p: 3,
							backgroundColor: '#fff',
							boxShadow: 3,
							maxWidth: '100%',
							margin: '0 auto',
						}}
					>
						<Typography variant='h5' sx={{ fontWeight: 'bold', mb: 3 }}>
							Отзывы клиентов
						</Typography>

						<Box sx={{ maxHeight: '50vh', overflowY: 'scroll', pr: 1, width: '100%'  }}>
							{reviews.length === 0 ? (
								<Typography sx={{ color: '#6b7280', fontStyle: 'italic' }}>
									Отзывов пока нет
								</Typography>
							) : (
								reviews.map(review => (
									<Card
										key={review.id}
										sx={{
											mb: 3,
											p: 2,
											borderRadius: 2,
											border: '1px solid #e5e7eb',
											backgroundColor: '#f9fafb',
										}}
									>
										<Box sx={{ display: 'flex', gap: 2 }}>
											<Image
												src={review.avatar ? review.avatar : avatar}
												alt={review.name}
												width={50}
												height={50}
												style={{ borderRadius: '50%' }}
											/>
											<Box sx={{ flex: 1 }}>
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'space-between',
													}}
												>
													<Typography
														variant='subtitle1'
														sx={{ fontWeight: 700 }}
													>
														{review.name}
													</Typography>
													<StarRating
														value={review.rating}
														maxStars={5}
														starSize={22}
														inactiveColor='#e5e7eb'
														activeColor='#facc15'
														readOnly
													/>
												</Box>
												<Typography sx={{ mt: 1, color: '#374151' }}>
													{review.desc}
												</Typography>
											</Box>
										</Box>
									</Card>
								))
							)}
						</Box>

						<Box sx={{ borderTop: '1px solid #e5e7eb', pt: 3 }}>
							<Typography variant='h6' sx={{ fontWeight: 600, mb: 1 }}>
								Оставьте отзыв
							</Typography>

							<Box
								sx={{ display: 'flex', alignItems: 'center', gap: 2}}
							>
								<Typography>Ваша оценка:</Typography>
								<StarRating
									value={rating}
									maxStars={5}
									starSize={28}
									inactiveColor='#e5e7eb'
									activeColor='#facc15'
									onChange={(value: number) => setRating(value)}
								/>
							</Box>
							<div className='flex gap-[15px] items-end'>
								<textarea
									value={newReview}
									onChange={e => setNewReview(e.target.value)}
									rows={4}
									placeholder='Напишите ваш отзыв...'
									style={{
										width: '84%',
										padding: 14,
										borderRadius: 10,
										border: '1px solid #d1d5db',
										fontSize: 16,
										resize: 'vertical',
										fontFamily: 'inherit',
										backgroundColor: '#f9fafb',
										color: '#111827',
										maxHeight: '60px',
									}}
								/>

								<Button
									variant='contained'
									onClick={handleSubmit}
									disabled={rating === 0 || newReview.trim() === ''}
									sx={{ mt: 3, textTransform: 'none', fontWeight: 600 }}
								>
									Отправить отзыв
								</Button>
							</div>
						</Box>
					</Box>
				</Container>
			</Box>
		</Main>
	)
}
