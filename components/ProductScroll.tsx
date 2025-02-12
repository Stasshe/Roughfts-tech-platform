import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProductScroll = () => {
  const products = [
    { id: 1, name: 'Project 1', image: '/project1.jpg' },
    { id: 2, name: 'Project 2', image: '/project2.jpg' },
    { id: 3, name: 'Project 3', image: '/project3.jpg' },
    // Add more products
  ];

  return (
    <ScrollSection>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Selected Works
      </SectionTitle>
      <ProductContainer>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ImageWrapper>
              <img src={product.image} alt={product.name} />
            </ImageWrapper>
            <ProductInfo>
              <h3>{product.name}</h3>
              <ViewButton>View Project</ViewButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductContainer>
    </ScrollSection>
  );
};

const ScrollSection = styled.section`
  min-height: 100vh;
  padding: 100px 0;
  background: none;
  position: relative;
  z-index: 1;
`;
const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 200;
  letter-spacing: 0.2em;
  color: white;
  text-align: center;
  margin-bottom: 4rem;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 0 5vw;
  max-width: 1400px;
  margin: 0 auto;
`;

const ProductCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  align-items: center;

  &:nth-child(even) {
    direction: rtl;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    direction: ltr;
    
    &:nth-child(even) {
      direction: ltr;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  color: white;
  padding: 2rem;
  direction: ltr;

  h3 {
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 1rem;
    letter-spacing: 0.1em;
  }
`;

const ViewButton = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.1em;

  &:hover {
    background: white;
    color: black;
  }
`;

export default ProductScroll; 