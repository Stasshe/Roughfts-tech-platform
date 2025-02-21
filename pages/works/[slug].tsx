import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useState } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import { getWorkContent } from '../../lib/contentManager';
import { WorkContent } from '../../types/content';
import ProjectData from '../../lib/projectData';
import Link from 'next/link';

interface WorkDetailPageProps {
  workContent: WorkContent | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = ProjectData.getInstance().getAllProjects();
  const paths = projects.map((project) => ({
    params: { slug: project.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<WorkDetailPageProps> = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const workContent = ProjectData.getInstance().getWorkContent(slug, locale || 'en');

  return {
    props: {
      workContent,
    },
  };
};

const WorkDetailPage = ({ workContent: initialWorkContent }: WorkDetailPageProps) => {
  const router = useRouter();
  const { language, getLocalizedContent } = useLanguage();
  const { slug } = router.query;

  // Get localized content based on current language
  const workContent = getLocalizedContent('project', slug as string) || initialWorkContent;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  if (!workContent) {
    return (
      <Layout>
        <WorkContainer>
          <Header>
            <motion.h1>Project Not Found</motion.h1>
            <motion.button onClick={() => router.push('/works')}>
              Return to Works
            </motion.button>
          </Header>
        </WorkContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <WorkContainer>
        <motion.div
          style={{ position: 'absolute', top: '3rem', left: '3rem' }}
          whileHover={{ scale: 1.1, color: '#fff' }}
        >
          <Link href="/works" style={{ color: '#ccc', textDecoration: 'none' }}>
            ←Return to Works
          </Link>
        </motion.div>
        <Header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1>{workContent.title}</motion.h1>
          <motion.p>{workContent.description}</motion.p>
        </Header>

        {workContent.highlights && (
          <HighlightsSection>
            {workContent.highlights.map((highlight: any, index: number) => (
              <HighlightCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <HighlightValue>{highlight.value}</HighlightValue>
                <HighlightTitle>{highlight.title}</HighlightTitle>
                <HighlightDescription>{highlight.description}</HighlightDescription>
              </HighlightCard>
            ))}
          </HighlightsSection>
        )}

        <ImageGallery>
          {workContent.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedImage(image)}
            >
              <GalleryImage src={image} alt={`${workContent.title} screenshot ${index + 1}`} />
            </motion.div>
          ))}
        </ImageGallery>

        {workContent.architecture && (
          <ArchitectureSection>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              System Architecture
            </motion.h2>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
              <a href={workContent.architecture.diagram} target="_blank" rel="noopener noreferrer">
                <motion.img
                  src={workContent.architecture.diagram}
                  alt="Architecture Diagram"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }} // Increased scale on hover, no rotation
                />
              </a>
            </div>
            <motion.p style={{ marginTop: '1rem' }}>{workContent.architecture.description}</motion.p>
          </ArchitectureSection>
        )}

        <TechStack>
          <h2>Technologies Used</h2>
          <TechList>
            {workContent.techStack.map((tech, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {tech}
              </motion.li>
            ))}
          </TechList>
        </TechStack>

        <FeaturesSection>
          {workContent.features.map((feature, index) => (
            <FeatureBlock
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3>{feature.title}</h3>
              <ul>
                {feature.details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </FeatureBlock>
          ))}
        </FeaturesSection>

        {workContent.demoVideo && (
          <DemoSection>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              See it in Action
            </motion.h2>
            <motion.video
              controls
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <source src={workContent.demoVideo} type="video/mp4" />
            </motion.video>
          </DemoSection>
        )}

        <AnimatePresence>
          {selectedImage && (
            <Lightbox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.img
                src={selectedImage}
                alt="Enlarged view"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              />
            </Lightbox>
          )}
        </AnimatePresence>
      </WorkContainer>
    </Layout>
  );
};

const WorkContainer = styled.div`
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
    font-size: 3.5rem;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    opacity: 0.8;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const TechStack = styled.div`
  margin-bottom: 4rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;

  li {
    background: #111;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-size: 0.9rem;
  }
`;

const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureBlock = styled(motion.div)`
  background: #111;
  padding: 2rem;
  border-radius: 12px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #fff;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      position: relative;
      opacity: 0.8;

      &:before {
        content: '→';
        position: absolute;
        left: 0;
        color: #888;
      }
    }
  }
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const HighlightsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const HighlightCard = styled(motion.div)`
  background: #111;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
`;

const HighlightValue = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const HighlightTitle = styled.div`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 0.5rem;
`;

const HighlightDescription = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ArchitectureSection = styled.div`
  margin: 4rem 0;
  text-align: center;

  img {
    max-width: 100%;
    margin: 2rem 0;
  }

  p {
    opacity: 0.8;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const DemoSection = styled.div`
  margin: 4rem 0;
  text-align: center;

  video {
    max-width: 100%;
    margin-top: 2rem;
    border-radius: 8px;
  }
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;

  img {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export default WorkDetailPage; 
