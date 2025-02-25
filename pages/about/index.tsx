import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Head from 'next/head';
import aboutData from '../../data/pages/about.json';
import { useLanguage } from '../../lib/LanguageContext';
import { TypeAnimation } from 'react-type-animation';
import AboutSkillsSection from '../../components/AboutSkillsSection';

const AboutPage = () => {
  const { language } = useLanguage();
  const isJapanese = language === 'ja';

  // アニメーション用の変数
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Layout>
      <AboutContainer>
        <Head>
          <title>{isJapanese ? aboutData.title_ja : aboutData.title}</title>
        </Head>
        
        <HeroSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {isJapanese ? aboutData.title_ja : aboutData.title}
          </motion.h1>
          
          <AccentLine 
            initial={{ width: 0 }}
            animate={{ width: "150px" }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </HeroSection>
        
        <ContentSection>
          <ProfileImageWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <ProfileImage 
              src="/assets/ico.png" 
              alt="Profile"
              initial={{ scale: 0.8, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            />
            <ProfileGlow />
          </ProfileImageWrapper>
          
          <TextContent>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.5 }}
            >
              <motion.h2 variants={fadeInUp}>Roughfts</motion.h2>
              <Introduce>
                <TypeAnimation
                  sequence={[
                    isJapanese 
                      ? aboutData.sections.introduction.content_ja 
                      : aboutData.sections.introduction.content,
                    500,
                  ]}
                  wrapper="p"
                  cursor={true}
                  speed={60}
                />
              </Introduce>

              <motion.h3 
                variants={fadeInUp}
                transition={{ delay: 0.7 }}
              >
                {isJapanese 
                  ? aboutData.sections.fastLearning.title_ja 
                  : aboutData.sections.fastLearning.title}
              </motion.h3>
              <FastLearning>
                <TypeAnimation
                  sequence={[
                    isJapanese 
                      ? aboutData.sections.fastLearning.content_ja 
                      : aboutData.sections.fastLearning.content,
                    500, 
                  ]}
                  wrapper="p"
                  cursor={true}
                  speed={85}
                />
              </FastLearning>
            </motion.div>
          </TextContent>
        </ContentSection>
        
        {/* SkillsSection を AboutSkillsSection に置き換え */}
        <AboutSkillsSection skills={aboutData.sections.skills} />
      </AboutContainer>
    </Layout>
  );
};

const AccentLine = styled(motion.div)`
  height: 3px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
  margin: 0 auto 3rem;
`;

const HeroSection = styled(motion.div)`
  text-align: center;
  padding: 2rem 0 4rem;
  position: relative;
`;

const ProfileImageWrapper = styled(motion.div)`
  position: relative;
`;

const ProfileGlow = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%);
  top: 0;
  left: 0;
  z-index: -1;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Introduce = styled.div`
  min-height: 100px;
  overflow: hidden;
  margin: 1.5rem 0;
  
  p {
    line-height: 1.8;
    font-weight: 300;
    letter-spacing: 0.5px;
  }
`;

const FastLearning = styled.div`
  min-height: 180px;
  overflow: hidden;
  margin: 1.5rem 0;
  
  p {
    line-height: 1.8;
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  @media (max-width: 767px) {
    min-height: 350px;
  }
`;

const AboutContainer = styled.div`
  padding: 6rem 2rem 4rem;
  min-height: 100vh;
  background: #000;
  color: white;
  background: linear-gradient(135deg, #060606 0%, #111 50%, #060606 100%);

  h1 {
    text-align: center;
    font-size: 3.5rem;
    font-weight: 200;
    letter-spacing: 6px;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
      letter-spacing: 4px;
    }
  }
`;

const ContentSection = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  gap: 6rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const TextContent = styled.div`
  flex: 1;
  
  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 300;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #fff, #aaa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  h3 {
    font-size: 2rem;
    margin: 2.5rem 0 1rem;
    font-weight: 300;
    letter-spacing: 1px;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    opacity: 0.9;
  }
`;

export default AboutPage;
