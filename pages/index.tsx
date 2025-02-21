import Head from 'next/head';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ProductScroll from '../components/ProductScroll';
import DiagonalSection from '../components/DiagonalSection';
import { ProfileSection } from '../components/ProfileSection';
import SkillsCarousel from '../components/SkillsCarousel';

const HomePage = () => {
  const { scrollY } = useScroll();
  const coverY = useTransform(scrollY, [0, 800], [0, 300], { clamp: false });
  const scrollOpacity = useTransform(scrollY, [0, 700], [1, 0], { clamp: true });

  const scrollToProfile = () => {
    const profileSection = document.getElementById('profile-section');
    profileSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <HeroSection>
      <Head>
        <title>Roughfts Tech Platform</title>
      </Head>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Welcome to Roughfts
        </motion.h1>
        <motion.div style={{ y: coverY, position: 'absolute', width: '100%', height: '100%' }}>
          <CoverImage src="/assets/cover.jpeg" alt="Cover" />
        </motion.div>
        <ScrollButton style={{ opacity: scrollOpacity }} onClick={scrollToProfile}>
          <span>Scroll Down</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            ↓
          </motion.div>
        </ScrollButton>
      </HeroSection>

      <ProfileSection id="profile-section" />
      <ProductScroll />
      <DiagonalSection />
      <SkillsCarousel />
      <ContactSection>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2>Let's Connect</h2>
          <ContactInfo>
            <p>Interested in collaboration or have a project in mind?</p>
            <ContactLinks>
              <a href="https://github.com/Stasshe" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <span>•</span>
              <a href="mailto:egnm9stasshe@gmail.com">Email</a>
            </ContactLinks>
          </ContactInfo>
        </motion.div>
      </ContactSection>
    </Layout>
  );
};

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  h1 {
    font-size: 4rem;
    color: white;
    z-index: 2;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

const CoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  will-change: transform;
`;

const ScrollButton = styled(motion.button)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  
  span {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.8rem;
  }
`;

const ContactSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  color: white;
  margin: 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  text-align:center;
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
  margin-right:auto;
  margin-left:auto;
  text-align:center;
  
  p {
    font-size: 1.2rem;
    opacity: 0.8;
    margin-bottom: 2rem;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  text-align:center;
  margin-left:auto;
  margin-right:auto;
  width:60vw;
  
  a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    transition: opacity 0.3s;
    
    &:hover {
      opacity: 0.7;
    }
  }

  span {
    opacity: 0.5;
  }
`;

export default HomePage;
