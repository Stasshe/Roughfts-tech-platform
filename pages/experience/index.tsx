import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Import experiences data
import developmentTips from '../../data/experiences/development-tips.json';

const experiences = [developmentTips];
// ... you can add more experience JSON imports here

const ExperiencePage = () => {
  const router = useRouter();
  const locale = router.locale || 'en';

  return (
    <Layout>
      <ExperienceContainer>
        <Head>
          <title>{locale === 'en' ? 'Roughfts Experience' : 'Roughfts 経験'}</title>
        </Head>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {locale === 'en' ? 'Experience' : '経験'}
        </motion.h1>
        <Timeline>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/experience/${exp.slug}`} passHref>
                <TimelineItem>
                  <Year>{exp.year}</Year>
                  <Content>
                    <h2>{exp.title[locale]}</h2>
                    <p>{exp.description[locale]}</p>
                  </Content>
                </TimelineItem>
              </Link>
            </motion.div>
          ))}
        </Timeline>
      </ExperienceContainer>
    </Layout>
  );
};

const ExperienceContainer = styled.div`
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
  background: #000;
  color: white;

  h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
`;

const Timeline = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const TimelineItem = styled.a`
  display: flex;
  margin-bottom: 3rem;
  position: relative;
  text-decoration: none;
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:before {
    content: '';
    position: absolute;
    left: 120px;
    height: 100%;
    width: 2px;
    background: white;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    
    &:before {
      left: 20px;
    }
  }
`;

const Year = styled.div`
  width: 100px;
  font-size: 1.5rem;
  font-weight: bold;
  padding-right: 2rem;
  
  @media (max-width: 768px) {
    padding-bottom: 1rem;
  }
`;

const Content = styled.div`
  flex: 1;
  padding-left: 2rem;
  
  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
  }
  
  p {
    margin: 0;
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    padding-left: 3rem;
  }
`;

export default ExperiencePage; 