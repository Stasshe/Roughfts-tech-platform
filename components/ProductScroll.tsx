import { motion } from 'framer-motion';
import styled from 'styled-components';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { translations } from '../lib/translations';
import { getAllWorks } from '../lib/contentManager';

const ProductScroll = () => {
  const { language } = useLanguage();
  const featuredProjects = getAllWorks(language);

  return (
    <ScrollSection>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {translations[language].sections.selectedWorks}
      </SectionTitle>
      <ProductContainer>
        {featuredProjects.map((project, index) => (
          <ProductCard
            key={project.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ImageWrapper>
              <img src={project.images[0]} alt={project.title} />
            </ImageWrapper>
            <ProductInfo>
              <h3>{project.title}</h3>
              <Description>{project.shortIntro}</Description>
              <TechTags>
                {project.techStack.slice(0, 3).map((tech, i) => (
                  <TechTag key={i}>{tech}</TechTag>
                ))}
              </TechTags>
              <Link href={`/works/${project.id}`} passHref>
                <ViewButton>{translations[language].buttons.viewProject}</ViewButton>
              </Link>
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
  @media (max-width: 768px) {
    padding: 0px 0
  }
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

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 1rem 0;
  opacity: 0.8;
`;

const TechTags = styled.div`
  display: flex;
  gap: 0.8rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const TechTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  opacity: 0.8;
`;

export default ProductScroll; 