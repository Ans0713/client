import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { School, Group } from "@mui/icons-material";
import imgSrc from '../../imgs/img3.png';
// import './CardSection';
import './Courses.css';

// Styled components
const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: `
    0 8px 16px rgba(0, 0, 0, 0.1),   // Larger shadow for depth
    0 4px 8px rgba(0, 0, 0, 0.1),    // Secondary shadow for added softness
    0 2px 4px rgba(0, 0, 0, 0.06)`,   // Subtle shadow for further softening
  borderBottom: '1px solid #E5E7EB', // Light grey border
}));



const NavButton = styled(Button)(({ theme }) => ({
  color: '#2B2B2B', // Dark color for the buttons
  fontWeight: 500, // Match font weight in the image
  fontSize: '14px',
  marginRight: theme.spacing(2),
  textTransform: 'none', // Ensure the text is not all uppercase
  '&:hover': {
    backgroundColor: 'transparent', // No background color on hover
  },
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px', // Rounded search bar
    paddingRight: theme.spacing(1),
    backgroundColor: '#f1f3f4', // Light grey background
    borderColor: '#E5E7EB',
  },
  '& .MuiInputAdornment-root': {
    color: '#6B7280', // Lighter icon color
  },
}));

const Hero = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(8, 0, 6),
  position: 'relative',
  width: '100vw', // Full width
  height: 'calc(100vh - 100px)', // Full height minus AppBar height
  marginTop:'50%',
  display: 'flex',
  alignItems: 'center', // Center content vertically
  justifyContent: 'center', // Center content horizontally
}));

const HeroContent = styled('div')({
  textAlign: 'left', // Left-align text
  zIndex: 1, // Ensure text is above the image overlay
  padding: '20px', // Optional: add some padding
});

const HeroImage = styled('div')(({ theme }) => ({
  position: 'absolute', // Use absolute positioning
  right: '150px', // Align to the right
  top: '50%', // Center vertically
  transform: 'translateY(-50%)', // Adjust to perfectly center
  width: '400px', // Adjust the width as needed
  height: '400px', // Adjust the height as needed
  borderRadius: '50%', // Round image
  backgroundImage: `url(${imgSrc})`, // Use the imported image
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: 0, // Ensure image is behind the text
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: '#00a651', // Match the button color from the image
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: '#008a4b', // Darker green on hover
  },
}));

const FreeSampleLink = styled('a')(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));

const CoursesSection = styled('section')(({ theme }) => ({
  padding: theme.spacing(6, 0),
  textAlign: 'center',
  backgroundColor: '#F5F7FA', // Light lemon green background
  borderRadius: '8px', // Add rounded corners
  height:'70%',
  // margin: theme.spacing(4, 0), // Add margin to separate from hero section
}));


const HorizontalCourseCard = styled('div')(({ theme }) => ({
  border: '1px solid transparent', // Start with a transparent border
  borderRadius: '8px',
  padding: theme.spacing(2),
  margin: theme.spacing(2, 10),
  display: 'flex', // Change to flexbox for horizontal layout
  alignItems: 'center',
  width: '100%', // Full width
  maxWidth: '600px', // Max width of each card
  height: '150px', // Set height to create a horizontal rectangle
  backgroundColor: 'transparent', // Start with transparent background
  boxShadow: 'none', // No shadow initially
  transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s, border-color 0.3s', // Add transition for background color and border
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    border: '1px solid #E5E7EB', // Show border on hover
    backgroundColor: '#ffffff', // Show background color on hover
  },
}));



const CircularCourseImage = styled('img')({
  width: '100px', // Set image width
  height: '100px', // Set image height
  borderRadius: '50%', // Make image circular
  marginRight: '20px', // Space between image and text
  objectFit: 'cover',
});

const CourseCardTextContent = styled('div')({
  flex: 1, // Allow text to take remaining space
});

const CourseCardTitle = styled('h3')({
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '5px',
});

const CourseCardDescription = styled('p')({
  fontSize: '14px',
  color: '#666',
});



