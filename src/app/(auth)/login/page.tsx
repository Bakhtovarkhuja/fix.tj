'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import RegisterLayout from '../layout'
import Link from 'next/link'
import useZapros from '@/app/store/zapros'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import EmailOutlineIcon from '@mui/icons-material/EmailOutlined'
import LockOutlineIcon from '@mui/icons-material/LockOutlined'

export default function Page() {
  const router = useRouter()
  const { login } = useZapros()
  const [email, setEmail] = useState('')
  const [pas, setPas] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = {
      email,
      password: pas,
    }
    login(formData)
    router.push('/')
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
          className="bg-white border border-[#e9d5ff] rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-[#6b21a8] text-center mb-6">
            Вход в аккаунт
          </h2>

          {/* Поля формы */}
          <div className="space-y-5">
            <div className="flex flex-col gap-1">
              <label className="text-[#6b21a8] font-medium flex items-center gap-2">
                <EmailOutlineIcon fontSize="small" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="border border-[#e9d5ff] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e9d5ff] transition-all"
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPas(e.target.value)}
                className="border border-[#e9d5ff] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e9d5ff] transition-all"
                required
              />
            </div>
          </div>

          {/* Кнопки */}
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#9D174D] text-white py-3 rounded-lg hover:bg-[#7e22ce] transition-colors shadow-md font-medium"
            >
              Войти
            </motion.button>

            <div className="flex justify-between items-center">
              <Link href="/forgot-password">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-[#9333ea] text-sm hover:underline"
                >
                  Забыли пароль?
                </motion.div>
              </Link>

              <div className="flex items-center gap-1 text-sm">
                <span className="text-[#6b21a8]">Нет аккаунта?</span>
                <Link href="/register">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-[#7e22ce] font-semibold hover:underline"
                  >
                    Регистрация
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </RegisterLayout>
  )
}