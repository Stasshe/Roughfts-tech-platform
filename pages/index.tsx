import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ProductScroll from '../components/ProductScroll';
import DiagonalSection from '../components/DiagonalSection';
import { ProfileSection } from '../components/ProfileSection';
import SkillsCarousel from '../components/SkillsCarousel';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();
  // より洗練されたパララックス効果
  const coverScale = useTransform(scrollY, [0, 500], [1.1, 1.4]);
  const coverOpacity = useTransform(scrollY, [0, 300], [0.6, 0]);
  const titleY = useTransform(scrollY, [0, 300], [0, -50]);
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const scrollToProfile = () => {
    const profileSection = document.getElementById('profile-section');
    profileSection?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // ローディングアニメーションの時間を設定
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <HeroSection>
        <Head>
          <title>Roughfts Tech Platform</title>
        </Head>
        
        {/* グラデーションオーバーレイ */}
        <GradientOverlay />
        
        {/* カバー画像 */}
        <motion.div 
          style={{ 
            scale: coverScale,
            opacity: coverOpacity,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <CoverImageWrapper>
            <Image 
              src="/assets/cover.jpeg" 
              alt="Cover"
              priority
              fill
              style={{ objectFit: 'cover', filter: 'grayscale(80%)' }}
            />
          </CoverImageWrapper>
        </motion.div>

        {/* メインコンテンツ */}
        <motion.div 
          className="hero-content-wrapper"
          style={{ 
            y: titleY, 
            zIndex: 5,
            position: 'relative' // 追加：非静的なポジション
          }}
        >
          <HeroContent>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <></>
              ) : (              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.h1>
                  <TitleLine 
                    initial={{ x: -100, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Welcome
                  </TitleLine>
                  <TitleLine 
                    initial={{ x: -100, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    to
                  </TitleLine>
                  <TitleLine 
                    initial={{ x: -100, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <GradientText>Roughfts</GradientText>
                  </TitleLine>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <Tagline>Practice is the best shortcut of learning.</Tagline>
                </motion.div>
                </motion.div>
              )}
              
            </AnimatePresence>
          </HeroContent>
        </motion.div>

        {/* スクロールボタン */}
        <ScrollButton 
          style={{ opacity: scrollOpacity }} 
          onClick={scrollToProfile}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <ScrollCircle
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <motion.div 
              animate={{ y: [0, 5, 0] }} 
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown />
            </motion.div>
          </ScrollCircle>
          <ScrollText>Explore</ScrollText>
        </ScrollButton>
      </HeroSection>

      <ProfileSection id="profile-section" />
      <ProductScroll />
      <DiagonalSection />
      <SkillsCarousel />
      
      <ContactSection>
        <ContactContainer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ContactHeader>Let's Connect</ContactHeader>
          <ContactDivider />
          <ContactInfo>
            <p>Interested in collaboration or have a project in mind?</p>
            <ContactLinks>
              <SocialLink href="https://github.com/Stasshe" target="_blank" rel="noopener noreferrer">
                GitHub
              </SocialLink>
              <Dot>•</Dot>
              <SocialLink href="mailto:egnm9stasshe@gmail.com">
                Email
              </SocialLink>
            </ContactLinks>
          </ContactInfo>
        </ContactContainer>
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
  align-items: center; /* 中央揃え */
  position: relative;
  overflow: hidden;
  background-color: #000;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 70%, #000 100%);
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-style: preserve-3d; // 追加：3D変換のサポート

  h1 {
    color: white;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    text-align: center; /* 左揃えから中央揃えに変更 */
    padding-left: 2rem;
  }
`;

const TitleLine = styled(motion.div)`
  font-size: clamp(3.5rem, 8vw, 6rem);
  margin: -0.1em 0;
  display: block;

  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 12vw, 5rem);
    line-height: 1.1;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  text-shadow: 0 0 20px rgba(255,255,255,0.3);
`;

const Tagline = styled.p`
  color: rgba(255,255,255,0.8);
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 300;
  letter-spacing: 0.05em;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    margin-left: 0;
    text-align: left;
  }
`;

const CoverImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const ArrowDown = styled.div`
  width: 12px;
  height: 12px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
`;

const ScrollCircle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScrollText = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 0.5rem;
  font-weight: 300;
`;

const ScrollButton = styled(motion.button)`
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  
  &:hover ${ScrollCircle} {
    border-color: rgba(255,255,255,0.8);
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
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const ContactContainer = styled(motion.div)`
  width: 90%;
  max-width: 900px;
  text-align: center;
  padding: 4rem 2rem;
`;

const ContactHeader = styled.h2`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
`;

const ContactDivider = styled.div`
  width: 60px;
  height: 3px;
  background: white;
  margin: 2rem auto;
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
  
  p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    opacity: 0.8;
    margin-bottom: 3rem;
    font-weight: 300;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const SocialLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  position: relative;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 1px;
    background: white;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover {
    opacity: 0.9;
    
    &:after {
      width: 80%;
    }
  }
`;

const Dot = styled.span`
  opacity: 0.5;
  font-size: 1rem;
`;

export default HomePage;
