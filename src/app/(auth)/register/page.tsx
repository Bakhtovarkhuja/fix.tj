'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useZapros from '@/app/store/zapros'
import RegisterLayout from '../layout'
import { motion } from 'framer-motion'
import Image from 'next/image'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import EmailOutlineIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlineIcon from '@mui/icons-material/PhoneOutlined'
import LockOutlineIcon from '@mui/icons-material/LockOutlined'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

export default function Page() {
  const router = useRouter()
  const { register } = useZapros()

  const [name, setName] = useState('')
  const [surName, setSurName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [pas, setPas] = useState('')
  const [role] = useState('user')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = {
      name,
      surname: surName,
      number,
      email,
      password: pas,
      avatar,
      role,
    }
    register(formData)
    router.push('/login')
  }

  return (
    <RegisterLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdf2f8] to-[#fae8ff] p-4"
      >
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white border border-[#e9d5ff] rounded-2xl shadow-lg p-8 w-full max-w-md space-y-5"
        >
          <h2 className="text-3xl font-bold text-[#6b21a8] text-center mb-6">
            Регистрация
          </h2>

          {/* Превью аватара */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full bg-[#f3e8ff] border-2 border-[#e9d5ff] flex items-center justify-center overflow-hidden">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Avatar Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <PersonOutlineIcon className="text-[#9D174D] text-4xl" />
              )}
            </div>
            <motion.label
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 px-4 py-2 bg-[#f3e8ff] text-[#6b21a8] rounded-lg cursor-pointer flex items-center gap-2 text-sm font-medium"
            >
              <AddAPhotoIcon fontSize="small" />
              <span>Загрузить фото</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </motion.label>
          </div>

          {/* Поля формы */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#6b21a8] font-medium flex items-center gap-2">
                <PersonOutlineIcon fontSize="small" />
                Имя
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border border-[#e9d5ff] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9d5ff] transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#6b21a8] font-medium flex items-center gap-2">
                <PersonOutlineIcon fontSize="small" />
                Фамилия
              </label>
              <input
                type="text"
                value={surName}
                onChange={e => setSurName(e.target.value)}
                className="border border-[#e9d5ff] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9d5ff] transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#6b21a8] font-medium flex items-center gap-2">
                <PhoneOutlineIcon fontSize="small" />
                Телефон
              </label>
              <input
                type="tel"
                value={number}
                onChange={e => setNumber(e.target.value)}
                className="border border-[#e9d5ff] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9d5ff] transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#6b21a8] font-medium flex items-center gap-2">
                <EmailOutlineIcon fontSize="small" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border border-[#e9d5ff] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9d5ff] transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#6b21a8] font-medium flex items-center gap-2">
                <LockOutlineIcon fontSize="small" />
                Пароль
              </label>
              <input
                type="password"
                value={pas}
                onChange={e => setPas(e.target.value)}
                className="border border-[#e9d5ff] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9d5ff] transition-all"
                required
              />
            </div>
          </div>

          {/* Кнопки */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#9D174D] text-white py-3 rounded-lg hover:bg-[#7e22ce] transition-colors shadow-md font-medium"
            >
              Зарегистрироваться
            </motion.button>

            <div className="flex justify-center">
              <Link href="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-[#9333ea] text-sm font-medium hover:underline flex items-center gap-1"
                >
                  Уже есть аккаунт? <span className="font-semibold">Войти</span>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </RegisterLayout>
  )
}