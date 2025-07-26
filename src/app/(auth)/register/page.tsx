'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	Container,
	Typography,
	Box,
	TextField,
	Button,
	Card,
	CardContent,
	IconButton,
	InputAdornment,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Checkbox,
	FormControlLabel,
	Grid,
	Divider,
	Alert,
} from '@mui/material'
import { Eye, EyeOff, Mail, Lock, User, Phone, UserCheck } from 'lucide-react'
import Link from 'next/link'
import useZapros from '@/app/store/zapros'

export default function RegisterPage() {
	const { register } = useZapros()
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
		userType: '',
		profession: '',
		country: '',
		years: '',
	})
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [agreeToTerms, setAgreeToTerms] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const router = useRouter()

	const professions = [
		'Электрик',
		'Сантехник',
		'Строитель',
		'Маляр',
		'Мебельщик',
		'Уборщик',
	]
	const country = ['Dushanbe', 'Khujand', 'Bokhtar', 'Farkhor']
	const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }))
		setError('')
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setSuccess('')

		if (formData.password !== formData.confirmPassword) {
			setError('Пароли не совпадают')
			return
		}

		if (!agreeToTerms) {
			setError('Необходимо согласиться с условиями использования')
			return
		}

		setIsLoading(true)

		let newUser = null

		if (formData.userType === 'master') {
			newUser = {
				name: formData.firstName,
				surname: formData.lastName,
				email: formData.email,
				number: formData.phone,
				role: formData.userType,
				password: formData.password,
				job: formData.profession,
				status: true,
				avatar: null,
				wish: false,
				raiting: 0,
				country: formData.country,
            experience: formData.years,
			}
		} else {
			newUser = {
				name: formData.firstName,
				surname: formData.lastName,
				email: formData.email,
				number: formData.phone,
				role: formData.userType,
				password: formData.password,
				avatar: null,
			}
		}

		const res = await register(newUser)
		console.log(res)

		if (res === undefined) {
			router.push('/login')
		}
	}

	return (
		<Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', py: 4 }}>
			<Container maxWidth='md'>
				<Box sx={{ textAlign: 'center', mb: 4 }}>
					<Link href='/' style={{ textDecoration: 'none' }}>
						<Typography
							variant='h3'
							sx={{ fontWeight: 'bold', color: '#2563eb', mb: 2 }}
						>
							МастерСервис
						</Typography>
					</Link>
					<Typography
						variant='h4'
						sx={{ fontWeight: 600, color: '#1f2937', mb: 1 }}
					>
						Регистрация
					</Typography>
					<Typography variant='body1' sx={{ color: '#6b7280' }}>
						Создайте аккаунт для доступа к сервису
					</Typography>
				</Box>

				<Card
					sx={{ boxShadow: 3, borderRadius: 3, border: '1px solid #e5e7eb' }}
				>
					<CardContent sx={{ p: 4 }}>
						{error && (
							<Alert severity='error' sx={{ mb: 3, borderRadius: 2 }}>
								{error}
							</Alert>
						)}

						{success && (
							<Alert severity='success' sx={{ mb: 3, borderRadius: 2 }}>
								{success}
							</Alert>
						)}

						<form onSubmit={handleSubmit}>
							<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
								{/* Name Fields */}
								<div className='flex gap-[25px]'>
									<TextField
										fullWidth
										label='Имя'
										value={formData.firstName}
										onChange={e =>
											handleInputChange('firstName', e.target.value)
										}
										placeholder='Иван'
										required
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<User size={20} color='#6b7280' />
												</InputAdornment>
											),
										}}
									/>

									<TextField
										fullWidth
										label='Фамилия'
										value={formData.lastName}
										onChange={e =>
											handleInputChange('lastName', e.target.value)
										}
										placeholder='Иванов'
										required
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<User size={20} color='#6b7280' />
												</InputAdornment>
											),
										}}
									/>
								</div>

								{/* Email Field */}
								<TextField
									fullWidth
									label='Email'
									type='email'
									value={formData.email}
									onChange={e => handleInputChange('email', e.target.value)}
									placeholder='your@email.com'
									required
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<Mail size={20} color='#6b7280' />
											</InputAdornment>
										),
									}}
								/>

								{/* Phone Field */}
								<TextField
									fullWidth
									label='Телефон'
									type='tel'
									value={formData.phone}
									onChange={e => handleInputChange('phone', e.target.value)}
									placeholder='+7 (999) 123-45-67'
									required
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<Phone size={20} color='#6b7280' />
											</InputAdornment>
										),
									}}
								/>

								{/* User Type Select */}
								<FormControl fullWidth required>
									<InputLabel>Тип пользователя</InputLabel>
									<Select
										value={formData.userType}
										onChange={e =>
											handleInputChange('userType', e.target.value)
										}
										label='Тип пользователя'
										startAdornment={
											<InputAdornment position='start'>
												<UserCheck size={20} color='#6b7280' />
											</InputAdornment>
										}
									>
										<MenuItem value='user'>User</MenuItem>
										<MenuItem value='master'>Master</MenuItem>
									</Select>
								</FormControl>
								{formData.userType === 'master' && (
									<div className='flex flex-col gap-[25px]'>
										<div className='flex gap-[25px]'>
											<FormControl fullWidth required>
												<InputLabel>Профессия</InputLabel>
												<Select
													value={formData.profession}
													onChange={e =>
														handleInputChange('profession', e.target.value)
													}
													label='Профессия'
												>
													{professions.map(prof => (
														<MenuItem key={prof} value={prof}>
															{prof}
														</MenuItem>
													))}
												</Select>
											</FormControl>
											<FormControl fullWidth required>
												<InputLabel>Опыт работы</InputLabel>
												<Select
													value={formData.years}
													onChange={e =>
														handleInputChange('years', e.target.value)
													}
													label='Опыт работы'
												>
													{years.map(prof => (
														<MenuItem key={prof} value={prof}>
															{prof}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</div>
										<FormControl fullWidth required>
											<InputLabel>Country</InputLabel>
											<Select
												value={formData.country}
												onChange={e =>
													handleInputChange('country', e.target.value)
												}
												label='Country'
											>
												{country.map(prof => (
													<MenuItem key={prof} value={prof}>
														{prof}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</div>
								)}

								{/* Password Fields */}
								<div className='flex gap-[25px]'>
									<TextField
										fullWidth
										label='Пароль'
										type={showPassword ? 'text' : 'password'}
										value={formData.password}
										onChange={e =>
											handleInputChange('password', e.target.value)
										}
										placeholder='Введите пароль'
										required
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<Lock size={20} color='#6b7280' />
												</InputAdornment>
											),
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														onClick={() => setShowPassword(!showPassword)}
														edge='end'
													>
														{showPassword ? (
															<EyeOff size={20} />
														) : (
															<Eye size={20} />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
									<TextField
										fullWidth
										label='Подтвердите пароль'
										type={showConfirmPassword ? 'text' : 'password'}
										value={formData.confirmPassword}
										onChange={e =>
											handleInputChange('confirmPassword', e.target.value)
										}
										placeholder='Повторите пароль'
										required
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<Lock size={20} color='#6b7280' />
												</InputAdornment>
											),
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														onClick={() =>
															setShowConfirmPassword(!showConfirmPassword)
														}
														edge='end'
													>
														{showConfirmPassword ? (
															<EyeOff size={20} />
														) : (
															<Eye size={20} />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</div>
								{/* Terms Agreement */}
								<FormControlLabel
									control={
										<Checkbox
											checked={agreeToTerms}
											onChange={e => setAgreeToTerms(e.target.checked)}
											color='primary'
										/>
									}
									label={
										<Typography variant='body2' sx={{ color: '#1f2937' }}>
											Я согласен с{' '}
											<Link
												href='#'
												style={{
													color: '#2563eb',
													fontWeight: 600,
													textDecoration: 'none',
												}}
											>
												условиями использования
											</Link>{' '}
											и{' '}
											<Link
												href='#'
												style={{
													color: '#2563eb',
													fontWeight: 600,
													textDecoration: 'none',
												}}
											>
												политикой конфиденциальности
											</Link>
										</Typography>
									}
								/>

								{/* Register Button */}
								<Button
									type='submit'
									fullWidth
									variant='contained'
									size='large'
									disabled={isLoading}
									sx={{
										py: 1.5,
										fontSize: '1.1rem',
										fontWeight: 600,
									}}
								>
									{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
								</Button>

								{/* Divider */}
								<Divider sx={{ my: 2 }}>
									<Typography variant='body2' sx={{ color: '#6b7280', px: 2 }}>
										Или
									</Typography>
								</Divider>

								{/* Login Link */}
								<Box sx={{ textAlign: 'center' }}>
									<Typography variant='body1' sx={{ color: '#1f2937' }}>
										Уже есть аккаунт?{' '}
										<Link href='/auth/login' style={{ textDecoration: 'none' }}>
											<Typography
												component='span'
												sx={{
													color: '#2563eb',
													fontWeight: 600,
													'&:hover': { textDecoration: 'underline' },
												}}
											>
												Войти
											</Typography>
										</Link>
									</Typography>
								</Box>
							</Box>
						</form>
					</CardContent>
				</Card>

				{/* Back to Home */}
				<Box sx={{ textAlign: 'center', mt: 3 }}>
					<Link href='/' style={{ textDecoration: 'none' }}>
						<Typography
							variant='body2'
							sx={{
								color: '#6b7280',
								'&:hover': { color: '#2563eb', textDecoration: 'underline' },
							}}
						>
							← Вернуться на главную
						</Typography>
					</Link>
				</Box>
			</Container>
		</Box>
	)
}
