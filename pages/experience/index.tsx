import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { Gists } from '../../types/content';
import fs from 'fs';
import path from 'path';
import { useLanguage } from '../../lib/LanguageContext';
import { useRef, useEffect, useState } from 'react';

// Static Props to load all experiences
export async function getStaticProps() {
  const experiencesDirectory = path.join(process.cwd(), 'data', 'experiences');
  const filenames = fs.readdirSync(experiencesDirectory);
  
  const experiences = filenames
    .filter(filename => filename.endsWith('.json'))
    .map(filename => {
      const filePath = path.join(experiencesDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent) as Gists;
    })
    .sort((a, b) => {
      // Sort by date in descending order
      const dateA = `${a.year}-${a.month}`;
      const dateB = `${b.year}-${b.month}`;
      return dateB.localeCompare(dateA);
    });

  return {
    props: {
      experiences
    }
  };
}

interface ExperiencePageProps {
  experiences: Gists[];
}

const ExperiencePage = ({ experiences }: ExperiencePageProps) => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // パララックス効果用の変換値を設定
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Group experiences by year first, then by year-month
  const groupedByYear = experiences.reduce((acc, exp) => {
    if (!acc[exp.year]) acc[exp.year] = [];
    acc[exp.year].push(exp);
    return acc;
  }, {} as Record<string, Gists[]>);

  // Then sort each year's experiences by month
  Object.keys(groupedByYear).forEach(year => {
    groupedByYear[year].sort((a, b) => Number(b.month) - Number(a.month));
  });

  // Sort years in descending order
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <Layout>
      <ExperienceContainer ref={containerRef}>
        {/* 3Dパララックス背景要素 */}
        {mounted && (
          <BackgroundElements>
            <Perspective>
              
              <motion.div style={{ y: y2, rotateZ: rotate2 }}>
                <Cube top="25%" right="15%" size="200px" />
              </motion.div>
              
              <motion.div style={{ y: y3 }}>
                <FloatingLines />
              </motion.div>
              
              <Grid />
            </Perspective>
          </BackgroundElements>
        )}
        
        <ContentOverlay>
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
          
          <Timeline>
            {sortedYears.map(year => (
              <YearSection key={year}>
                <YearLabel>{year}</YearLabel>
                <TimelineEntries>
                  {groupedByYear[year].map((exp, idx) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <TimelineItem>
                        <MonthBadge>{exp.month}月</MonthBadge>
                        <ContentCard>
                          <CardGlow />
                          <Link href={`/experience/${exp.id}`} passHref legacyBehavior>
                            <StyledLink>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
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
                        </ContentCard>
                      </TimelineItem>
                    </motion.div>
                  ))}
                </TimelineEntries>
              </YearSection>
            ))}
          </Timeline>
        </ContentOverlay>
      </ExperienceContainer>
    </Layout>
  );
};

// 新しい3D背景要素
const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Perspective = styled.div`
  perspective: 1000px;
  height: 100%;
  width: 100%;
  position: relative;
`;

const FloatingLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 80px),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 80px);
  transform: translateZ(0);
`;


const Cube = styled.div<{top: string, right: string, size: string}>`
  position: absolute;
  top: ${props => props.top};
  right: ${props => props.right};
  width: ${props => props.size};
  height: ${props => props.size};
  opacity: 0.3;
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(-25deg) rotateY(25deg);
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  &:before {
    transform: rotateY(90deg) translateZ(calc(${props => props.size} / 2));
    background: linear-gradient(135deg, rgba(70, 70, 70, 0.4) 0%, rgba(30, 30, 30, 0.2) 100%);
  }
  
  &:after {
    transform: rotateX(90deg) translateZ(calc(${props => props.size} / 2));
    background: linear-gradient(135deg, rgba(50, 50, 50, 0.3) 0%, rgba(20, 20, 20, 0.1) 100%);
  }
  
  background: linear-gradient(135deg, rgba(60, 60, 60, 0.5) 0%, rgba(20, 20, 20, 0.3) 100%);
`;

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  transform: perspective(1000px) rotateX(60deg) scale(2) translateY(-10%);
  opacity: 0.3;
  transform-origin: center top;
`;

const ContentOverlay = styled.div`
  position: relative;
  z-index: 1;
`;

const ExperienceContainer = styled.div`
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
  background: linear-gradient(to bottom, #000000, #000000);
  color: white;
  position: relative;
  overflow: hidden;

  h1 {
    text-align: center;
    font-size: 3.5rem;
    margin-bottom: 4rem;
    background: linear-gradient(to right, #ffffff, #a0a0a0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.15);
    position: relative;
    z-index: 2;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
  }
`;

const CardGlow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 8px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
  box-shadow: 
    0 0 20px 2px rgba(255, 255, 255, 0.05),
    inset 0 0 20px rgba(255, 255, 255, 0.05);
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0) 70%
  );
`;

const Timeline = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  z-index: 2;
`;

const YearSection = styled.section`
  margin-bottom: 4rem;
  position: relative;
`;

const YearLabel = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
  display: inline-block;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.5), transparent);
  }
`;

const TimelineEntries = styled.div`
  position: relative;
  padding-left: 2rem;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.05));
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: flex-start;
  
  &:hover ${CardGlow} {
    opacity: 1;
  }
`;

const MonthBadge = styled.div`
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  font-weight: bold;
  min-width: 70px;
  text-align: center;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  margin-right: 1.5rem;
  backdrop-filter: blur(4px);
  position: relative;
  z-index: 3;
  
  &:before {
    content: '';
    position: absolute;
    left: -0.35rem;
    top: 0.75rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: white;
    box-shadow: 
      0 0 0 3px rgba(255, 255, 255, 0.1),
      0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const ContentCard = styled.div`
  background: rgba(20, 20, 30, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 1.5rem;
  flex: 1;
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(1000px) translateZ(0);
  
  &:hover {
    transform: perspective(1000px) translateZ(10px) translateY(-5px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.6),
      0 0 20px rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
    background: rgba(25, 25, 35, 0.8);
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  
  h2 {
    color: white;
    margin: 0 0 0.8rem;
    font-size: 1.4rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.5);
      transition: width 0.3s ease;
    }
  }
  
  &:hover h2:after {
    width: 100%;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    line-height: 1.6;
  }
`;

const TechStack = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const TechTag = styled.span`
  background: rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  transform: translateZ(5px);
  
  &:hover {
    background: rgba(60, 60, 80, 0.6);
    transform: translateY(-2px) translateZ(10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export default ExperiencePage;