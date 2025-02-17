import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Head from 'next/head';
import { useLanguage } from '../lib/LanguageContext';

const AboutPage = () => {
  const { language, getLocalizedContent } = useLanguage();
  const pageContent = getLocalizedContent('page', 'about');

  if (!pageContent) return null;

  return (
    <Layout>
      <AboutContainer>
        <Head>
          <title>About Roughfts</title>
        </Head>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {pageContent.title}
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
              <p>{pageContent.description}</p>
              
              {pageContent.sections && Object.entries(pageContent.sections).map(([key, section]) => (
                <div key={key}>
                  <h3>{(section as {title: string}).title}</h3>
                  {key === 'skills' ? (
                    <SkillsContainer>
                      <SkillsGrid>
                        {skills.map((skill, index) => (
                          <SkillItem
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ scale: 1.05, backgroundColor: '#444' }}
                          >
                            <SkillIcon>{skill.icon}</SkillIcon>
                            <SkillName>{skill.name}</SkillName>
                            <SkillCategory>{skill.category}</SkillCategory>
                          </SkillItem>
                        ))}
                      </SkillsGrid>
                    </SkillsContainer>
                  ) : (
                    <p>{(section as {content: string}).content}</p>
                  )}
                </div>
              ))}
            </motion.div>
          </TextContent>
        </ContentSection>
      </AboutContainer>
    </Layout>
  );
};

const skills = [
  { name: 'JavaScript/TypeScript', icon: '⚡', category: 'Languages' },
  { name: 'React/Next.js', icon: '⚛️', category: 'Frontend' },
  { name: 'Node.js', icon: '🚀', category: 'Backend' },
  { name: 'Docker', icon: '🐳', category: 'DevOps' },
  { name: 'AWS', icon: '☁️', category: 'Cloud' },
  { name: 'Firebase', icon: '🔥', category: 'Backend' },
  { name: 'Web Security', icon: '🔒', category: 'Security' },
  { name: 'UI/UX Design', icon: '🎨', category: 'Design' }
];

const AboutContainer = styled.div`
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
  background: #000;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.8;
  }
`;

const ContentSection = styled.div`
  display: grid;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 300px 1fr;
    align-items: start;
  }
`;

const Section = styled(motion.section)`
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #fff;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0.8;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  max-width: 300px;
  border-radius: 50%;
  object-fit: cover;
`;

const TextContent = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #fff;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0.8;
  }
`;

const SkillsContainer = styled.div`
  margin: 2rem 0;
  padding: 2rem;
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