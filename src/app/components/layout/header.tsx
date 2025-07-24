'use client'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import Image from 'next/image'
import Main from '../container/main'
import logo from '../../assets/logo.png'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState, MouseEvent } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import StarIcon from '@mui/icons-material/Star'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    localStorage.removeItem('access_token')
  }

  return (
    <header className="bg-gradient-to-r from-[#9D174D] to-[#7e22ce] w-full py-3 fixed top-0 left-0 z-50 shadow-xl">
      <Main>
        <nav className="flex items-center justify-between text-white">
          {/* Логотип с анимацией */}
          <Link href={'/'} className="group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Image 
                src={logo} 
                alt="logo" 
                width={130} 
                height={40}
                className="transition-all duration-300 drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-[#9D174D]/0 group-hover:bg-[#9D174D]/10 rounded-full transition-all duration-300" />
            </motion.div>
          </Link>
          
          {/* Навигационные ссылки */}
          <div className="hidden md:flex items-center gap-8 text-base font-medium">
            <Link href={'/'}>
              <motion.p 
                whileHover={{ y: -2 }}
                className="cursor-pointer hover:underline hover:text-[#FFD6E7] transition-all duration-200 px-2 py-1 rounded-lg hover:bg-white/10"
              >
                Главная
              </motion.p>
            </Link>
            <Link href={'/products'}>
              <motion.p 
                whileHover={{ y: -2 }}
                className="cursor-pointer hover:underline hover:text-[#FFD6E7] transition-all duration-200 px-2 py-1 rounded-lg hover:bg-white/10"
              >
                Товары
              </motion.p>
            </Link>
            <Link href={'/about'}>
              <motion.p 
                whileHover={{ y: -2 }}
                className="cursor-pointer hover:underline hover:text-[#FFD6E7] transition-all duration-200 px-2 py-1 rounded-lg hover:bg-white/10"
              >
                О нас
              </motion.p>
            </Link>
          </div>
          
          {/* Иконки действий */}
          <div className="flex items-center gap-4">
            {/* Поиск с анимацией */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-sm border border-[#e9d5ff]/40 hover:border-[#e9d5ff]/80 transition-all duration-300"
            >
              <SearchIcon className="text-white/90" />
              <input
                type="search"
                className="outline-none bg-transparent placeholder:text-white/80 w-24 text-sm focus:w-32 transition-all duration-300"
                placeholder="Поиск..."
              />
            </motion.div>
            
            {/* Корзина с индикатором */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer p-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              <ShoppingCartIcon className="text-white hover:text-[#FFD6E7]" />
              <span className="absolute -top-1 -right-1 bg-[#FFD6E7] text-[#9D174D] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                3
              </span>
            </motion.div>
            
            {/* Избранное */}
            <Link href={'/wishlist'}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                <StarIcon className="text-white hover:text-[#FFD6E7]" />
              </motion.div>
            </Link>
            
            {/* Меню пользователя */}
            <motion.div
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <MoreVertIcon
                className="cursor-pointer text-white hover:text-[#FFD6E7] transition-all duration-200  rounded-full hover:bg-white/10"
                onClick={handleClick}
              />
            </motion.div>
            
            {/* Выпадающее меню */}
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                sx: {
                  bgcolor: 'rgba(253, 242, 248, 0.95)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(157, 23, 77, 0.3)',
                  overflow: 'hidden',
                  py: 0,
                  border: '1px solid rgba(255, 214, 231, 0.3)',
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{
                  color: '#9D174D',
                  py: 1.5,
                  px: 3,
                  borderBottom: '1px solid rgba(157, 23, 77, 0.1)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    transform: 'translateX(3px)'
                  }
                }}
              >
                <div className="flex gap-3 items-center">
                  <PersonIcon sx={{ color: '#9D174D', fontSize: '1.3rem' }} />
                  <p className="font-semibold">Профиль</p>
                </div>
              </MenuItem>
              <Link href={'/register'}>
                <MenuItem
                  onClick={() => {
                    handleClose()
                    handleLogOut()
                  }}
                  sx={{
                    color: '#9D174D',
                    py: 1.5,
                    px: 3,
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.7)',
                      transform: 'translateX(3px)'
                    }
                  }}
                >
                  <div className="flex gap-3 items-center">
                    <LogoutIcon sx={{ color: '#9D174D', fontSize: '1.3rem' }} />
                    <p className="font-semibold">Выйти</p>
                  </div>
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </nav>
      </Main>
    </header>
  )
}