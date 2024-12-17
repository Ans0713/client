// src/App.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { Container } from '@mui/material';
import { Pagination } from 'swiper/modules'; 

SwiperCore.use([Pagination]);

// Testimonial Component
const Testimonial = ({ name, role, text, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Main Swiper Component
const TestimonialsSwiper = ({ testimonials }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      style={{ paddingBottom: '40px' }}
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <Testimonial {...testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

// Testimonials Data
const testimonials = [
  {
    name: "Florence Themes",
    role: "Multimedia Admin",
    text: "I'm a very strict person so I require everything to be organized and neat...",
    imageUrl: "https://picsum.photos/200/300"
  },
  {
    name: "Mina Hollace",
    role: "Freelancer",
    text: "I am free to learn at my own pace, follow my own schedule...",
    imageUrl: "https://picsum.photos/200/300?random=1"
  },
  {
    name: "Madley Pondor",
    role: "IT Specialist",
    text: "I need to get a certification for English proficiency and MaxCoach is my best choice...",
    imageUrl: "https://picsum.photos/200/300?random=2"
  }
];

// App Component
const App = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ marginY: 4 }}>
        Our top learners' verbatim
      </Typography>
      <TestimonialsSwiper testimonials={testimonials} />
    </Container>
  );
};

export default App;
