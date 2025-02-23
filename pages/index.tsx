import Head from 'next/head';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ProductScroll from '../components/ProductScroll';
import DiagonalSection from '../components/DiagonalSection';
import { ProfileSection } from '../components/ProfileSection';
import SkillsCarousel from '../components/SkillsCarousel';

const HomePage = () => {
  const { scrollY } = useScroll();
  // パララックス効果を強調
  const coverY = useTransform(scrollY, [0, 800], [0, 400], { clamp: false });
  const scrollOpacity = useTransform(scrollY, [0, 500], [1, 0], { clamp: true });

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
        <HeroContent>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <TitleLine>Welcome</TitleLine>
            <TitleLine>to</TitleLine>
            <TitleLine>Roughfts</TitleLine>
          </motion.h1>
        </HeroContent>
        <motion.div 
          style={{ 
            y: coverY, 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <CoverImageWrapper>
            <Image 
              src="/assets/cover.jpeg" 
              alt="Cover"
              priority
              fill
              style={{ objectFit: 'cover' }}
            />
          </CoverImageWrapper>
        </motion.div>
        <ScrollButton style={{ opacity: scrollOpacity }} onClick={scrollToProfile}>
          <span>Scroll Down</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
          >
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 2rem;
  width: 100%;
  margin-top: -5rem;

  h1 {
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 1.1;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 768px) {
    text-align: left;
    padding-left: 2rem;
  }
`;

const TitleLine = styled.div`
  font-size: 5rem;
  margin: -0.2em 0;

  @media (max-width: 768px) {
    margin: 0;
    font-size: clamp(2.5rem, 16vw, 7rem);  
    line-height: 1.2;
  }
`;

const CoverImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const ScrollButton = styled(motion.button)`
  position: absolute;
  bottom: max(4rem, 5vh);
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
  padding: 1rem;
  gap: 0.8rem;
  width: auto;
  min-width: 120px;
  
  span {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: clamp(0.7rem, 2vw, 0.8rem);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    gap: 0.5rem;
    padding: 0.8rem;
    
    div {
      font-size: 1.2rem;
    }
  }

  @media (max-height: 600px) {
    display: none;
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
