'use client'
import Image from 'next/image'
import Main from '@/app/components/container/main'
import useZapros from '@/app/store/zapros'
import { useEffect, useState } from 'react'
import avatar from '@/app/assets/avatar.png'
import StarRatings from 'react-star-ratings'
import OutgoingMailIcon from '@mui/icons-material/OutgoingMail'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import SendIcon from '@mui/icons-material/Send'
import decode from '@/app/utils/axios-reguest'
import { motion } from 'framer-motion'

type ParamsType = {
  params: {
    'master-by-id': string
  }
}

type ReviewType = {
  id?: string
  name: string
  avatar?: string
  raiting: number
  description: string
}

export default function Page({ params }: ParamsType) {
  const id = params['master-by-id']
  const { getMasterById, masterById, sendReview } = useZapros()
  const [newReview, setNewReview] = useState('')
  const [newRating, setNewRating] = useState(0)
console.log(decode?.decode?.name);

  const handleSendReview = () => {
    if (!newReview.trim()) return
    const review: ReviewType = {
      name: decode.decode.name,
      description: newReview,
      raiting: newRating,
      avatar: decode.decode.avatar,
    }
    sendReview(id, review)
    setNewReview('')
    setNewRating(0)
  }

  const raiting = () => {
    if (!masterById.review || masterById.review.length === 0) return 0
    const sum = masterById.review.reduce((acc: number, el: ReviewType) => acc + el.raiting, 0)
    return sum / masterById.review.length
  }

  useEffect(() => {
    getMasterById(id)
  }, [id])

  return (
    <Main>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col lg:flex-row gap-6 items-start mt-6 p-4'
      >
        {/* Основная информация */}
        <motion.aside 
          whileHover={{ y: -5 }}
          className='w-full lg:w-[65%] bg-gradient-to-br from-[#fdf2f8] to-[#fae8ff] border border-[#e9d5ff] rounded-2xl p-6 shadow-lg flex flex-col gap-6 h-[80vh]'
        >
          <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className='relative'
            >
              <Image
                src={masterById.avatar || avatar}
                alt='avatar'
                width={140}
                height={140}
                className='rounded-full border-4 border-[#f3e8ff] object-cover shadow-lg'
              />
              <div className='absolute inset-0 rounded-full border-4 border-transparent hover:border-[#e9d5ff] transition-all duration-300' />
            </motion.div>
            
            <div className='flex flex-col gap-3 text-center md:text-left'>
              <h2 className='text-3xl font-bold text-[#6b21a8]'>
                {masterById.surname} {masterById.name}
              </h2>
              <p className='text-[#9333ea] text-base italic'>
                Мастер по: <span className='font-semibold'>{masterById.job}</span>
              </p>
              <p className='text-[#7e22ce] text-sm bg-[#f3e8ff] px-3 py-1 rounded-full inline-block'>
                {masterById.experience} года опыта
              </p>
              
              <div className='flex flex-col gap-1 mt-2'>
                <p className='text-[#7e22ce] text-sm flex items-center justify-center md:justify-start gap-2'>
                  <OutgoingMailIcon className='text-[#9D174D]' /> 
                  {masterById.email}
                </p>
                <p className='text-[#7e22ce] text-sm flex items-center justify-center md:justify-start gap-2'>
                  <LocalPhoneIcon className='text-[#9D174D]' /> 
                  {masterById.number}
                </p>
              </div>
              
              <div className='flex justify-center md:justify-start'>
                <StarRatings
                  rating={raiting()}
                  starRatedColor='#eab308'
                  starEmptyColor='#e9d5ff'
                  numberOfStars={5}
                  starDimension='24px'
                  starSpacing='2px'
                  name='rating'
                />
              </div>
            </div>
          </div>

          {/* Чат */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className='bg-white border border-[#e9d5ff] rounded-xl p-4 shadow-sm flex flex-col gap-3 mt-4 h-[50%]'
          >
            <h4 className='text-lg font-semibold text-[#6b21a8] border-b border-[#e9d5ff] pb-2'>
              Чат с мастером
            </h4>
            <div className='flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-2'>
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className='self-end bg-[#f3e8ff] text-[#6b21a8] p-3 rounded-lg max-w-[80%] text-sm shadow-sm'
              >
                Здравствуйте, вы свободны на этой неделе?
              </motion.div>
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='self-start bg-[#e9d5ff] text-[#6b21a8] p-3 rounded-lg max-w-[80%] text-sm shadow-sm'
              >
                Да, я свободен после среды. Какой день вам удобен?
              </motion.div>
            </div>
            <div className='flex gap-2 pt-2'>
              <input
                type='text'
                placeholder='Напишите сообщение...'
                className='flex-1 p-2 border border-[#e9d5ff] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#e9d5ff] transition'
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-[#9D174D] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#7e22ce] transition shadow-md'
              >
                Отправить
              </motion.button>
            </div>
          </motion.div>
        </motion.aside>

        {/* Отзывы */}
        <motion.aside 
          whileHover={{ y: -5 }}
          className='w-full lg:w-[35%] bg-gradient-to-br from-[#fdf2f8] to-[#fae8ff] border border-[#e9d5ff] rounded-2xl p-6 shadow-lg flex flex-col gap-5 max-h-[80vh]'
        >
          <h3 className='text-2xl font-semibold text-[#6b21a8] mb-2 border-b border-[#e9d5ff] pb-2'>
            Отзывы
          </h3>
          
          <div className='overflow-y-auto pr-2 flex flex-col gap-4 max-h-[45vh]'>
            {masterById.review && masterById.review.length > 0 ? (
              masterById.review.map((rev: ReviewType, index: number) => (
                <motion.div
                  key={rev.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className='bg-white rounded-xl p-4 shadow-sm border border-[#e9d5ff] hover:shadow-md transition-all duration-300 flex flex-col gap-3'
                >
                  <div className='flex items-center gap-3'>
                    <Image
                      src={rev.avatar || avatar}
                      alt='avatar'
                      width={48}
                      height={48}
                      className='rounded-full border border-[#e9d5ff] object-cover images'
                    />
                    <div className='flex flex-col'>
                      <span className='text-[#6b21a8] font-medium text-sm'>{rev.name}</span>
                      <StarRatings
                        rating={rev.raiting}
                        starRatedColor='#eab308'
                        starEmptyColor='#e9d5ff'
                        numberOfStars={5}
                        starDimension='16px'
                        starSpacing='1px'
                        name={`rating-${rev.id || index}`}
                      />
                    </div>
                  </div>
                  <p className='text-[#6b21a8] text-sm relative pl-4 border-l-2 border-[#e9d5ff]'>
                    “{rev.description}”
                  </p>
                </motion.div>
              ))
            ) : (
              <p className='text-[#9333ea] text-sm italic text-center py-4'>
                Отзывов пока нет. Будьте первым!
              </p>
            )}
          </div>

          {/* Форма отзыва */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='border-t border-[#e9d5ff] pt-4 mt-auto flex flex-col gap-3'
          >
            <h4 className='text-[#6b21a8] font-semibold text-sm'>Оставить отзыв</h4>
            <StarRatings
              rating={newRating}
              changeRating={(rating: number) => setNewRating(rating)}
              starRatedColor='#eab308'
              starHoverColor='#eab308'
              numberOfStars={5}
              name='user-rating'
              starDimension='20px'
              starSpacing='2px'
            />
            <div className='flex gap-2'>
              <textarea
                value={newReview}
                onChange={e => setNewReview(e.target.value)}
                placeholder='Напишите свой отзыв...'
                className='flex-1 p-3 border border-[#e9d5ff] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#e9d5ff] resize-none min-h-[80px]'
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-[#9D174D] text-white p-2 rounded-lg hover:bg-[#7e22ce] transition self-end shadow-md'
                onClick={handleSendReview}
              >
                <SendIcon />
              </motion.button>
            </div>
          </motion.div>
        </motion.aside>
      </motion.section>
    </Main>
  )
}