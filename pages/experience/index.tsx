import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { Gists } from '../../types/content';
// Import experiences data
import developmentTips from '../../data/experiences/development-tips.json';
import { useLanguage } from '../../lib/LanguageContext'; // Import the language context

const experiences: Gists[] = [{
  ...developmentTips,
  date: developmentTips.year,
  details: developmentTips.details.map(detail => ({
    ...detail,
    caption: detail.caption || '',
    caption_ja: detail.caption_ja || '',
    subDetails: detail.subDetails?.map(subDetail => ({
      ...subDetail,
      caption: subDetail.caption || '',
      caption_ja: subDetail.caption_ja || '',
      content_ja: subDetail.content_ja || []
    }))
  }))
}];

const ExperiencePage = () => {
  const { language } = useLanguage();

  const groupedExperiences = experiences.reduce((acc, exp) => {
    const yearMonth = `${exp.year}-${('0' + exp.month).slice(-2)}`;
    if (!acc[yearMonth]) acc[yearMonth] = [];
    acc[yearMonth].push(exp);
    return acc;
  }, {});

  return (
    <Layout>
      <ExperienceContainer>
        <Head>
          <title>{language === 'en' ? 'Roughfts Experience' : 'Roughfts 経験'}</title>
        </Head>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {language === 'en' ? 'Experience' : '経験'}
        </motion.h1>
        {Object.keys(groupedExperiences).map((yearMonth, index) => (
          <div key={index}>
            
            <Timeline>
              {groupedExperiences[yearMonth].map((exp: Gists, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, scale: 0.8 }} // Changed x to scale for a more pronounced effect
                  animate={{ opacity: 1, scale: 1 }} // Adjusted to scale for a smoother transition
                  transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 100 }} // Added spring type for a more dynamic motion
                >
                  <TimelineItem>
                    <Year>{exp.year}</Year>
                    <Month>{exp.month}月</Month>
                    <Content>
                      <Link href={`/experience/${exp.id}`} passHref legacyBehavior>
                        <StyledLink>
                          <motion.div
                            whileHover={{ scale: 1.05, color: '#fff' }} // Added hover animation
                            transition={{ duration: 0.3 }} // Transition duration for the hover effect
                          >
                            <h2>{language === 'en' ? exp.title : exp.title_ja}</h2>
                            <p>{language === 'en' ? exp.description : exp.description_ja}</p>
                          </motion.div>
                        </StyledLink>
                      </Link>
                      <TechStack>
                        {exp.techStack.map((tech, i) => (
                          <TechTag key={i}>{tech}</TechTag>
                        ))}
                      </TechStack>
                    </Content>
                  </TimelineItem>
                </motion.div>
              ))}
            </Timeline>
          </div>
        ))}
      </ExperienceContainer>
    </Layout>
  );
};



const Month = styled.div`
  width: 80px;
  font-size: 1.2rem;
  font-weight: bold;
  padding-right: 1rem;
  color: #bbb;
  
  @media (max-width: 768px) {
    padding-bottom: 1rem;
  }
`;


const TechStack = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: #333;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

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

const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  h2, p {
    color: white;
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