function App() {
  return (
    <Root>
      {/* Custom App Bar */}
      <CustomAppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#000', fontWeight: 'bold' }}>
              Max<span style={{ color: '#00a651' }}>Coach</span> {/* Styled logo */}
            </Typography>
            <NavButton>Home</NavButton>
            <NavButton>Pages</NavButton>
            <NavButton>Courses</NavButton>
            <NavButton>Features</NavButton>
            <NavButton>Blog</NavButton>
            <NavButton>Shop</NavButton>
            <SearchInput
              variant="outlined"
              size="small"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ ml: 2, width: '200px' }} // Adjust width as needed
            />
          </Toolbar>
        </Container>
      </CustomAppBar>

      {/* Hero Section */}
      <Hero>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center"> {/* Adjust alignment */}
            <Grid item xs={12} md={6}>
              <HeroContent>
                <Typography variant="h3" component="h1" gutterBottom>
                  Distant learning for further expansion
                </Typography>
                <Typography variant="body1" paragraph>
                  Learning is a life-long journey that in fact we never find the
                  terminate stop. Stop searching, enjoy the process.
                </Typography>
                <DownloadButton variant="contained" size="large">
                  Download free guide
                </DownloadButton>
                <Typography variant="body2" mt={2}>
                  Have questions?{' '}
                  <FreeSampleLink href="#">
                    Get Free Sample →
                  </FreeSampleLink>
                </Typography>
              </HeroContent>
            </Grid>
            <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
              <HeroImage />
            </Grid>
          </Grid>
        </Container>
      </Hero>

      <CoursesSection>
  <Typography variant="h4" gutterBottom>
    Stimulated to learn?
  </Typography>
  <Typography variant="h5" gutterBottom>
    Featured Online Courses
  </Typography>
  {/* First row */}
  <Grid container spacing={2} justifyContent="center">
  {/* First Row */}
  <Grid item xs={12} sm={6} md={6}>
    <HorizontalCourseCard>
      <CircularCourseImage src="https://picsum.photos/100" alt="Course" />
      <CourseCardTextContent>
        <Typography variant="body2">Free</Typography>
        <CourseCardTitle>
          Personal Finance: Financial Security Thinking & Principles
        </CourseCardTitle>
        <Grid container alignItems="center">
          <Grid item xs={6} container alignItems="center">
            <School fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              2 Lessons
            </Typography>
          </Grid>
          <Grid item xs={6} container alignItems="center">
            <Group fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              326 Students
            </Typography>
          </Grid>
        </Grid>
      </CourseCardTextContent>
    </HorizontalCourseCard>
  </Grid>

  <Grid item xs={12} sm={6} md={6}>
    <HorizontalCourseCard>
      <CircularCourseImage src="https://picsum.photos/100" alt="Course" />
      <CourseCardTextContent>
        <Typography variant="body2">Free</Typography>
        <CourseCardTitle>
          Learning to Write as a Professional Author
        </CourseCardTitle>
        <Grid container alignItems="center">
          <Grid item xs={6} container alignItems="center">
            <School fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              20 Lessons
            </Typography>
          </Grid>
          <Grid item xs={6} container alignItems="center">
            <Group fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              81 Students
            </Typography>
          </Grid>
        </Grid>
      </CourseCardTextContent>
    </HorizontalCourseCard>
  </Grid>

  {/* Second Row */}
  <Grid item xs={12} sm={6} md={6}>
    <HorizontalCourseCard>
      <CircularCourseImage src="https://picsum.photos/100" alt="Course" />
      <CourseCardTextContent>
        <Typography variant="body2">$19.0</Typography>
        <CourseCardTitle>
          Customer-centric Info-Tech Strategies
        </CourseCardTitle>
        <Grid container alignItems="center">
          <Grid item xs={6} container alignItems="center">
            <School fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              24 Lessons
            </Typography>
          </Grid>
          <Grid item xs={6} container alignItems="center">
            <Group fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              972 Students
            </Typography>
          </Grid>
        </Grid>
      </CourseCardTextContent>
    </HorizontalCourseCard>
  </Grid>

  <Grid item xs={12} sm={6} md={6}>
    <HorizontalCourseCard>
      <CircularCourseImage src="https://picsum.photos/100" alt="Course" />
      <CourseCardTextContent>
        <Typography variant="body2">Free</Typography>
        <CourseCardTitle>
          Academic Listening and Note-taking
        </CourseCardTitle>
        <Grid container alignItems="center">
          <Grid item xs={6} container alignItems="center">
            <School fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              14 Lessons
            </Typography>
          </Grid>
          <Grid item xs={6} container alignItems="center">
            <Group fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              73 Students
            </Typography>
          </Grid>
        </Grid>
      </CourseCardTextContent>
    </HorizontalCourseCard>
  </Grid>

  {/* Third Row */}
  <Grid item xs={12} sm={6} md={6}>
    <HorizontalCourseCard>
      <CircularCourseImage src="https://picsum.photos/100" alt="Course" />
      <CourseCardTextContent>
        <Typography variant="body2">$19.0</Typography>
        <CourseCardTitle>
          Open Programming Courses for Everyone: Python
        </CourseCardTitle>
        <Grid container alignItems="center">
          <Grid item xs={6} container alignItems="center">
            <School fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              17 Lessons
            </Typography>
          </Grid>
          <Grid item xs={6} container alignItems="center">
            <Group fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              66 Students
            </Typography>
          </Grid>
        </Grid>
      </CourseCardTextContent>
    </HorizontalCourseCard>
  </Grid>

  <Grid item xs={12} sm={6} md={6}>
    <HorizontalCourseCard>
      <CircularCourseImage src="https://picsum.photos/100" alt="Course" />
      <CourseCardTextContent>
        <Typography variant="body2">Free</Typography>
        <CourseCardTitle>
          Academic Listening and Note-taking
        </CourseCardTitle>
        <Grid container alignItems="center">
          <Grid item xs={6} container alignItems="center">
            <School fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              14 Lessons
            </Typography>
          </Grid>
          <Grid item xs={6} container alignItems="center">
            <Group fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              73 Students
            </Typography>
          </Grid>
        </Grid>
      </CourseCardTextContent>
    </HorizontalCourseCard>
  </Grid>

 </Grid>
  </CoursesSection>

    </Root>
 


