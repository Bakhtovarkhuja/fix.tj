'use client'

import type React from 'react'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Star, MapPin, Clock, Phone, Mail, MessageCircle } from 'lucide-react'
import useZapros from '@/app/store/zapros'
import avatar from '@/app/assets/avatar.png'
import Image from 'next/image'



export default function MasterProfilePage({
	params,
}: {
	params: { 'master-by-id': string }
}) {
	const { getMasterById, masterById } = useZapros()
	const [newReview, setNewReview] = useState('')
	const [newRating, setNewRating] = useState(5)

	const handleSubmitReview = (e: React.FormEvent) => {
		e.preventDefault()
		console.log('New review:', { rating: newRating, comment: newReview })
		setNewReview('')
		setNewRating(5)
	}

	useEffect(() => {
		getMasterById(params['master-by-id'])
	}, [])

	return (
		<div className='min-h-screen bg-gray-50 py-8'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Master Profile Card */}
				<Card className='mb-8'>
					<CardContent className='p-8'>
						<div className='flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8'>
							<Image
								src={masterById.avatar || avatar}
								alt='logo'
								width={130}
								height={130}
								className='rounded-[50%] bg-gray-200'
							/>

							<div className='flex-1 text-center md:text-left'>
								<h1 className='text-3xl font-bold mb-2'>
									{masterById.surname + ' ' + masterById.name}
								</h1>
								<p className='text-xl text-red-500 font-medium mb-4'>
									{masterById.job}
								</p>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
									<div className='flex items-center justify-center md:justify-start space-x-2'>
										<Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
										<span className='font-medium'>{masterById.raiting}</span>
										<span className='text-gray-500'>
											({masterById?.review?.length} reviews)
										</span>
									</div>

									<div className='flex items-center justify-center md:justify-start space-x-2'>
										<Clock className='w-5 h-5 text-gray-400' />
										<span className='text-gray-600'>
											{masterById.experience + ' сол'}
										</span>
									</div>

									<div className='flex items-center justify-center md:justify-start space-x-2'>
										<MapPin className='w-5 h-5 text-gray-400' />
										<span className='text-gray-600'>{masterById.country}</span>
									</div>

									<Badge
										variant={masterById.status ? 'default' : 'secondary'}
										className={`w-fit mx-auto md:mx-0 ${
											masterById.status ? 'bg-green-500 hover:bg-green-600' : ''
										}`}
									>
										{masterById.status ? 'Available' : 'Busy'}
									</Badge>
								</div>

								<p className='text-gray-600 mb-6'>{masterById.desc}</p>

								<div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4'>
									<div className='flex items-center space-x-2'>
										<Phone className='w-4 h-4 text-red-500' />
										<span className='text-gray-600'>{masterById.number}</span>
									</div>
									<div className='flex items-center space-x-2'>
										<Mail className='w-4 h-4 text-red-500' />
										<span className='text-gray-600'>{masterById.email}</span>
									</div>
								</div>
							</div>
						</div>

						<div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-8'>
							<Button className='bg-red-500 hover:bg-red-600 flex-1'>
								<MessageCircle className='w-4 h-4 mr-2' />
								Бо устод тамос гиред
							</Button>
							<Button variant='outline' className='flex-1 bg-transparent'>
								Хидматро захира кунед
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Reviews Section */}
				<Card>
					<CardHeader>
						<CardTitle>Баҳогузориҳо ({masterById?.review?.length})</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-6 overflow-y-scroll max-h-[50vh]'>
							{masterById?.review?.map(review => (
								<div
									key={review.id}
									className='border-b border-gray-200 pb-4 last:border-b-0'
								>
									<div className='flex items-center space-x-2 mb-2'>
										<Image
											src={review.avatar || avatar}
											alt='logo'
											width={40}
											height={40}
											className='rounded-[50%] bg-gray-200'
										/>
										<div className='flex flex-col gap-[5px]'>
											<p className='font-medium'>{review.name}</p>
											<div className='flex gap-[10px]'>
												<div className='flex items-center'>
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`w-4 h-4 ${
																i < review.raiting
																	? 'fill-yellow-400 text-yellow-400'
																	: 'text-gray-300'
															}`}
														/>
													))}
												</div>
												<p className='text-gray-500 text-sm'>{review.date}</p>
											</div>
										</div>
									</div>
									<div className='flex gap-[5px] h-[100%]'>
										<div className='bg-gray-600 rounded-4xl w-[2px] h-[100%]'></div>
										<p className='text-gray-600'>{review.desc}</p>
									</div>
								</div>
							))}
						</div>

						{/* Add Review Form */}
						<div className='mt-8 pt-6 border-t border-gray-200'>
							<h3 className='text-lg font-semibold mb-4'>Баҳо гузоред</h3>
							<form onSubmit={handleSubmitReview} className='space-y-4'>
								<div>
									<label className='block text-sm font-medium mb-2'>Баҳо</label>
									<div className='flex items-center space-x-1'>
										{[...Array(5)].map((_, i) => (
											<button
												key={i}
												type='button'
												onClick={() => setNewRating(i + 1)}
												className='focus:outline-none'
											>
												<Star
													className={`w-6 h-6 ${
														i < newRating
															? 'fill-yellow-400 text-yellow-400'
															: 'text-gray-300 hover:text-yellow-400'
													}`}
												/>
											</button>
										))}
									</div>
								</div>

								<div>
									<label className='block text-sm font-medium mb-2'>Шарҳ</label>
									<Textarea
										value={newReview}
										onChange={e => setNewReview(e.target.value)}
										placeholder='Таҷрибаи худро мубодила кунед...'
										rows={4}
										required
									/>
								</div>

								<Button type='submit' className='bg-red-500 hover:bg-red-600'>
									Пешниҳоди баҳо
								</Button>
							</form>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
