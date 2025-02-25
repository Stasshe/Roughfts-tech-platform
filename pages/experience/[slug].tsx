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
import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // ダークテーマのスタイルをインポート

interface ExperienceDetailPageProps {
  experience: Gists | null;
  codeContent: string | null;
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
  let codeContent: string | null = null;
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    experience = JSON.parse(fileContent) as Gists;

    if (slug === 'skymenu') {
      codeContent = fs.readFileSync(path.join(process.cwd(), 'public', 'scripts', 'IDturtle.py'), 'utf8');
    }
  } catch (error) {
    console.error(`Error loading experience content: ${error}`);
  }

  return {
    props: {
      experience,
      codeContent,
    },
  };
};

// 単一画像用のコンテナを更新
const SingleImageContainer = styled.div`
  margin: 1.5rem 0;
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%; // 横長画像用に100%に変更
    height: auto;
    max-height: 600px; // 最大高さを増加
  }
`;

// 3枚横並び用のコンテナを更新
const ThreeImagesContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  justify-content: center;
  width: 100%;

  img {
    flex: 1;
    max-width: calc(33.333% - 0.67rem);
    height: auto;
    max-height: 600px;
    object-fit: contain;
  }

  // タブレット以下でスクロール可能な横並びに
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 2rem;
    -webkit-overflow-scrolling: touch;
    position: relative;
    scroll-snap-type: x mandatory;
    justify-content: flex-start; // 左寄せに変更
    scroll-behavior: smooth; // スムーズスクロールを追加
    
    // 右端のグラデーション
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 2rem;
      width: 80px;
      background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.9));
      pointer-events: none;
      opacity: 1;
    }

    // 左端のグラデーション（2枚目以降がある事を示す）
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 2rem;
      width: 80px;
      background: linear-gradient(to left, transparent 50%, rgba(0, 0, 0, 0.9));
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:has(:first-child:not(:hover)) {
      &::before {
        opacity: 1;
      }
    }
    
    // スクロール案内インジケーター
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 30%;
      height: 4px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 2px;
      animation: scrollIndicator 2s ease-in-out infinite;
      z-index: 1;
    }
    
    img {
      flex: 0 0 85%;
      max-width: none;
      scroll-snap-align: start; // 左寄せのスナップに変更
      scroll-snap-stop: always; // 確実にスナップさせる
    }
  }

  @keyframes scrollIndicator {
    0% {
      transform: translateX(0%);
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      transform: translateX(750%);
      opacity: 1;
    }
  }
`;

// 複数画像用のコンテナを更新
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 1.5rem 0;
  justify-content: center;
  width: 100%;

  img {
    flex: 0 1 auto;
    max-width: calc(75% - 0.75rem); // 横長画像用に75%に拡大
    height: auto;
    max-height: 600px; // 最大高さを増加
    width: auto;
  }

  &.three-images {
    img {
      max-width: calc(33.333% - 1rem);
    }
  }
`;

// 画像スタイルを更新
const ContentImage = styled.img`
  border-radius: 8px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
  
  // 複数画像の場合のスタイル（クラスなしの場合）
  height: auto;
  max-height: 600px;
  
  // 単一画像の場合のスタイル
  &.single-image {
    width: 100%;
    height: auto;
    max-height: 600px;
  }

  @media (max-width: 768px) {
    max-height: 400px; // モバイルでの高さは適度に制限
  }
`;

