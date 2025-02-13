import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { projects, Project } from '../../data/projects';

const WorkDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const project: Project | undefined = slug ? projects[slug as string] : undefined;

  if (!project) {
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
        <Header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1>{project.title}</motion.h1>
          <motion.p>{project.description}</motion.p>
        </Header>

        <TechStack>
          <h2>Technologies Used</h2>
          <TechList>
            {project.techStack.map((tech, index) => (
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
          {project.features.map((feature, index) => (
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

        <ImageGallery>
          {project.images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`${project.title} screenshot ${index + 1}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.2 }}
            />
          ))}
        </ImageGallery>
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

export default WorkDetailPage; 