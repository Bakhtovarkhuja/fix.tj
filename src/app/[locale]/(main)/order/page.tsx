'use client'

import useZapros from '@/app/[locale]/components/store/zapros'
import avatar from '@/app/assets/avatar.png'
import decode from '@/app/utils/axios-reguest'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Clock, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Comment = {
	id: number
	content: string
	author: string
	date: string
}

type Order = {
	id: number
	avatar?: string | null
	name: string
	job: string
	order: boolean
	status: boolean
	price: number
	comment?: Comment[]
}

export default function OrdersPage() {
	const t = useTranslations('order')
	const { users, getUsers, sendReview, orderMaster, removeComment } =
		useZapros()
	const [reviewData, setReviewData] = useState({
		rating: 0,
		comment: '',
	})
	const [isOpen, setIsOpen] = useState(false)

	const handleSubmitReview = (el: Order) => {
		const user = decode.decode as {
			id?: string
			avatar?: string
			name?: string
		}

		const newReview = {
			id: Number(user.id) || 0,
			avatar: user.avatar ?? '',
			author: user.name ?? '',
			content: reviewData.comment,
			rating: reviewData.rating,
			date: new Date().toISOString(),
		}

		const updatedOrder: Partial<Order> = {
			...el,
			order: false,
			status: true,
		}

		const userId = el.id
		const commentId = el.comment?.[0]?.id // обратите внимание, теперь .id, а не .commentId

		sendReview(el.id, newReview)
		orderMaster(el.id, updatedOrder)

		setReviewData({ rating: 0, comment: '' })
		setIsOpen(false)

		if (commentId !== undefined) {
			removeComment(userId, commentId)
		}
	}

	useEffect(() => {
		getUsers()
	}, [getUsers])

	return (
		<div className='min-h-screen bg-gray-50 py-8'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h1 className='text-3xl font-bold mb-8'>{t('1')}</h1>

				<div className='space-y-6'>
					{users
						.filter(el => el.order == true)
						.map(order => (
							<Card key={order.id}>
								<CardContent className='p-6'>
									<div className='flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0'>
										<div className='flex items-center space-x-4'>
											<Image
												src={order.avatar || avatar}
												alt='logo'
												width={70}
												height={70}
												className='rounded-[50%] bg-gray-200'
											/>

											<div>
												<h3 className='text-lg font-semibold'>{order.name}</h3>
												<p className='text-red-500 font-medium'>{order.job}</p>

												<div className='flex items-center space-x-4 mt-2 text-sm text-gray-500'>
													<div className='flex items-center space-x-1'>
														<Calendar className='w-4 h-4' />
														<span>2024-01-20</span>
													</div>
													<div className='flex items-center space-x-1'>
														<Clock className='w-4 h-4' />
														<span>14:00</span>
													</div>
												</div>
											</div>
										</div>

										<div className='flex flex-col items-end space-y-2'>
											<Badge
												variant={order.status ? 'default' : 'secondary'}
												className={
													order.status ? 'bg-green-500 hover:bg-green-600' : ''
												}
											>
												{order.status ? 'Анҷом ёфта' : 'Дар ҷараён'}
											</Badge>
											<p className='text-lg font-semibold'>
												{order.price + ' сомони'}
											</p>

											<Dialog open={isOpen} onOpenChange={setIsOpen}>
												<DialogTrigger asChild>
													<Button className={'bg-red-500 hover:bg-red-600'}>
														{t('2')}
													</Button>
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>
															{t('3')} {order.name}
														</DialogTitle>
													</DialogHeader>
													<div className='space-y-4'>
														<div>
															<label className='block text-sm font-medium mb-2'>
																{t('4')}
															</label>
															<div className='flex items-center space-x-1'>
																{[...Array(5)].map((_, i) => (
																	<button
																		key={i}
																		type='button'
																		onClick={() =>
																			setReviewData(prev => ({
																				...prev,
																				rating: i + 1,
																			}))
																		}
																		className='focus:outline-none'
																	>
																		<Star
																			className={`w-6 h-6 ${
																				i < reviewData.rating
																					? 'fill-yellow-400 text-yellow-400'
																					: 'text-gray-300 hover:text-yellow-400'
																			}`}
																		/>
																	</button>
																))}
															</div>
														</div>

														<div>
															<label className='block text-sm font-medium mb-2'>
																{t('5')}
															</label>
															<Textarea
																value={reviewData.comment}
																onChange={e =>
																	setReviewData(prev => ({
																		...prev,
																		comment: e.target.value,
																	}))
																}
																placeholder='Таҷрибаи худро мубодила кунед...'
																rows={4}
															/>
														</div>

														<Button
															className='w-full bg-red-500 hover:bg-red-600'
															onClick={() => handleSubmitReview(order)}
														>
															{t('6')}
														</Button>
													</div>
												</DialogContent>
											</Dialog>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
				</div>
			</div>
		</div>
	)
}
