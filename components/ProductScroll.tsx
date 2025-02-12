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
      <ProductContainer
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {products.map((product) => (
          <ProductCard key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
          </ProductCard>
        ))}
      </ProductContainer>
    </ScrollSection>
  );
};

const ScrollSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #000;
`;

const ProductContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  overflow-x: auto;
  width: 100%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductCard = styled.div`
  flex: 0 0 300px;
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  h3 {
    color: white;
    padding: 1rem;
    margin: 0;
  }
`;

export default ProductScroll; 