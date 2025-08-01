import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Users, Shield, Clock } from 'lucide-react'
import Image from 'next/image'
import boss from '@/app/assets/boss.jpg'
import bos from '@/app/assets/bos.jpg'
import {useTranslations} from 'next-intl';

export default function AboutPage() {
	const t = useTranslations('about');
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='relative py-20 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
							 {t('1')} <span className='text-red-500'>FIX.TJ</span>
						</h1>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{t('2')}
						</p>
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className='py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						<div>
							<h2 className='text-3xl font-bold text-gray-900 mb-6'>
								{t('3')}
							</h2>
							<p className='text-lg text-gray-600 mb-6'>
								{t('4')}
							</p>
							<p className='text-lg text-gray-600'>
								{t('5')}
							</p>
						</div>
						<div>
							<Image
								src={boss}
								alt='Our Mission'
								width={600}
								height={400}
								className='rounded-lg shadow-lg bg-cover'
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-16 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 mb-4'>
							{t('6')}
						</h2>
						<p className='text-xl text-gray-600'>
							{t('7')}
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<Card className='text-center'>
							<CardContent className='p-6'>
								<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<CheckCircle className='w-8 h-8 text-red-500' />
								</div>
								<h3 className='text-lg font-semibold mb-2'>
									{t('8')}
								</h3>
								<p className='text-gray-600'>
									{t('9')}
								</p>
							</CardContent>
						</Card>

						<Card className='text-center'>
							<CardContent className='p-6'>
								<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Users className='w-8 h-8 text-red-500' />
								</div>
								<h3 className='text-lg font-semibold mb-2'>{t('10')}</h3>
								<p className='text-gray-600'>
									{t('11')}
								</p>
							</CardContent>
						</Card>

						<Card className='text-center'>
							<CardContent className='p-6'>
								<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Shield className='w-8 h-8 text-red-500' />
								</div>
								<h3 className='text-lg font-semibold mb-2'>
									{t('12')}
								</h3>
								<p className='text-gray-600'>
									{t('13')}
								</p>
							</CardContent>
						</Card>

						<Card className='text-center'>
							<CardContent className='p-6'>
								<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Clock className='w-8 h-8 text-red-500' />
								</div>
								<h3 className='text-lg font-semibold mb-2'>{t('14')}</h3>
								<p className='text-gray-600'>
									{t('15')}
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className='py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
						<div>
							<div className='text-4xl font-bold text-red-500 mb-2'>500+</div>
							<div className='text-lg text-gray-600'>{t('16')}</div>
						</div>
						<div>
							<div className='text-4xl font-bold text-red-500 mb-2'>
								10,000+
							</div>
							<div className='text-lg text-gray-600'>{t('17')}</div>
						</div>
						<div>
							<div className='text-4xl font-bold text-red-500 mb-2'>98%</div>
							<div className='text-lg text-gray-600'>
								{t('18')}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className='py-16 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 mb-4'>{t('19')}</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{t('20')}
						</p>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						<Image
							src={bos}
							alt='Tajikistan'
							width={600}
							height={400}
							className='rounded-lg shadow-lg bg-cover'
						/>
						<div>
							<h3 className='text-2xl font-bold text-gray-900 mb-4'>
								{t('21')}
							</h3>
							<p className='text-lg text-gray-600 mb-4'>
								{t('22')}
							</p>
							<p className='text-lg text-gray-600'>
								{t('23')}
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
