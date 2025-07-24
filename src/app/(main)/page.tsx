'use client'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import Main from '../components/container/main'
import useZapros from '@/app/store/zapros'
import { useEffect } from 'react'
import avatar from '@/app/assets/avatar.png'
import Image from 'next/image'
import StarRatings from 'react-star-ratings'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { useRouter } from 'next/navigation'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
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
  number: number
  email: string
  raiting: number
  job: string
  status: boolean
  avatar: string
  review: Review[]
  role: string
  experience: number
  wish: boolean
}

export default function Home() {
  const router = useRouter()
  const { users, getUsers, changeWishStatus } = useZapros()

  const handleProfileById = (id: number) => {
    router.push(`/${id}`)
  }

  const handleAddToWishlist = (el: User) => {
    const user: User = {
      ...el,
      wish: !el.wish,
    }
    changeWishStatus(el.id, user)
  }

  const rating = (reviews: Review[] = []): number => {
    if (!reviews.length) return 0
    const total = reviews.reduce((acc, curr) => acc + (curr.raiting || 0), 0)
    return total / reviews.length
  }

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <Main>
      <section className="flex flex-col md:flex-row gap-6 md:gap-8 items-start p-4 bg-gradient-to-b">
        <aside className="w-full md:w-[25%] sticky top-4">
          <Accordion
            sx={{
              boxShadow: '0 4px 20px rgba(157, 23, 77, 0.1)',
              borderRadius: '14px',
              overflow: 'hidden',
              background: 'rgba(253, 242, 248, 0.7)',
              backdropFilter: 'blur(10px)',
              '&:before': { display: 'none' },
              border: '1px solid rgba(236, 72, 153, 0.2)',
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ color: '#9D174D', fontSize: '1.5rem' }} />
              }
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                py: 1.5,
                px: 3,
                minHeight: 'unset',
                '& .MuiAccordionSummary-content': {
                  margin: '8px 0',
                },
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontWeight: 700,
                  color: '#9D174D',
                  fontSize: '1.1rem',
                  letterSpacing: '0.5px',
                }}
              >
                Фильтры
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: '16px 24px',
              }}
            >
              <div className="flex flex-col gap-3">
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#9D174D', 
                    mb: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  Опыт работы
                </Typography>
                {[1, 2, 3, 4, 5, 6].map((years) => (
                  <motion.div
                    key={years}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 cursor-pointer py-1"
                  >
                    <div className="w-5 h-5 rounded-md border-2 border-[#9D174D] flex items-center justify-center transition-all">
                      <div className="w-3 h-3 rounded-sm bg-[#9D174D] transition-all"></div>
                    </div>
                    <span className="text-[#6b21a8] font-medium">
                      {years} {years === 1 ? 'год' : 'года'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </aside>

        {/* Карточки мастеров */}
        <aside className="w-full md:w-[75%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users
            .filter((el: User) => el.role === 'master')
            .map((el: User) => (
              <motion.div
                key={el.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 10px 25px rgba(157, 23, 77, 0.15)'
                }}
                className="bg-white rounded-xl p-5 shadow-sm border border-[#f3e8ff] hover:border-[#e9d5ff] transition-all duration-300 relative overflow-hidden group"
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
                  className="absolute top-3 right-3 z-10 cursor-pointer"
                  onClick={() => handleAddToWishlist(el)}
                >
                  {el.wish ? (
                    <StarIcon className="text-[#eab308] text-2xl drop-shadow-md" />
                  ) : (
                    <StarBorderIcon className="text-[#d8b4fe] text-2xl group-hover:text-[#eab308] transition-colors duration-300" />
                  )}
                </motion.div>

                {/* Аватар */}
                <div className="flex flex-col items-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden cursor-pointer ring-2 ring-[#f3e8ff] group-hover:ring-[#e9d5ff] transition-all"
                    onClick={() => handleProfileById(el.id)}
                  >
                    <Image
                      src={el.avatar || avatar}
                      alt="avatar"
                      fill
                      className="object-cover"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(107, 33, 168, 0.2))' }}
                    />
                  </motion.div>
                </div>

                {/* Информация */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#6b21a8] mb-1">
                    {el.surname} {el.name}
                  </h3>
                  <p className="text-sm text-[#9333ea] mb-2 font-medium">
                    {el.job}
                  </p>
                  
                  <div className="flex justify-center items-center gap-1 mb-3">
                    <StarRatings
                      rating={rating(el.review)}
                      starRatedColor="#eab308"
                      starEmptyColor="#e9d5ff"
                      numberOfStars={5}
                      starDimension="18px"
                      starSpacing="2px"
                      name="rating"
                    />
                    <span className="text-xs text-[#9333ea] ml-1 font-medium">
                      ({el.review?.length || 0} отзывов)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm px-4 mt-4">
                    <span className="text-[#7e22ce] font-semibold bg-[#f3e8ff] px-3 py-1 rounded-full">
                      {el.experience} {el.experience === 1 ? 'год' : 'года'}
                    </span>
                    <span className="text-[#7e22ce] font-semibold">
                      {el.number}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#fae8ff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
        </aside>
      </section>
    </Main>
  )
}