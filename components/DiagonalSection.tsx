import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useLanguage } from '../lib/LanguageContext';
import { Experience } from '../data/experiences';
import { experiences } from '../data/experiences';
import { useRouter } from 'next/router';

const Container = styled.section`
  position: relative;
  padding: 8rem 2rem;
  background: white;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 180px;
    background: linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.8) 50%, transparent 100%);
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 180px;
    background: linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0.8) 50%, transparent 100%);
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    padding: 6rem 1rem;
    
    &::before, &::after {
      height: 100px;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #111;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #000;
    margin: 1rem auto 0;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ArticleCard = styled(motion.article)`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #000;
  position: relative;
  padding-bottom: 0.8rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: #000;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    padding-bottom: 0.6rem;
  }
`;

const Description = styled.p`
  color: #333;
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  flex-grow: 1;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
`;

const Content = styled.div`
  color: #555;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-top: auto;
  
  @media (max-width: 768px) {
    -webkit-line-clamp: 2;
    font-size: 0.8rem;
  }
`;

const ReadMore = styled.span`
  display: inline-block;
  color: #000;
  font-weight: 600;
  font-size: 0.8rem;
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  padding-bottom: 2px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #000;
    transform: scaleX(0);
    transform-origin: right center;
    transition: transform 0.3s ease;
  }
  
  ${ArticleCard}:hover &::after {
    transform: scaleX(1);
    transform-origin: left center;
  }
`;

const DiagonalSection = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const recentExperiences = experiences.slice(0, 6);

  const handleCardClick = (id: string) => {
    router.push(`/experience/${id}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <Container>
      <SectionTitle>
        {language === 'en' ? 'Recent Experiences' : '最近の経験'}
      </SectionTitle>
      <ArticleGrid>
        {recentExperiences.map((experience: Experience, index: number) => (
          <ArticleCard
            key={experience.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleCardClick(experience.id)}
          >
            <Title>
              {language === 'en' ? experience.title : experience.title_ja}
            </Title>
            <Description>
              {language === 'en' 
              ? experience.description.length > 100 
                ? `${experience.description.substring(0, 100)}...` 
                : experience.description 
              : experience.description_ja.length > 100 
                ? `${experience.description_ja.substring(0, 100)}...` 
                : experience.description_ja}
            </Description>
            <Content>
              {language === 'en' 
              ? experience.details[0]?.content[0]?.substring(0, 50) 
              : experience.details[0]?.content_ja[0]?.substring(0, 50)}
            </Content>
            <ReadMore>
              {language === 'en' ? 'Read more' : '続きを読む'}
            </ReadMore>
          </ArticleCard>
        ))}
      </ArticleGrid>
    </Container>
  );
};

export default DiagonalSection;