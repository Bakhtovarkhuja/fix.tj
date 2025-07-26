import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from "@mui/material"
import { People, EmojiEvents, Schedule, Security } from "@mui/icons-material"

export default function AboutPage() {
  return (
    <Box>
      
      <Container>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: "bold", color: "#1f2937", mb: 3 }}>
            О МастерСервис
          </Typography>
          <Typography variant="h5" sx={{ color: "#6b7280", maxWidth: "800px", mx: "auto", lineHeight: 1.6 }}>
            Мы создали платформу, которая соединяет людей с квалифицированными мастерами для решения любых бытовых задач
            быстро, качественно и по справедливой цене.
          </Typography>
        </Box>

        {/* Stats */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            { icon: People, number: "1000+", text: "Проверенных мастеров" },
            { icon: EmojiEvents, number: "50000+", text: "Выполненных заказов" },
            { icon: Schedule, number: "24/7", text: "Поддержка клиентов" },
            { icon: Security, number: "100%", text: "Гарантия качества" },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: "center", p: 3, borderRadius: 3, border: "1px solid #e5e7eb" }}>
                <Avatar
                  sx={{
                    backgroundColor: "#2563eb",
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <stat.icon sx={{ fontSize: 32, color: "white" }} />
                </Avatar>
                <Typography variant="h3" sx={{ fontWeight: "bold", color: "#1f2937", mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" sx={{ color: "#6b7280" }}>
                  {stat.text}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Mission */}
        <Card sx={{ mb: 6, borderRadius: 3, border: "1px solid #e5e7eb" }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: "bold", color: "#1f2937", mb: 3, textAlign: "center" }}
            >
              Наша миссия
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#6b7280", textAlign: "center", lineHeight: 1.8, maxWidth: "900px", mx: "auto" }}
            >
              Сделать поиск и заказ услуг мастеров максимально простым и удобным. Мы верим, что каждый человек
              заслуживает качественного сервиса по справедливой цене, а каждый мастер — возможности развивать свой
              бизнес и находить новых клиентов.
            </Typography>
          </CardContent>
        </Card>

        {/* How it works */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: "bold", color: "#1f2937", mb: 4, textAlign: "center" }}
          >
            Как это работает
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                step: "1",
                title: "Найдите мастера",
                description: "Используйте фильтры для поиска подходящего специалиста по вашим критериям",
              },
              {
                step: "2",
                title: "Оформите заказ",
                description: "Свяжитесь с мастером, обсудите детали и оформите заказ на удобное время",
              },
              {
                step: "3",
                title: "Получите результат",
                description: "Мастер выполнит работу качественно и в срок. Оставьте отзыв о работе",
              },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    sx={{
                      backgroundColor: "#f3f4f6",
                      color: "#2563eb",
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                      fontSize: "2rem",
                      fontWeight: "bold",
                      border: "2px solid #e5e7eb",
                    }}
                  >
                    {item.step}
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: "#1f2937", mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#6b7280", lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Values */}
        <Card sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: "bold", color: "#1f2937", mb: 4, textAlign: "center" }}
            >
              Наши ценности
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: "Качество",
                  description: "Мы тщательно проверяем каждого мастера и следим за качеством выполняемых работ",
                },
                {
                  title: "Надежность",
                  description: "Все мастера проходят верификацию, а платформа гарантирует безопасность сделок",
                },
                {
                  title: "Прозрачность",
                  description: "Честные отзывы, прозрачное ценообразование и открытая информация о мастерах",
                },
                {
                  title: "Удобство",
                  description: "Простой и интуитивный интерфейс, быстрый поиск и удобное оформление заказов",
                },
              ].map((value, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#1f2937", mb: 2 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#6b7280", lineHeight: 1.6 }}>
                      {value.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
