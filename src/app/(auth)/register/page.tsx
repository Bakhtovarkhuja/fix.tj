"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import useZapros from '@/app/store/zapros'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
	const router = useRouter()
	const { register } = useZapros()
  const [role, setRole] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    experience: "",
    profession: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (formData.password !== formData.confirmPassword) {
			console.log('error');
			return
		}

		let newUser = null

		if (role === 'master') {
			newUser = {
				name: formData.name,
				surname: formData.surname,
				email: formData.email,
				number: formData.phone,
				role: role,
				password: formData.password,
				job: formData.profession,
				status: true,
				avatar: null,
				wish: false,
				raiting: 0,
				country: formData.country,
            experience: formData.experience,
				order: false,
				comment: []
			}
		} else {
			newUser = {
				name: formData.name,
				surname: formData.surname,
				email: formData.email,
				number: formData.phone,
				role: role,
				password: formData.password,
				avatar: null,
			}
		}

		const res = await register(newUser)

		if (res === undefined) {
			router.push('/login')
		}
	}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Эҷоди ҳисоб</CardTitle>
          <CardDescription>Ба FIX.TJ ҳамроҳ шавед ва бо мутахассисон пайваст шавед</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className='flex flex-col gap-[5px]'>
                <Label htmlFor="name">Ном</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className='flex flex-col gap-[5px]'>
                <Label htmlFor="surname">Насаб</Label>
                <Input
                  id="surname"
                  type="text"
                  value={formData.surname}
                  onChange={(e) => handleInputChange("surname", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='flex flex-col gap-[5px]'>
              <Label htmlFor="email">Почтаи электронӣ</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col gap-[5px]'>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col gap-[5px]'>
              <Label htmlFor="role">Нақш</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger className='w-[100%]'>
                  <SelectValue placeholder="Нақши худро интихоб кунед" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Корбар</SelectItem>
                  <SelectItem value="master">Усто</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === "master" && (
              <>
                <div className='flex flex-col gap-[5px]'>
                  <Label htmlFor="country">Кишвар</Label>
                  <Input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    placeholder="масалан, Тоҷикистон"
                    required
                  />
                </div>

                <div className='flex flex-col gap-[5px]'>
                  <Label htmlFor="experience">Таҷриба</Label>
                  <Input
                    id="experience"
                    type="text"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    placeholder="масалан, 5 сол"
                    required
                  />
                </div>

                <div className='flex flex-col gap-[5px]'>
                  <Label htmlFor="profession">Касб</Label>
                  <Select
                    value={formData.profession}
                    onValueChange={(value) => handleInputChange("profession", value)}
                    required
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Касби худро интихоб кунед" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrician">Барқкаш</SelectItem>
                      <SelectItem value="plumber">Лӯлакаш</SelectItem>
                      <SelectItem value="carpenter">Наҷҷор</SelectItem>
                      <SelectItem value="mechanic">Механик</SelectItem>
                      <SelectItem value="painter">Рангрез</SelectItem>
                      <SelectItem value="cleaner">Тозакунанда</SelectItem>
                      <SelectItem value="gardener">Боғбон</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className='flex flex-col gap-[5px]'>
              <Label htmlFor="password">Рамз</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col gap-[5px]'>
              <Label htmlFor="confirmPassword">Тасдиқи рамз</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
              Эҷоди ҳисоб
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Аллакай ҳисоб доред?{" "}
                <Link href="/login" className="text-red-500 hover:text-red-600 font-medium">
                  Ворид шудан
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
