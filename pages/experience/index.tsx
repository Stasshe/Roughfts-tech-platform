import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { Gists } from '../../types/content';
import fs from 'fs';
import path from 'path';
import { useLanguage } from '../../lib/LanguageContext';

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
      <ExperienceContainer>
        <BackgroundElements>
          <Circle top="10%" left="5%" size="150px" delay={0.2} />
          <Circle top="60%" right="8%" size="200px" delay={0.5} />
          <Grid />
        </BackgroundElements>
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

// Background elements
const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Circle = styled(motion.div)<{ top: string; left?: string; right?: string; size: string; delay: number }>`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(40, 40, 40, 0.8) 0%, rgba(20, 20, 20, 0.4) 100%);
  top: ${props => props.top};
  ${props => props.left && `left: ${props.left};`}
  ${props => props.right && `right: ${props.right};`}
  opacity: 0.4;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
    z-index: -1;
  }
`;

Circle.defaultProps = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 0.4 },
  transition: { duration: 1.5, type: "spring" },
};

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.4;
`;

const ContentOverlay = styled.div`
  position: relative;
  z-index: 1;
`;

const ExperienceContainer = styled.div`
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
  background: linear-gradient(to bottom, #000000, #121212);
  color: white;
  position: relative;
  overflow: hidden;

  h1 {
    text-align: center;
    font-size: 3.5rem;
    margin-bottom: 4rem;
    background: linear-gradient(to right, #ffffff, #cccccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
  }
`;

const Timeline = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
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
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: flex-start;
`;

const MonthBadge = styled.div`
  background: rgba(40, 40, 40, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  font-weight: bold;
  min-width: 70px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-right: 1.5rem;
  
  &:before {
    content: '';
    position: absolute;
    left: -0.35rem;
    top: 0.75rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: white;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
  }
`;

const ContentCard = styled.div`
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  flex: 1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    background: rgba(35, 35, 35, 0.7);
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
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(60, 60, 60, 0.6);
    transform: translateY(-2px);
  }
`;

export default ExperiencePage;