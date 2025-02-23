import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Gists } from '../../types/content';
import fs from 'fs';
import path from 'path';
import { useLanguage } from '../../lib/LanguageContext';
import Link from 'next/link';

interface ExperienceDetailPageProps {
  experience: Gists | null;
}

// Static Paths
export const getStaticPaths: GetStaticPaths = async () => {
  const worksDirectory = path.join(process.cwd(), 'data', 'experiences');
  const filenames = fs.readdirSync(worksDirectory);

  const paths = filenames
    .filter((filename) => filename.endsWith('.json'))
    .map((filename) => ({
      params: { slug: filename.replace('.json', '') },
    }));

  return {
    paths,
    fallback: false,
  };
};

// Static Props
export const getStaticProps: GetStaticProps<ExperienceDetailPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'data', 'experiences', `${slug}.json`);
  
  let experience: Gists | null = null;
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    experience = JSON.parse(fileContent) as Gists;
  } catch (error) {
    console.error(`Error loading experience content: ${error}`);
  }

  return {
    props: {
      experience,
    },
  };
};

// Experience Detail Page
const ExperienceDetailPage = ({ experience }: ExperienceDetailPageProps) => {
  const router = useRouter();
  const { language } = useLanguage();

  if (!experience) {
    return (
      <Layout>
        <div>Experience not found</div>
      </Layout>
    );
  }
  

  const getLocalizedContent = (en: string, ja: string) => {
    return language === 'en' ? en : ja;
  };
  const title = language === 'en' ? experience.title : experience.title_ja;
  

  return (
    <Layout>
      <DetailContainer>
        <motion.div
          style={{ position: 'absolute', top: '3rem', left: '3rem' }}
          whileHover={{ scale: 1.1, color: '#fff' }}
        >
          <Link href="/experience" style={{ color: '#ccc', textDecoration: 'none' }}>
            ←Return to Experiences
          </Link>
        </motion.div>
        <Head>
          <title>{title}</title>
        </Head>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {getLocalizedContent(experience.title, experience.title_ja)}
        </motion.h1>
        
        <Year>{experience.year}</Year>
        
        <Description
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {getLocalizedContent(experience.description, experience.description_ja)}
        </Description>

        <ContentSection>
          {experience.details.map((section, index) => (
            <Section key={index}>
              <SectionTitle>
                {getLocalizedContent(section.caption, section.caption_ja || '')}
              </SectionTitle>
              {section.content_ja && language === 'ja' 
                ? section.content_ja.map((content, i) => (
                    <SectionContent key={i}>{content}</SectionContent>
                  ))
                : section.content.map((content, i) => (
                    <SectionContent key={i}>{content}</SectionContent>
                  ))
              }
              {section.subDetails && (
                <SubDetailsList>
                  {section.subDetails.map((subDetail, subIndex) => (
                    <SubDetail key={subIndex}>
                      <SubDetailTitle>
                        {getLocalizedContent(
                          subDetail.caption,
                          subDetail.caption_ja || ''
                        )}
                      </SubDetailTitle>
                      {subDetail.content_ja && language === 'ja'
                        ? subDetail.content_ja.map((content, i) => (
                            <SectionContent key={i}>{content}</SectionContent>
                          ))
                        : subDetail.content.map((content, i) => (
                            <SectionContent key={i}>{content}</SectionContent>
                          ))
                      }
                    </SubDetail>
                  ))}
                </SubDetailsList>
              )}
            </Section>
          ))}
        </ContentSection>
      </DetailContainer>
    </Layout>
  );
};

// Styled-components
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

const ContentSection = styled.div`
  margin-top: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const SectionContent = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #ddd;
`;

const SubDetailsList = styled.div`
  margin-left: 1.5rem;
  margin-top: 1rem;
`;

const SubDetail = styled.div`
  margin-bottom: 1.5rem;
`;

const SubDetailTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

export default ExperienceDetailPage;
