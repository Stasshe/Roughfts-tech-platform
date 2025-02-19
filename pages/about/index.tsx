import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Head from 'next/head';
import aboutData from '../../data/pages/about.json';
import { useLanguage } from '../../lib/LanguageContext';
import { TypeAnimation } from 'react-type-animation';

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
              <TypeAnimation
                sequence={[
                  isJapanese 
                    ? aboutData.sections.introduction.content_ja 
                    : aboutData.sections.introduction.content,
                  500,
                ]}
                wrapper="p"
                cursor={true}
                speed={50}
                style={{ height: '100px', overflow: 'hidden' }}
              />

              <h3>
                {isJapanese 
                  ? aboutData.sections.fastLearning.title_ja 
                  : aboutData.sections.fastLearning.title}
              </h3>
              <TypeAnimation
                sequence={[
                  isJapanese 
                    ? aboutData.sections.fastLearning.content_ja 
                    : aboutData.sections.fastLearning.content,
                  500, 
                ]}
                wrapper="p"
                cursor={true}
                speed={80} 
                style={{ height: '180px', overflow: 'hidden' }}
              />
            </motion.div>
          </TextContent>
        </ContentSection>
        <TextContent
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', width: '80%', margin: '0 auto' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SkillsContainer
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '80%', margin: '0 auto' }}
            >
              <h3>{isJapanese ? 'スキル' : 'Skills'}</h3>
              <SkillsGrid style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {aboutData.sections.skills.map((skill, index) => (
                  <SkillItem
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, backgroundColor: '#444' }}
                    style={{ width: '150px' }}
                  >
                    <SkillIcon>{skill.icon}</SkillIcon>
                    <SkillName>{skill.name}</SkillName>
                    <SkillCategory>{skill.category}</SkillCategory>
                  </SkillItem>
                ))}
              </SkillsGrid>
            </SkillsContainer>
          </motion.div>
        </TextContent>
      </AboutContainer>
    </Layout>
  );
};

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
  max-width: 1100px;
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
  margin-top:auto;
  margin-right:auto;
  margin-left:auto;
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


const SkillsContainer = styled.div`
  margin-top:auto;
  margin-right:auto;
  margin-left:auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
`;

const SkillItem = styled(motion.div)`
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin: 0.5rem 0;
`;

const SkillCategory = styled.div`
  font-size: 0.9rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export default AboutPage;
