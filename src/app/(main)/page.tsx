import { Section1 } from '../components/home/section-1'
import sefity from '@/app/assets/safity.png'
import review from '@/app/assets/review.png'
import actual from '@/app/assets/actual.jpg'
import Image from 'next/image'
import Main from '../components/container/main'
import { Section3 } from '../components/home/section-3'
import {
	BrickWall,
	ClockArrowUp,
	Earth,
	Laptop,
	Plus,
	Shield,
	Star,
} from 'lucide-react'
import { Section4 } from '../components/home/section-4'
import {useTranslations} from 'next-intl';
import Link from 'next/link'

export default function Home() {
   const t = useTranslations('page');
	return (
		<>
			<section className='bg-gray-900'>
				<section className='w-[1200px] m-auto py-12 flex justify-between'>
					<aside className='w-[50%] py-[40px] flex flex-col gap-[20px] items-start'>
						<h2 className='text-3xl sm:text-5xl font-bold text-white mb-4'>
							{t('1')}
						</h2>
						<p className='text-gray-400 text-lg sm:text-xl mb-6'>
							{t('2')}
						</p>
						<Link
							href='/master'
							className='inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300'
						>
							Ёфтани усто
						</Link>
					</aside>
					<aside className='w-[50%]'>
						<Section1></Section1>
					</aside>
				</section>
				<section className='bg-white py-12 px-4 sm:px-6 lg:px-8 pt-20'>
					<div className='max-w-4xl mx-auto text-center'>
						<h2 className='text-3xl font-bold text-gray-900 mb-4'>
							Чаро TrustHub <span className='text-red-500'>FIX.TJ</span>-ро
							интихоб кардан лозим аст?
						</h2>
						<p className='text-xl text-gray-700'>
							Ҳар як ресурс бо диққат санҷида шуда, аз ҷониби ҷомеаи
							мутахассисони мо тасдиқ мегардад.
						</p>
					</div>
				</section>
			</section>
			<section className='max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10 mb-10 px-4 p-8 rounded-2xl'>
				{[
					{
						img: sefity,
						width: 230,
						title: 'Сифати санҷидашуда',
						text: 'Ҳамаи манбаъҳо бодиққат санҷида шуда, аз ҷониби дастаи мо тасдиқ мегарданд.',
					},
					{
						img: review,
						width: 270,
						title: 'Аз ҷониби ҷомеа баҳогузорӣ шудааст',
						text: 'Баҳоҳо ва назари воқеӣ аз иштирокчиёни боэътимоди ҷомеа.',
					},
					{
						img: actual,
						width: 180,
						title: 'Ҳамеша нав ва муосир',
						text: 'Мазмуни тоза ва навсозии мунтазам, ки манбаъҳоро ҳамеша актуалӣ нигоҳ медорад.',
					},
				].map(({ img, width, title, text }, i) => (
					<div
						key={i}
						className='flex flex-col items-center bg-gray-100 rounded-2xl p-8 
                 shadow-md shadow-gray-900 hover:shadow-lg hover:shadow-gray-700 
                 transition duration-300 transform hover:scale-105 w-full md:w-1/3'
					>
						<Image
							src={img}
							width={width}
							height={120}
							alt='logo'
							className='mb-6'
						/>
						<h3 className='text-xl font-semibold mb-3 text-center text-gray-900'>
							{title}
						</h3>
						<p className='text-gray-700 text-center leading-relaxed'>{text}</p>
					</div>
				))}
			</section>
			<section className='bg-gray-900 py-20'>
				<Main>
					<section className='text-gray-900 flex flex-col items-center gap-8 max-w-6xl mx-auto px-4'>
						<h2 className='text-3xl font-semibold text-white mb-6'>
							Афзалиятҳои мо
						</h2>
						<aside className='flex gap-8 w-full justify-between flex-wrap'>
							{[
								{
									icon: Star,
									bg: 'bg-yellow-100',
									iconColor: 'text-yellow-600',
									label: 'Бозхурдҳои муштариёни мо',
								},
								{
									icon: ClockArrowUp,
									bg: 'bg-green-100',
									iconColor: 'text-green-600',
									label: 'Устоҳои мо корро дар вақти кӯтоҳ анҷом медиҳанд.',
								},
								{
									icon: Shield,
									bg: 'bg-blue-100',
									iconColor: 'text-blue-600',
									label: 'Сомонаи бехатар',
								},
								{
									icon: Laptop,
									bg: 'bg-green-100',
									iconColor: 'text-green-600',
									label: 'Сомона муосир',
								},
								{
									icon: Earth,
									bg: 'bg-blue-100',
									iconColor: 'text-blue-600',
									label: 'Глобалӣ',
								},
								{
									icon: BrickWall,
									bg: 'bg-yellow-100',
									iconColor: 'text-yellow-600',
									label: 'Беҳтарин устоҳо',
								},
							].map(({ icon: Icon, bg, iconColor, label }, i) => (
								<div
									key={i}
									className='flex items-center gap-4 bg-white rounded-2xl p-6 shadow-lg
                   w-full sm:w-[48%] md:w-[30%]
                   transform transition-transform duration-300 hover:scale-105 cursor-pointer'
								>
									<div
										className={`${bg} p-4 rounded-xl flex items-center justify-center shadow-md`}
									>
										<Icon className={`${iconColor} w-8 h-8`} />
									</div>
									<b className='text-lg leading-tight'>{label}</b>
								</div>
							))}
						</aside>
					</section>
				</Main>
			</section>
			<Main>
				<section className='h-[70vh]'>
					<Section3></Section3>
				</section>
			</Main>
			<section className='bg-gray-900 mt-[40px] py-[40px]'>
				<Main>
					<section className='flex justify-between'>
						<aside className='w-[50%] py-[40px] flex flex-col gap-[20px] items-start'>
							<h2 className='text-3xl sm:text-5xl font-bold text-white mb-4'>
								Ба шабакаи боэътимоди{' '}
								<span className='text-red-500'>FIX.TJ</span> ҳамроҳ шавед
							</h2>
							<p className='text-gray-400 text-lg sm:text-xl mb-6'>
								Қисме аз ҷомеаи мутахассисони санҷидашуда, хизматрасониҳо ва
								платформаҳо шавед. Мо якҷоя интернетеро эҷод мекунем, ки дар он
								сифат, аслӣ ва боэътимодӣ қадр карда мешаванд. Нашр кунед,
								мубодила намоед ва ба дигарон дар ёфтани манбаъҳои воқеан
								арзишманд кӯмак расонед.
							</p>
							<Link
								href='/register'
								className='flex gap-[10px] bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300'
							>
								<Plus></Plus> Бақайдгирӣ кунед
							</Link>
						</aside>
						<aside className='w-[50%]'>
							<Section4></Section4>
						</aside>
					</section>
				</Main>
			</section>
			<section className='bg-white py-40 px-4 sm:px-6 lg:px-8 pt-40'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						Омодаед, ки оғоз кунед?
					</h2>
					<p className='text-xl text-gray-700'>
						Ба ҳазорон корбарон ва мутахассисоне, ки аллакай{' '}
						<span className='text-red-500'>
							<b> FIX.TJ</b>
						</span>
						-ро барои ҷустуҷӯи устоҳои санҷидашуда, хизматрасониҳо ва манбаъҳо
						интихоб мекунанд, ҳамроҳ шавед. <br /> Бо эътимод оғоз кунед — бо{' '}
						<span className='text-red-500'>
							<b> FIX.TJ</b>
						</span>{' '}
						оғоз кунед.
					</p>
          <Link href={'/master'}>
					<button className='bg-red-500 text-white py-[10px] px-[18px] mt-[15px] rounded-[15px]'>
						Оғоз кардан
					</button>
          </Link>
				</div>
			</section>
		</>
	)
}
