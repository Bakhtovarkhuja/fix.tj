import { Box, Container, Grid, Typography, Link as MuiLink, IconButton } from "@mui/material"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#1f2937", color: "#f3f4f6", py: 6 }}>
      <Container maxWidth="lg">
          {/* Company Info */}
            <Typography variant="h4" component="h3" sx={{ fontWeight: "bold", color: "#2563eb", mb: 2 }}>
              МастерСервис
            </Typography>
				<div className='flex justify-between'>
	<div className='w-[40%]'>
<Typography variant="h6" component="h4" sx={{ color: "white", mb: 2, fontWeight: 600 }}>
              МастерСервис
            </Typography>
            <Typography variant="body1" sx={{ color: "#9ca3af", mb: 2, lineHeight: 1.6 }}>
              Лучшая платформа для поиска квалифицированных мастеров. Мы соединяем клиентов с проверенными специалистами
              для решения любых бытовых задач.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton sx={{ color: "#9ca3af", "&:hover": { color: "#2563eb", backgroundColor: "#374151" } }}>
                <Facebook size={20} />
              </IconButton>
              <IconButton sx={{ color: "#9ca3af", "&:hover": { color: "#2563eb", backgroundColor: "#374151" } }}>
                <Instagram size={20} />
              </IconButton>
              <IconButton sx={{ color: "#9ca3af", "&:hover": { color: "#2563eb", backgroundColor: "#374151" } }}>
                <Twitter size={20} />
              </IconButton>
            </Box>
	</div>
	<div className='30%'>

            <Typography variant="h6" component="h4" sx={{ color: "white", mb: 2, fontWeight: 600 }}>
              Быстрые ссылки
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/" passHref>
                
                  Главная
                
              </Link>
              <Link href="/products" passHref>
                
                  Запчасти
                
              </Link>
              <Link href="/about" passHref>
                
                  О нас
                
              </Link>
              <Link href="/favorites" passHref>
                
                  Избранное
                
              </Link>
              <Link href="/orders" passHref>
                
                  Мои заказы
                
              </Link>
            </Box>
	</div>
	<div className='w-[30%]'>

            <Typography variant="h6" component="h4" sx={{ color: "white", mb: 2, fontWeight: 600 }}>
              Поддержка
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              
                Помощь
              
              
                Контакты
              
              
                Политика конфиденциальности
              
              
                Условия использования
              
              
                FAQ
              
            </Box>
	</div>
				</div>

        <Box sx={{ borderTop: "1px solid #374151", mt: 4, pt: 4, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#9ca3af" }}>
            © 2024 МастерСервис. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