//   Recommended Learning Paths
// </Typography>
//           <Typography
//             variant="body1"
//             component="p"
//             align="center"
//             sx={{ mt: 2 }}
//           >
//             Reach your learning goals with hand-picked sequential classes
//           </Typography>
//         </Box>
//         <Grid container spacing={3} sx={{ mt: 4 }}>
//   {[
//     { title: "Animation", image: "https://picsum.photos/600/300" },
//     { title: "Creative Writing", image: "https://picsum.photos/600/300" },
//     { title: "Film & Video", image: "https://picsum.photos/600/300" },
//     { title: "Graphic Design", image: "https://picsum.photos/600/300" },
//     { title: "Illustration", image: "https://picsum.photos/600/300" },
//     { title: "Music", image: "https://picsum.photos/600/300" },
//     { title: "Photography", image: "https://picsum.photos/600/300" },
//     { title: "UI/UX Design", image: "https://picsum.photos/600/300" },
//     { title: "Web Development", image: "https://picsum.photos/600/300" },
//     { title: "Business Analytics", image: "https://picsum.photos/600/300" },
//     { title: "Entrepreneurship", image: "https://picsum.photos/600/300" },
//   ].map((item, index) => (
//     <Grid item xs={12} md={4} key={index}>
//       <Card sx={{ position: 'relative' }}>
//         <CardMedia
//           component="img"
//           height="140"
//           image={item.image}
//           alt={item.title}
//         />
//         <Box
//           sx={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography
//             variant="h6"
//             component="h2"
//             sx={{ color: 'white', fontWeight: 'bold' }}
//           >
//             {item.title}
//           </Typography>
//         </Box>
//       </Card>
//     </Grid>
//   ))}
// </Grid>

// <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
//   <Button variant="contained" size="small">
//     All Learning Paths
//   </Button>
// </Box>

//       </Container>
//     </div>
  );
}

export default App;