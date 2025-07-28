'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera } from 'lucide-react'
import avatar from '@/app/assets/avatar.png'
import decode from '@/app/utils/axios-reguest'
import Image from 'next/image'
import useZapros from '@/app/store/zapros'

export default function ProfilePage() {
	// If you are sure the payload has 'id', use type assertion:
	const idUser = decode.decode as { id: string } // or number, depending on your backend
	const { editProfil, me, mee } = useZapros()
	const [isEditing, setIsEditing] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		email: '',
		phone: '',
		avatar: '',
	})

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

	if (!me) return <div className="text-center py-10">Загрузка профиля...</div>

	return (
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
										onChange={e => handleInputChange('surname', e.target.value)}
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
	)
}
