import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

const ExperienceDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // In a real app, you would fetch the experience data based on the slug
  const experience = {
    title: 'Experience Title',
    year: '2023',
    description: 'Detailed description of the experience...',
    achievements: [
      'Achievement 1',
      'Achievement 2',
      'Achievement 3'
    ]
  };

  return (
    <Layout>
      <DetailContainer>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {experience.title}
        </motion.h1>
        
        <Year>{experience.year}</Year>
        
        <Description
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {experience.description}
        </Description>

        <AchievementsList>
          {experience.achievements.map((achievement, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {achievement}
            </motion.li>
          ))}
        </AchievementsList>
      </DetailContainer>
    </Layout>
  );
};

const DetailContainer = styled.div`
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
  background: #000;
  color: white;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const Year = styled.div`
  font-size: 1.5rem;
  color: #888;
  margin-bottom: 2rem;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    
    &:before {
      content: '→';
      position: absolute;
      left: 0;
      color: #888;
    }
  }
`;

export default ExperienceDetailPage; 