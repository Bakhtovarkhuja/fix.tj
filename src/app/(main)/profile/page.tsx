'use client'

import avatar from '@/app/assets/avatar.png'
import useZapros from '@/app/store/zapros'
import decode from '@/app/utils/axios-reguest'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, Camera, Clock } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Comment = {
	commentId: number
	avatar?: string
	author?: string
	date?: string | Date
	content?: string
}

export default function ProfilePage() {
	const idUser = decode.decode as { id: string }
	const { editProfil, me, mee, removeComment, orderMaster } = useZapros()
	const [isEditing, setIsEditing] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		email: '',
		phone: '',
		avatar: '',
	})

	const handleRemoveComment = async (comment: Comment) => {
		if (!me) return
		await removeComment(me.id, comment.commentId)
		await mee(me.id)

		const order = { order: false, status: true }
		await orderMaster(me.id, order)
	}

	const [originalData, setOriginalData] = useState({
		name: '',
		surname: '',
		email: '',
		phone: '',
		avatar: '',
	})

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleSave = async () => {
		if (!me) return
		await editProfil(me.id, {
			...formData,
			number: Number(formData.phone),
		})
		await mee(me.id)
		setIsEditing(false)
	}

	const handleCloseAndRemoveAll = () => {
		setFormData(originalData)
		setIsEditing(false)
	}

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = e => {
				setFormData(prev => ({
					...prev,
					avatar: e.target?.result as string,
				}))
			}
			reader.readAsDataURL(file)
		}
	}

	useEffect(() => {
		if (idUser && idUser.id) {
			mee(Number(idUser.id))
		}
	}, [idUser, mee])

	useEffect(() => {
		if (me) {
			const userData = {
				name: me.name || '',
				surname: me.surname || '',
				email: me.email || '',
				phone: me.number?.toString() || '',
				avatar: me.avatar || '',
			}
			setFormData(userData)
			setOriginalData(userData)
		}
	}, [me])

	if (!me) return <div className='text-center py-10'>Загрузка профиля...</div>

	return (
		<>
			<div className='min-h-screen bg-gray-50 py-8'>
				<div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
					<Card>
						<CardHeader>
							<CardTitle className='text-2xl font-bold text-center'>
								Профили ман
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							{/* Аватар */}
							<div className='flex flex-col items-center space-y-4'>
								<div className='relative'>
									<Image
										src={formData.avatar || avatar}
										alt='Аватар'
										width={120}
										height={120}
										className='rounded-full bg-gray-200 object-cover'
									/>
									{isEditing && (
										<label className='absolute bottom-0 right-0 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full cursor-pointer'>
											<Camera className='w-4 h-4' />
											<input
												type='file'
												accept='image/*'
												onChange={handleAvatarChange}
												className='hidden'
											/>
										</label>
									)}
								</div>
							</div>

							{/* Форма */}
							<div className='space-y-4'>
								<div className='flex gap-4'>
									<div className='flex flex-col w-full gap-2'>
										<Label htmlFor='name'>Ном</Label>
										<Input
											id='name'
											type='text'
											value={formData.name}
											onChange={e => handleInputChange('name', e.target.value)}
											disabled={!isEditing}
										/>
									</div>
									<div className='flex flex-col w-full gap-2'>
										<Label htmlFor='surname'>Насаб</Label>
										<Input
											id='surname'
											type='text'
											value={formData.surname}
											onChange={e =>
												handleInputChange('surname', e.target.value)
											}
											disabled={!isEditing}
										/>
									</div>
								</div>

								<div className='flex flex-col gap-2'>
									<Label htmlFor='email'>Почтаи электронӣ</Label>
									<Input
										id='email'
										type='email'
										value={formData.email}
										onChange={e => handleInputChange('email', e.target.value)}
										disabled={!isEditing}
									/>
								</div>

								<div className='flex flex-col gap-2'>
									<Label htmlFor='phone'>Телефон</Label>
									<Input
										id='phone'
										type='tel'
										value={formData.phone}
										onChange={e => handleInputChange('phone', e.target.value)}
										disabled={!isEditing}
									/>
								</div>
							</div>

							{/* Кнопки */}
							<div className='flex space-x-4'>
								{isEditing ? (
									<>
										<Button
											onClick={handleSave}
											className='flex-1 bg-red-500 hover:bg-red-600'
										>
											Захира кардан
										</Button>
										<Button
											variant='outline'
											onClick={handleCloseAndRemoveAll}
											className='flex-1'
										>
											Бекор кардан
										</Button>
									</>
								) : (
									<Button
										onClick={() => setIsEditing(true)}
										className='w-full bg-red-500 hover:bg-red-600'
									>
										Таҳрири профил
									</Button>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			{me.comment && (
				<div className='bg-gray-50 pb-10 mt-[-80px] md:w-2xl w-[100%] m-auto'>
					<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
						<h1 className='text-3xl font-bold mb-10 text-center text-gray-800'>
							Фармоишҳои ман
						</h1>

						<div className='space-y-6'>
							{Array.isArray(me.comment) &&
								(me.comment as unknown as Comment[]).map(order => (
									<div
										key={order?.commentId}
										className='bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-xl transition'
									>
										{/* Верхняя часть: автор и дата */}
										<div className='flex items-center gap-4'>
											<Image
												src={order.avatar || avatar}
												alt='Avatar'
												width={60}
												height={60}
												className='rounded-full border-2 border-gray-200 shadow-sm'
											/>
											<div className='flex flex-col'>
												<span className='text-lg font-semibold text-gray-900'>
													{order.author}
												</span>
												{order.date ? (
  <>
    <Calendar className='w-4 h-4' />
    {new Date(order.date).toLocaleDateString('ru-RU')}
    <Clock className='w-4 h-4 ml-2' />
    {new Date(order.date).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })}
  </>
) : (
  <span>Дата отсутствует</span>
)}

											</div>
										</div>

										{/* Контент комментария */}
										<p className='text-gray-700 px-1 w-full break-words whitespace-pre-line'>
											{order.content}
										</p>

										{/* Кнопка */}
										<div className='flex justify-end'>
											<button
												onClick={() => handleRemoveComment(order)}
												className='bg-red-500 text-[white] hover:bg-red-600 text-sm font-medium border  px-4 py-1.5 rounded-lg transition'
											>
												Хориҷ кардан
											</button>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
