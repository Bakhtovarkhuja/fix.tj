'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Search, Star, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import avatar from '@/app/assets/avatar.png'
import baner from '@/app/assets/baner.jpg'
import Image from 'next/image'
import useZapros from '@/app/store/zapros'

export default function HomePage() {
  const {
		users,
		getUsers,
		filterByExperiense,
		filterByCountry,
		filterByJob,
		filterByName,
	} = useZapros()
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedProfession, setSelectedProfession] = useState('all')
	const [selectedStatus, setSelectedStatus] = useState('all')

  const reaiting = reviews => {
		if (!reviews || reviews.length === 0) return 0
		const sum = reviews.reduce((acc, review) => acc + (review.raiting || 0), 0)
		return (sum / reviews.length).toFixed(1)
	}

  useEffect(() => {
    getUsers()
  },[])

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative w-[100%] h-[600px] flex items-center justify-center overflow-hidden'>
				<div className='absolute inset-0 bg-cover bg-center bg-no-repeat'>
					<Image
						src={baner}
						alt='Banner'
						fill
						className='object-cover object-center absolute inset-0 z-0'
					/>

					<div className='absolute inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50'></div>
				</div>

				<div className='relative z-10 text-center text-white max-w-4xl mx-auto px-4'>
					<h1 className='text-5xl md:text-6xl font-bold mb-6'>
						Устодони Моҳирро дар Тоҷикистон Пайдо Кунед
					</h1>
					<p className='text-xl md:text-2xl mb-8 text-gray-200'>
						Бо мутахассисони ботаҷриба барои ҳамаи ниёзҳои хидматрасониятон
						пайваст шавед
					</p>
					<Button
						size='lg'
						className='bg-red-500 hover:bg-red-600 text-lg px-8 py-3'
					>
						Оғоз кунед
					</Button>
				</div>
			</section>

			{/* Search and Filter Section */}
			<section className='py-12 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='bg-white rounded-lg shadow-lg p-6'>
						<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
							<div className='relative'>
								<Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
								<Input
									placeholder='Ҷустуҷӯи устодон...'
									value={searchTerm}
									onChange={e => setSearchTerm(e.target.value)}
									className='pl-10'
								/>
							</div>

							<Select
								value={selectedProfession}
								onValueChange={setSelectedProfession}
							>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Касбро интихоб кунед' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>Ҳамаи касбҳо</SelectItem>
									<SelectItem value='electrician'>Барқкаш</SelectItem>
									<SelectItem value='plumber'>Лӯлакаш</SelectItem>
									<SelectItem value='carpenter'>Наҷҷор</SelectItem>
									<SelectItem value='mechanic'>Механик</SelectItem>
								</SelectContent>
							</Select>

							<Select value={selectedStatus} onValueChange={setSelectedStatus}>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Дастрасӣ' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>Ҳамаи ҳолатҳо</SelectItem>
									<SelectItem value='available'>Дастрас</SelectItem>
									<SelectItem value='busy'>Банд</SelectItem>
								</SelectContent>
							</Select>

							<Button className='bg-red-500 hover:bg-red-600'>Ҷустуҷӯ</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Masters Grid */}
			<section className='py-12'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-3xl font-bold text-center mb-12'>
						Устодони Дастрас
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{users
            .filter(el => el.role == 'master')
            .filter(el => JSON.stringify(el.name).toLowerCase().trim().includes(searchTerm.toLowerCase().trim()))?.map(master => (
							<Card
								key={master.id}
								className='card-shadow hover:shadow-lg transition-shadow duration-300'
							>
								<CardContent className='p-6'>
									<div className='flex flex-col items-center text-center'>
                    <Image src={master.avatar ? master.avatar : avatar} alt={master.name} width={90} height={90} className='rounded-[50%] bg-gray-200 mb-4'/>

										<h3 className='text-lg font-semibold mb-2'>
											{master.name}
										</h3>
										<p className='text-red-500 font-medium mb-2'>
											{master.job}
										</p>

										<div className='flex items-center space-x-1 mb-2'>
											<Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
											<span className='text-sm font-medium'>
												{reaiting(master.review)}
											</span>
											<span className='text-sm text-gray-500'>
												({master?.review?.length || 0} баҳогузорӣ)
											</span>
										</div>

										<div className='flex items-center space-x-1 mb-2'>
											<Clock className='w-4 h-4 text-gray-400' />
											<span className='text-sm text-gray-600'>
												{master.experience} сол
											</span>
										</div>

										<div className='flex items-center space-x-1 mb-4'>
											<MapPin className='w-4 h-4 text-gray-400' />
											<span className='text-sm text-gray-600'>
												 {master.country}
											</span>
										</div>

										<Badge
											variant={
												master.status  ? 'default' : 'secondary'
											}
											className={
												master.status
													? 'bg-green-500 hover:bg-green-600'
													: ''
											}
										>
											{master.status  ? 'Дастрас' : 'Банд'}
										</Badge>

										<Button
											asChild
											className='w-full mt-4 bg-red-500 hover:bg-red-600'
											disabled={master.status}
										>
											<Link href={`/${master.id}`}>Дидани профил</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