const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({ experience, codeContent }) => {
  const router = useRouter();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [imageLoadError, setImageLoadError] = useState<{[key: string]: boolean}>({});
  const [threeImagesRefs, setThreeImagesRefs] = useState<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el) {
      setThreeImagesRefs(prev => {
        if (!prev.includes(el)) {
          return [...prev, el];
        }
        return prev;
      });
      // 要素が追加されたら即座にスクロール位置を設定
      el.scrollLeft = 0;
    }
  };

  // ハイドレーションエラー対策
  useEffect(() => {
    setMounted(true);
  }, []);

  // コンポーネントのクリーンアップ時にrefsをリセット
  useEffect(() => {
    return () => {
      setThreeImagesRefs([]);
    };
  }, []);

  // シンタックスハイライトを適用するために useEffect を追加
  useEffect(() => {
    if (mounted) {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [mounted, codeContent, language]);

  // コードをクリップボードにコピーする関数
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // 成功時の処理（オプション）
        console.log('コードをクリップボードにコピーしました');
      },
      (err) => {
        console.error('コピーに失敗しました:', err);
      }
    );
  };

  if (!mounted) {
    return null;
  }

  // 画像変換関数を改善
  const convertContent = (text: string) => {
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const codeRegex = /\$\[([^\]]+)\]\(([^)]*)\)/g; // 言語指定のパターンを更新
    const parts = text.split(/(!?\[[^\]]*\]\([^)]+\)|\$\[[^\]]+\]\([^)]*\)|`[^`]+`)/); // Split by images and code
    const result = [];
    let images = [];

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (!part) continue;

        if (part.startsWith('![')) {
            // 画像の場合
            const match = part.match(/!\[([^\]]*)\]\(([^)]+)\)/);
            if (match && !imageLoadError[match[2]]) {
                images.push(
                    <ContentImage
                        key={`img-${i}`}
                        src={match[2]}
                        alt={match[1]}
                        className={images.length === 0 && !parts[i + 1]?.startsWith('![') ? 'single-image' : ''}
                        onError={() => setImageLoadError(prev => ({ ...prev, [match[2]]: true }))}
                    />
                );
            }
        } else if (part.startsWith('$[')) {
            // コードの場合 - 新しいパターン $[filename](language)
            const match = part.match(/\$\[([^\]]+)\]\(([^)]*)\)/);
            const filename = match ? match[1] : 'code';
            const language = match && match[2] ? match[2] : 'python';
            
            result.push(
                <CodeBlock key={`code-${i}`}>
                    <CodeHeader>
                        <CodeFilename>{filename}</CodeFilename>
                        <CopyButton 
                            onClick={() => copyToClipboard(codeContent || '')}
                            title="クリップボードにコピー"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
                            </svg>
                        </CopyButton>
                    </CodeHeader>
                    <pre>
                        <code className={language}>
                            {codeContent}
                        </code>
                    </pre>
                </CodeBlock>
            );
        } else if (part.startsWith('`') && part.endsWith('`')) {
            // インラインコードの場合
            const code = part.substring(1, part.length - 1);
            result.push(
                <InlineCode key={`inline-code-${i}`}>
                    {code}
                </InlineCode>
            );
        } else {
            // テキストの場合、直前の画像グループがあれば追加
            if (images.length > 0) {
                result.push(
                    images.length === 1 ? (
                        <SingleImageContainer key={`img-group-${i}`}>
                            {images}
                        </SingleImageContainer>
                    ) : images.length === 3 ? (
                        <ThreeImagesContainer
                            key={`img-group-${i}`}
                            ref={addToRefs}
                        >
                            {images}
                        </ThreeImagesContainer>
                    ) : (
                        <ImageContainer key={`img-group-${i}`}>
                            {images}
                        </ImageContainer>
                    )
                );
                images = [];
            }
            if (part.trim()) {
                result.push(<span key={`text-${i}`}>{part}</span>);
            }
        }
    }

    // 残りの画像グループを追加
    if (images.length > 0) {
        result.push(
            images.length === 1 ? (
                <SingleImageContainer key="img-group-final">
                    {images}
                </SingleImageContainer>
            ) : images.length === 3 ? (
                <ThreeImagesContainer
                    key="img-group-final"
                    ref={addToRefs}
                >
                    {images}
                </ThreeImagesContainer>
            ) : (
                <ImageContainer key="img-group-final">
                    {images}
                </ImageContainer>
            )
        );
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

// コードブロックのスタイルを更新
const CodeBlock = styled.div`
  margin: 1.5rem 0;
  width: 100%;
  border-radius: 8px;
  overflow: hidden; // 子要素をはみ出さない
  border: 1px solid #3e4451;
  
  pre {
    margin: 0;
    padding: 1rem;
    overflow-x: auto;
    background: #282c34; // ダークなバックグラウンド
  }
  
  code {
    font-family: 'JetBrains Mono', 'Fira Code', 'Source Code Pro', Consolas, monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0;
    background: transparent;
  }
`;

// コードヘッダー部分のスタイル
const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e2127;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #3e4451;
  font-family: 'JetBrains Mono', 'Fira Code', 'Source Code Pro', Consolas, monospace;
`;

const CodeFilename = styled.div`
  color: #9da5b4;
  font-size: 0.85rem;
`;

const CopyButton = styled.button`
  background: transparent;
  border: none;
  color: #9da5b4;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #3e4451;
    color: #fff;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

// コードブロックのスタイルを追加
const InlineCode = styled.code`
  background-color: #282c34;
  color: #e06c75;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Source Code Pro', Consolas, monospace;
  font-size: 0.9em;
`;

export default ExperienceDetailPage;
