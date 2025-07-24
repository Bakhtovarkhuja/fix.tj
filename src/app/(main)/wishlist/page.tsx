'use client'

import { useEffect } from 'react'
import useZapros from '../../store/zapros'
import avatar from '@/app/assets/avatar.png'
import StarRatings from 'react-star-ratings'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import Image from 'next/image'
import Main from '../../components/container/main'
import { motion } from 'framer-motion'

interface Review {
  id: number
  name: string
  avatar: string | null
  raiting: number
  description: string
}

interface User {
  id: number
  name: string
  surname: string
  experience: number
  avatar: string
  job: string
  status: boolean
  wish: boolean
  review: Review[]
}

export default function Page() {
  const { users, getUsers, changeWishStatus } = useZapros()

  const handleAddToWishlist = (el: User) => {
    const user: User = {
      ...el,
      wish: !el.wish
    }
    changeWishStatus(el.id, user)
  }

  const rating = (reviews: Review[] = []) => {
    if (!reviews.length) return 0
    const total = reviews.reduce((acc, curr) => acc + (curr.raiting || 0), 0)
    return total / reviews.length
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Main>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'
      >
        {users
          .filter((el: User) => el.wish === true)
          ?.map((el: User) => (
            <motion.div
              key={el.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 10px 25px rgba(157, 23, 77, 0.15)'
              }}
              transition={{ duration: 0.3 }}
              className='bg-gradient-to-br from-[#fdf2f8] to-[#fae8ff] border border-[#e9d5ff] rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group'
            >
              {/* Статус */}
              <div
                className={`absolute top-3 left-3 text-xs font-semibold ${
                  el.status ? 'bg-[#10b981]' : 'bg-[#ef4444]'
                } text-white rounded-full px-3 py-1 z-10 shadow-sm`}
              >
                {el.status ? 'Свободен' : 'Занят'}
              </div>

              {/* Избранное */}
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="absolute top-3 right-3 z-10"
                onClick={() => handleAddToWishlist(el)}
              >
                {el.wish ? (
                  <StarIcon className="text-[#eab308] text-2xl drop-shadow-md" />
                ) : (
                  <StarBorderIcon className="text-[#d8b4fe] text-2xl group-hover:text-[#eab308] transition-colors duration-300" />
                )}
              </motion.div>

              {/* Аватар */}
              <div className="flex justify-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden ring-2 ring-[#f3e8ff] group-hover:ring-[#e9d5ff] transition-all"
                >
                  <Image
                    src={el.avatar || avatar}
                    alt="avatar"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* Информация */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#6b21a8] mb-2">
                  {el.surname} {el.name}
                </h3>
                
                <div className="flex flex-col gap-1 mb-3">
                  <p className="text-sm text-[#9333ea] font-medium">
                    {el.job}
                  </p>
                  <p className="text-sm text-[#7e22ce] bg-[#f3e8ff] px-3 py-1 rounded-full inline-block">
                    {el.experience} {el.experience === 1 ? 'год' : 'года'} опыта
                  </p>
                </div>

                <div className="flex justify-center mb-3">
                  <StarRatings
                    rating={rating(el.review)}
                    starRatedColor="#eab308"
                    starEmptyColor="#e9d5ff"
                    numberOfStars={5}
                    starDimension="18px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>

                {/* Эффект при наведении */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#fae8ff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
      </motion.section>
    </Main>
  )
}