import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ProductScroll from '../components/ProductScroll';
import DiagonalSection from '../components/DiagonalSection';
import { ProfileSection } from '../components/ProfileSection';

const HomePage = () => {
  const { scrollY } = useScroll();
  const coverY = useTransform(scrollY, [0, 1000], [0, 300], { clamp: false });
  const scrollOpacity = useTransform(scrollY, [0, 700], [1, 0], { clamp: true });

  const scrollToProfile = () => {
    const profileSection = document.getElementById('profile-section');
    profileSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <HeroSection>
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

      <SkillsSection>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2>Technical Skills</h2>
          <SkillsGrid>
            <SkillCategory>
              <h3>Frontend</h3>
              <ul>
                <li>React/Next.js</li>
                <li>TypeScript</li>
                <li>HTML5/CSS</li>
                <li>Responsive Design</li>
              </ul>
            </SkillCategory>
            <SkillCategory>
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Python</li>
                <li>Firebase</li>
                <li>RESTful APIs</li>
              </ul>
            </SkillCategory>
            <SkillCategory>
              <h3>Tools & Others</h3>
              <ul>
                <li>Git/GitHub</li>
                <li>Docker</li>
                <li>AWS</li>
                <li>Network Security</li>
              </ul>
            </SkillCategory>
          </SkillsGrid>
        </motion.div>
      </SkillsSection>

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
`;

const SkillsSection = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  padding: 4rem 2rem;
  color: white;
  text-align: center;

  h2 {
    font-size: 3rem;
    font-weight: 200;
    letter-spacing: 0.2em;
    margin-bottom: 4rem;
  }
  @media (max-width: 768px) {
    h2{
      text-align:center;
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SkillCategory = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 300;
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin: 1rem 0;
      opacity: 0.8;
    }
  }
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
  
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
