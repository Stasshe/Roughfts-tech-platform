import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Head from 'next/head';
import aboutData from '../../data/pages/about.json';
import { useLanguage } from '../../lib/LanguageContext';

const AboutPage = () => {
  const { language } = useLanguage();
  const isJapanese = language === 'ja';

  return (
    <Layout>
      <AboutContainer>
        <Head>
          <title>{isJapanese ? aboutData.title_ja : aboutData.title}</title>
        </Head>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {isJapanese ? aboutData.title_ja : aboutData.title}
        </motion.h1>
        <ContentSection>
          <ProfileImage
            src="/assets/ico.png"
            alt="Profile"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <TextContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2>Roughfts</h2>
              <p>
                {isJapanese 
                  ? aboutData.sections.introduction.content_ja 
                  : aboutData.sections.introduction.content}
              </p>
              
              <h3>{isJapanese ? 'スキル' : 'Skills'}</h3>
              <SkillsGrid>
                {skills.map((skill, index) => (
                  <SkillItem
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {skill}
                  </SkillItem>
                ))}
              </SkillsGrid>
            </motion.div>
          </TextContent>
        </ContentSection>
        
        <PolicySection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>
              {isJapanese 
                ? aboutData.sections.fastLearning.title_ja 
                : aboutData.sections.fastLearning.title}
            </h3>
            <p>
              {isJapanese 
                ? aboutData.sections.fastLearning.content_ja 
                : aboutData.sections.fastLearning.content}
            </p>
          </motion.div>
        </PolicySection>
      </AboutContainer>
    </Layout>
  );
};

const skills = [
  'JavaScript/TypeScript',
  'React/Next.js',
  'Node.js',
  'Docker',
  'AWS',
  'Firebase',
  'Web Security',
  'UI/UX Design'
];

const AboutContainer = styled.div`
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

const ContentSection = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const TextContent = styled.div`
  flex: 1;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0.9;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const SkillItem = styled(motion.div)`
  background: #111;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
`;

const PolicySection = styled.div`
  margin-top: 4rem;
  

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
    max-width: 1000px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0.9;
    margin-left: auto;
    margin-right: auto;
    max-width: 1000px;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;


export default AboutPage;
