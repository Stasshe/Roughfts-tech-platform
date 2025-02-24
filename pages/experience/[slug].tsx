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
import icons from '../../data/skills/icons.json';
import { useState } from 'react';

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

// 画像表示用のコンポーネントを追加
const ContentImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
`;

const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({ experience }) => {
  const router = useRouter();
  const { language } = useLanguage();
  const [imageLoadError, setImageLoadError] = useState<{[key: string]: boolean}>({});

  // 画像とリンクの変換関数
  const convertContent = (text: string) => {
    // 画像の正規表現
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    
    // テキストを分割して処理
    const parts = text.split(imageRegex);
    const result = [];
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        // 通常のテキスト
        if (parts[i]) result.push(<span key={`text-${i}`}>{parts[i]}</span>);
      } else if (i % 3 === 2) {
        // 画像URL
        const alt = parts[i - 1];
        const src = parts[i];
        if (!imageLoadError[src]) {
          result.push(
            <ContentImage
              key={`img-${i}`}
              src={src}
              alt={alt}
              onError={() => setImageLoadError(prev => ({ ...prev, [src]: true }))}
            />
          );
        }
      }
    }
    
    return result;
  };

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
  
  const getIconByType = (type: string) => {
    const iconUrl = icons[type as keyof typeof icons] || icons.website;
    return (
      <IconWrapper>
        <img src={iconUrl} alt={type} width="24" height="24" />
      </IconWrapper>
    );
  };

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
          {experience.details?.map((section, index) => (
            <Section key={index}>
              <SectionTitle>
                {getLocalizedContent(section.caption, section.caption_ja ?? section.caption)}
              </SectionTitle>
              {section.content_ja && language === 'ja' 
                ? section.content_ja?.map((content, i) => (
                    <SectionContent key={i}>{convertContent(content)}</SectionContent>
                  ))
                : section.content?.map((content, i) => (
                    <SectionContent key={i}>{convertContent(content)}</SectionContent>
                  ))
              }
              {section.subDetails && (
                <SubDetailsList>
                  {section.subDetails.map((subDetail, subIndex) => (
                    <SubDetail key={subIndex}>
                      <SubDetailTitle>
                        {getLocalizedContent(
                          subDetail.caption,
                          subDetail.caption_ja ?? subDetail.caption
                        )}
                      </SubDetailTitle>
                      {subDetail.content_ja && language === 'ja'
                        ? subDetail.content_ja?.map((content, i) => (
                            <SectionContent key={i}>{convertContent(content)}</SectionContent>
                          ))
                        : subDetail.content?.map((content, i) => (
                            <SectionContent key={i}>{convertContent(content)}</SectionContent>
                          ))
                      }
                    </SubDetail>
                  ))}
                </SubDetailsList>
              )}
            </Section>
          ))}
        </ContentSection>

        {experience.links && experience.links.length > 0 && (
          <LinksSection>
            {experience.links.map((link, index) => (
              <LinkButton
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getIconByType(link.type)}
                <LinkText>{link.title || link.type}</LinkText>
              </LinkButton>
            ))}
          </LinksSection>
        )}
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

// 外部リンク用のスタイル
const ExternalLink = styled.a`
  color: #00a8ff;
  text-decoration: none;
  position: relative;
  
  &:hover {
    text-decoration: underline;
  }
  
  &::before {
    content: '🔗';
    font-size: 0.8em;
    margin-left: 4px;
    display: inline-block;
  }
`;

const LinksSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  flex-wrap: wrap;
  justify-content: center; // 追加：中央揃え
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.5rem;
  background: #222;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const LinkText = styled.span`
  font-size: 1rem;
`;

const IconWrapper = styled.div`
  background: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

export default ExperienceDetailPage;
