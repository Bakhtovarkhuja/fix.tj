"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
} from "@mui/material"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"
import useZapros from '@/app/store/zapros'

export default function LoginPage() {
  const { login } = useZapros()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setIsLoading(true)

  try {
    const user = {
      email,
      password
    }

    const res = await login(user)
    
    if (res === undefined) {
      router.push("/")
    } else {
      setError("Неверный логин или пароль")
    }

  } catch (err) {
    setError("Ошибка при входе")
  } finally {
    setIsLoading(false)
  }
}


  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", py: 4 }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#2563eb", mb: 2 }}>
              МастерСервис
            </Typography>
          </Link>
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#1f2937", mb: 1 }}>
            Вход в систему
          </Typography>
          <Typography variant="body1" sx={{ color: "#6b7280" }}>
            Войдите в свой аккаунт для доступа к сервису
          </Typography>
        </Box>

        <Card sx={{ boxShadow: 3, borderRadius: 3, border: "1px solid #e5e7eb" }}>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Email Field */}
                <TextField
                  fullWidth
                  name='email'
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} color="#6b7280" />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  label="Пароль"
                  name='password'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} color="#6b7280" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Remember Me & Forgot Password */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Запомнить меня"
                  />
                  <Link href="#" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#2563eb",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Забыли пароль?
                    </Typography>
                  </Link>
                </Box>

                {/* Login Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  {isLoading ? "Вход..." : "Войти"}
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" sx={{ color: "#6b7280", px: 2 }}>
                    Или
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body1" sx={{ color: "#1f2937" }}>
                    Нет аккаунта?{" "}
                    <Link href="/auth/register" style={{ textDecoration: "none" }}>
                      <Typography
                        component="span"
                        sx={{
                          color: "#2563eb",
                          fontWeight: 600,
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        Зарегистрироваться
                      </Typography>
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                "&:hover": { color: "#2563eb", textDecoration: "underline" },
              }}
            >
              ← Вернуться на главную
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}
