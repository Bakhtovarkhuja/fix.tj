import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Users, Shield, Clock } from 'lucide-react'
import Image from 'next/image'
import boss from '@/app/assets/boss.jpg'
import bos from '@/app/assets/bos.jpg'

export default function AboutPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='relative py-20 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
							Дар бораи <span className='text-red-500'>FIX.TJ</span>
						</h1>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Пайвасткунии мутахассисони моҳир бо муштариён дар саросари
							Тоҷикистон. Мо ояндаи бозори хидматрасониро дар Осиёи Марказӣ
							месозем.
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
								Мақсади мо
							</h2>
							<p className='text-lg text-gray-600 mb-6'>
								FIX.TJ барои пур кардани фосилаи байни мутахассисони моҳир ва
								муштариён дар Тоҷикистон эҷод шудааст. Мо боварӣ дорем, ки ҳар
								кас сазовори дастрасӣ ба хидматҳои босифат аст ва ҳар коргари
								моҳир сазовори имкониятҳои одилона барои нишон додани
								махоратҳояш мебошад.
							</p>
							<p className='text-lg text-gray-600'>
								Платформаи мо ба устодон имконият медиҳад, ки обрӯи худро
								созанд, тиҷорати худро рушд диҳанд ва бо муштариёне, ки арзиши
								малакаи онҳоро медонанд, пайваст шаванд. Барои муштариён, мо
								бозори боэътимодеро пешниҳод мекунем, ки дар он метавонанд
								мутахассисони тасдиқшударо барои ҳама гуна ниёзи хидматрасонӣ
								пайдо кунанд.
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
							Чаро FIX.TJ-ро интихоб кунед?
						</h2>
						<p className='text-xl text-gray-600'>
							Мо ба таъмини беҳтарин таҷриба барои устодон ва муштариён ҳам
							содиқем
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<Card className='text-center'>
							<CardContent className='p-6'>
								<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<CheckCircle className='w-8 h-8 text-red-500' />
								</div>
								<h3 className='text-lg font-semibold mb-2'>
									Устодони тасдиқшуда
								</h3>
								<p className='text-gray-600'>
									Ҳамаи мутахассисон тасдиқ ва барои бехатарии шумо санҷида
									шудаанд
								</p>
							</CardContent>
						</Card>

						<Card className='text-center'>
							<CardContent className='p-6'>
								<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Users className='w-8 h-8 text-red-500' />
								</div>
								<h3 className='text-lg font-semibold mb-2'>Шабакаи калон</h3>
								<p className='text-gray-600'>
									Дастрасӣ ба садҳо мутахассисони моҳир дар саросари Тоҷикистон
								</p>
							</CardContent>
						</Card>

						<Card className='text-center'>
							<CardContent className='p-6'>
								<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Shield className='w-8 h-8 text-red-500' />
								</div>
								<h3 className='text-lg font-semibold mb-2'>
									Платформаи бехатар
								</h3>
								<p className='text-gray-600'>
									Муомилоти бехатар бо ҳифозати дарунсохт
								</p>
							</CardContent>
						</Card>

						<Card className='text-center'>
							<CardContent className='p-6'>
								<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<Clock className='w-8 h-8 text-red-500' />
								</div>
								<h3 className='text-lg font-semibold mb-2'>Дастгирии 24/7</h3>
								<p className='text-gray-600'>
									Дастгирии муштариён шабонарӯз барои ҳар гуна кӯмаки лозим
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
							<div className='text-lg text-gray-600'>Устодони тасдиқшуда</div>
						</div>
						<div>
							<div className='text-4xl font-bold text-red-500 mb-2'>
								10,000+
							</div>
							<div className='text-lg text-gray-600'>Хидматҳои анҷомёфта</div>
						</div>
						<div>
							<div className='text-4xl font-bold text-red-500 mb-2'>98%</div>
							<div className='text-lg text-gray-600'>
								Қаноатмандии муштариён
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className='py-16 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 mb-4'>Ҳикояи мо</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Дар соли 2023 таъсис ёфта, FIX.TJ ҳамчун ташаббуси хурде барои
							кӯмак ба ҳунармандони маҳаллӣ дар пайваст шудан бо муштариён дар
							Душанбе оғоз шуд. Имрӯз мо ифтихор мекунем, ки ба ҷомеаҳои ҳамаи
							минтақаҳои Тоҷикистон, аз Хуҷанд то Кӯлоб ва дар ҳама ҷо хидмат
							мерасонем.
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
								Барои Тоҷикистон сохташуда
							</h3>
							<p className='text-lg text-gray-600 mb-4'>
								Мо ниёзҳои беназири бозори маҳаллии худро мефаҳмем. Платформаи
								мо барои кори беандоза дар ҳамаи минтақаҳои Тоҷикистон тарҳрезӣ
								шудааст, забонҳои тоҷикӣ ва русиро дастгирӣ мекунад ва амалҳои
								тиҷоратии маҳаллиро дар назар мегирад.
							</p>
							<p className='text-lg text-gray-600'>
								Аз бозорҳои пурҳаракати Душанбе то кӯчаҳои таърихии Хуҷанд,
								FIX.TJ худро вазифадор медонад, ки истеъдоди маҳаллиро дастгирӣ
								намуда, рушди иқтисодиро дар саросари кишвари зебои мо тақвият
								диҳад.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
