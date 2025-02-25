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

const ContentOverlay = styled.div`
  position: relative;
  z-index: 1;
`;

const ExperienceContainer = styled.div`
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
  background: #000000;
  color: white;
  position: relative;
  overflow: hidden;

  h1 {
    text-align: center;
    font-size: 3.5rem;
    margin-bottom: 4rem;
    color: #ffffff;
    position: relative;
    z-index: 2;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
  }
`;

const CardGlow = styled.div`
  display: none;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
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