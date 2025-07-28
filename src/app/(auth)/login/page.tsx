'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import useZapros from '@/app/store/zapros'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
	const { login } = useZapros()
	const router = useRouter()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const user = {
				email: formData.email,
				password: String(formData.password),
			}

			const res = await login(user)

			if (res === undefined) {
				router.push('/')
				setFormData({
					email: '',
					password: '',
				})
			} else {
				console.log('Неверный логин или пароль')
			}
		} catch  {
			console.log('Ошибка при входе')
		} finally {
			console.log('error')
		}
	}

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<Card className='w-full max-w-md'>
				<CardHeader className='text-center'>
					<CardTitle className='text-2xl font-bold text-gray-900'>
						Хуш омадед
					</CardTitle>
					<CardDescription>Ба ҳисоби FIX.TJ-и худ ворид шавед</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='flex flex-col gap-[5px]'>
							<Label htmlFor='email'>Почтаи электронӣ</Label>
							<Input
								id='email'
								type='email'
								value={formData.email}
								onChange={e => handleInputChange('email', e.target.value)}
								required
							/>
						</div>

						<div className='flex flex-col gap-[5px]'>
							<Label htmlFor='password'>Рамз</Label>
							<Input
								id='password'
								type='password'
								value={formData.password}
								onChange={e => handleInputChange('password', e.target.value)}
								required
							/>
						</div>

						<Button
							type='submit'
							className='w-full bg-red-500 hover:bg-red-600'
						>
							Ворид шудан
						</Button>

						<div className='text-center'>
							<p className='text-sm text-gray-600'>
								Ҳисоб надоред?{' '}
								<Link
									href='/register'
									className='text-red-500 hover:text-red-600 font-medium'
								>
									Сабти ном
								</Link>
							</p>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
