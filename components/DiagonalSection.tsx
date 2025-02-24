import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useLanguage } from '../lib/LanguageContext';
import { Experience } from '../data/experiences';
import { experiences } from '../data/experiences';
import { useRouter } from 'next/router';

const Container = styled.section`
  position: relative;
  padding: 8rem 2rem;
  background: linear-gradient(
    to bottom,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 10%,
    rgba(255, 255, 255, 0.95) 20%,
    #ffffff 30%,
    #ffffff 70%,
    rgba(255, 255, 255, 0.95) 80%,
    rgba(0, 0, 0, 0.8) 90%,
    #000000 100%
  );

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: auto;
    pointer-events: none;
  }

  &::before {
    top: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }

  &::after {
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
`;

const ArticleGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ArticleCard = styled(motion.article)`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const Title = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-top: 0;
  }
`;

const Description = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Content = styled.div`
  color: #444;
  font-size: 0.8rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media (max-width: 768px) {
    -webkit-line-clamp: 2;
    font-size: 0.6rem;
  }
`;

const DiagonalSection = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const recentExperiences = experiences.slice(0, 5);

  const handleCardClick = (id: string) => {
    router.push(`/experience/${id}`);
  };

  return (
    <Container>
      <ArticleGrid>
        {recentExperiences.map((experience: Experience) => (
          <ArticleCard
            key={experience.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleCardClick(experience.id)}
          >
            <Title>
              {language === 'en' ? experience.title : experience.title_ja}
            </Title>
            <Description>
              {language === 'en' ? experience.description : experience.description_ja}
            </Description>
            <Content>
              {language === 'en' 
                ? experience.details[0]?.content[0] 
                : experience.details[0]?.content_ja[0]}
            </Content>
          </ArticleCard>
        ))}
      </ArticleGrid>
    </Container>
  );
};

export default DiagonalSection;