'use client'

import avatar from '@/app/assets/avatar.png'
import useZapros from '@/app/store/zapros'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Clock, MapPin, Search, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import santexnik from '@/app/assets/santexnik.png'
import santexnik1 from '@/app/assets/santexnik1.png'
import { CoolMode } from '@/components/magicui/cool-mode'

export default function Page() {
	const { users, getUsers, filterMasters } = useZapros()
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedProfession, setSelectedProfession] = useState('')
	const [selectedStatus, setSelectedStatus] = useState('')

	const reaiting = (reviews: { rating?: number }[]) => {
		if (!reviews || reviews.length === 0) return 0
		const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0)
		return (sum / reviews.length).toFixed(1)
	}

	const handleFilterMaster = () => {
		const Users = {
			job: selectedProfession,
			country: selectedStatus,
		}
		filterMasters(Users)
	}

	useEffect(() => {
		getUsers()
	}, [getUsers])

	return (
		<div className='min-h-screen'>
			<section className='bg-gray-900 w-[100%]'>
				<section className='relative w-[1200px] m-auto flex items-center justify-between overflow-hidden py-[40px] flex-col md:flex-row'>
					<aside className='w-[50%] text-white'>
						<h1 className='text-5xl md:text-5xl font-bold mb-6'>
							Устоҳони моҳирро дар Тоҷикистон пайдо кунед
						</h1>
						<p className='text-xl md:text-2xl mb-8 text-gray-200'>
							Бо мутахассисони ботаҷриба барои ҳамаи ниёзҳои хидматрасониятон
							пайваст шавед
						</p>
						<CoolMode>
							<Button
								size='lg'
								className='bg-red-500 hover:bg-red-600 text-lg px-8 py-3'
							>
								Оғоз кунед
							</Button>
						</CoolMode>
					</aside>
					<aside className='w-[41%] flex flex-col gap-[7px]'>
						<Image
							src={santexnik}
							className='rounded-[15px] self-end'
							alt='logo'
							width={250}
							height={250}
						/>
						<Image
							src={santexnik1}
							className='rounded-[15px] '
							alt='logo'
							width={250}
							height={250}
						/>
					</aside>
				</section>
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
									<SelectItem value='mekhanik'>Механик</SelectItem>
									<SelectItem value='moshin'>Мошин</SelectItem>
									<SelectItem value='electric'>Електрик</SelectItem>
									<SelectItem value='asheiruzgor'>Асеи Рузгор</SelectItem>
								</SelectContent>
							</Select>

							<Select value={selectedStatus} onValueChange={setSelectedStatus}>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Шаҳрро интихоб кунед' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>Ҳамаи шаҳрҳо</SelectItem>
									<SelectItem value='Dushanbe'>Душанбе</SelectItem>
									<SelectItem value='Khujand'>Хучанд</SelectItem>
									<SelectItem value='Bokhtar'>Бохтар</SelectItem>
									<SelectItem value='Farkhor'>Фархор</SelectItem>
								</SelectContent>
							</Select>
							<CoolMode>
								<Button
									className='bg-red-500 hover:bg-red-600'
									onClick={handleFilterMaster}
								>
									Ҷустуҷӯ
								</Button>
							</CoolMode>
						</div>
					</div>
				</div>
			</section>

			{/* Masters Grid */}
			<section className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold text-center text-white mb-16">
      Устоҳони дастрас
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
     {users
  .filter(el => el.role == 'master')
  .filter(el =>
    el.name
      .toLowerCase()
      .trim()
      .includes(searchTerm.toLowerCase().trim())
  )
  .map(master => (
    <div
      key={master.id}
      className='relative overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:scale-[1.03] group'
    >
      <div className='absolute inset-0 bg-gradient-to-br from-red-500/20 via-gray-200 to-red-300/30 opacity-30 group-hover:opacity-50 transition-opacity z-0' />

      <div className='relative z-10 p-6 flex flex-col items-center text-center text-gray-900'>
        <Image
          src={master.avatar || avatar}
          alt={master.name}
          width={90}
          height={90}
          className='rounded-full border-4 border-red-500/30 bg-gray-100 mb-4 shadow-sm'
        />

        {/* Имя с бейджем */}
        <h3 className='text-lg font-semibold flex items-center gap-3 mb-1'>
          <span>{master.name}</span>
          <span className="inline-flex items-center bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-lg shadow-sm select-none">
            👤 Мастер
          </span>
        </h3>

        <p className='text-sm text-red-500 font-medium mb-2'>{master.job}</p>

        <div className='flex items-center gap-1 text-yellow-500 mb-1'>
          <Star className='w-4 h-4 fill-yellow-400' />
          <span className='text-sm font-medium'>
            {reaiting(master.review)}
          </span>
          <span className='text-sm text-gray-500'>
            ({master?.review?.length || 0} баҳогузорӣ)
          </span>
        </div>

        <div className='flex items-center text-sm text-gray-700 gap-1 mb-3'>
          <Clock className='w-4 h-4' />
          <span>{master.experience} сол таҷриба</span>
        </div>

        {/* Страна с красным бейджем */}
        <div className='flex items-center gap-2 mb-3'>
          <MapPin className='w-5 h-5 text-red-600' />
          <span className="bg-red-100 text-red-700 text-sm font-medium px-3 py-1 rounded-lg shadow select-none">
            {master.country}
          </span>
        </div>

        <Badge
          variant={master.status ? 'default' : 'secondary'}
          className={`px-4 py-1 text-xs font-semibold rounded-full ${
            master.status
              ? 'bg-green-500 text-white'
              : 'bg-gray-400 text-gray-200'
          }`}
        >
          {master.status ? 'Дастрас' : 'Банд'}
        </Badge>

        <CoolMode>
          <Button
            asChild
            className='w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-full shadow-md transition-all'
            disabled={!master.status}
          >
            <Link href={`/${master.id}`}>Дидани профил</Link>
          </Button>
        </CoolMode>
      </div>
    </div>
  ))}



    </div>
  </div>
</section>

		</div>
	)
}
