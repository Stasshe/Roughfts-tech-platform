import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ProductScroll from '../components/ProductScroll';
import DiagonalSection from '../components/DiagonalSection';

const HomePage = () => {
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
        <CoverImage src="/cover-image.jpg" alt="Cover" />
      </HeroSection>

      <ProductScroll />
      
      <DiagonalSection />

      <ContactSection>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Let's Connect</h2>
          {/* Contact form will go here */}
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
`;

const ContactSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  color: white;
`;

export default HomePage; 