import { motion, useScroll, useTransform, HTMLMotionProps } from 'framer-motion';
import styled from 'styled-components';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { translations } from '../lib/translations';
import { ContentManager } from '../lib/contentManager';
import { useRef } from 'react';

const ProductScroll = () => {
  const { language, t } = useLanguage();
  const featuredProjects = ContentManager.getInstance().getFeaturedWorks();
  const localizedProjects = featuredProjects.map(project => 
    ContentManager.getInstance().getProject(project.id, language)
  );
  const sectionRef = useRef(null);

  if (!localizedProjects || localizedProjects.length === 0) {
    return null;
  }

  return (
    <ScrollSection ref={sectionRef}>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {t('sections.selectedWorks')}
      </SectionTitle>
      <ProductContainer>
        {localizedProjects.map((project, index) => (
          <ProjectCard key={project.id} index={index} project={project} language={language} />
        ))}
      </ProductContainer>
    </ScrollSection>
  );
};

const ProjectCard = ({ index, project, language }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const isEven = index % 2 === 0;

  return (
    <ProductCard 
      ref={cardRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      $even={isEven}
    >
      <ImageSection style={{ y: y }}>
        <ImageOverlay />
        <ImageWrapper>
          <img src={project.images[0]} alt={project.title} />
        </ImageWrapper>
      </ImageSection>
      
      <ProductInfo
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Category>{project.category || "Project"}</Category>
        <h3>{project.title}</h3>
        <Description>{project.description}</Description>
        <TechTags>
          {project.techStack.slice(0, 3).map((tech, i) => (
            <TechTag 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
              viewport={{ once: true }}
            >
              {tech}
            </TechTag>
          ))}
        </TechTags>
        <Link href={`/works/${project.id}`} passHref>
          <ViewButton
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 1)",
              color: "#000",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {translations[language].buttons.viewProject}
            <ButtonArrow>→</ButtonArrow>
          </ViewButton>
        </Link>
      </ProductInfo>
    </ProductCard>
  );
};

// ProductCardの型を定義
interface ProductCardProps extends HTMLMotionProps<"div"> {
  $even?: boolean;
}

const ScrollSection = styled.section`
  min-height: 100vh;
  padding: 120px 0;
  background: none;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 200;
  letter-spacing: 0.2em;
  color: white;
  text-align: center;
  margin-bottom: 8rem;
  padding-top: 0;
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 4rem;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15vh;
  padding: 0 5vw;
  max-width: 1400px;
  margin: 0 auto;
`;

// ProductCardの型定義を適用
const ProductCard = styled(motion.div)<ProductCardProps>`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  direction: ${props => props.$even ? 'ltr' : 'rtl'};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    direction: ltr;
  }
`;

const ImageSection = styled(motion.div)`
  position: relative;
  height: 60vh;
  max-height: 600px;
  overflow: hidden;
  border-radius: 4px;
  
  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.4)
  );
  z-index: 1;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled(motion.div)`
  color: white;
  padding: 2rem;
  direction: ltr;

  h3 {
    font-size: 2.5rem;
    font-weight: 300;
    margin: 0.5rem 0 1.5rem;
    letter-spacing: 0.05em;
    line-height: 1.2;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0;
    
    h3 {
      font-size: 1.8rem;
    }
  }
`;

const Category = styled.span`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.6);
`;

const ViewButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border-radius: 2px;
  margin-top: 2.5rem;
  transition: all 0.3s ease;
`;

const ButtonArrow = styled.span`
  font-size: 1.2rem;
  line-height: 1;
  transition: transform 0.3s ease;
  
  ${ViewButton}:hover & {
    transform: translateX(4px);
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 1.5rem 0;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TechTags = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const TechTag = styled(motion.span)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 2px;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

// ItemContainerも同様に型定義を明示
interface ItemContainerProps {
  $even?: boolean;
}

const ItemContainer = styled.div<ItemContainerProps>`
  display: flex;
  flex-direction: ${props => props.$even ? 'row-reverse' : 'row'};
  align-items: center;
  width: 100%;
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export default ProductScroll;