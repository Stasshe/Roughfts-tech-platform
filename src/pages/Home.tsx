import styled from 'styled-components';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Container>
      <Hero>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Roughfts
        </Title>
        <CoverImage
          src="/cover-image.jpg" // You'll need to add your own image
          alt="Cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
      </Hero>

      <ProductsSection>
        <ProductsStream
          initial={{ x: '100%' }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Add your product previews here */}
        </ProductsStream>
      </ProductsSection>

      <DiagonalSection>
        <AnimatedImage
          src="/animated-image.jpg" // You'll need to add your own image
          alt="Animated section"
          initial={{ opacity: 0, rotate: -5 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
        />
      </DiagonalSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Hero = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled(motion.h1)`
  position: absolute;
  top: 20%;
  font-size: 4rem;
  z-index: 2;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CoverImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductsSection = styled.section`
  padding: 100px 0;
  overflow: hidden;
`;

const ProductsStream = styled(motion.div)`
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
`;

const DiagonalSection = styled.section`
  position: relative;
  padding: 100px 0;
  transform: skewY(-5deg);
  background: #111;
  margin: 100px 0;
`;

const AnimatedImage = styled(motion.img)`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: block;
  transform: skewY(5deg);
`;

export default Home; 