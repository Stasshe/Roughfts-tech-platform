// index.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ProductScroll from '../components/ProductScroll';
import DiagonalSection from '../components/DiagonalSection';
import { ProfileSection } from '../components/ProfileSection';

const HomePage = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  const scrollToProfile = () => {
    const profileSection = document.getElementById('profile-section');
    profileSection?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <HeroSection>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Roughfts
        </motion.h1>
        <CoverImage
          src="/assets/cover.jpeg"
          alt="Cover"
          style={{ transform: `translateY(${offsetY * 0.5}px)` }}
        />
        <ScrollButton
          onClick={scrollToProfile}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </ScrollButton>
      </HeroSection>

      {/* プロフィールセクション */}
      <ProfileSection id="profile-section" />

      {/* プロダクトリスト */}
      <ProductScroll />

      <DiagonalSection />

      <ContactSection>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Let's Connect</h2>
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
`;

export default HomePage;