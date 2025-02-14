import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { projects } from '../../data/projects';
import Head from 'next/head';
const WorksPage = () => {
  return (
    <Layout>
      <WorksContainer>
        <Head>
          <title>Roughfts Works</title>
        </Head>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Works
        </motion.h1>
        <WorksGrid>
          {Object.values(projects).map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <WorkCard href={`/works/${work.id}`}>
                <WorkImage src={work.images[0]} alt={work.title} />
                <WorkInfo>
                  <h2>{work.title}</h2>
                  <p>{work.description}</p>
                  <TechTags>
                    {work.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </TechTags>
                </WorkInfo>
              </WorkCard>
            </motion.div>
          ))}
        </WorksGrid>
      </WorksContainer>
    </Layout>
  );
};

const WorksContainer = styled.div`
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
  background: #000;
  color: white;

  h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
`;

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const WorkCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: white;
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const WorkImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const WorkInfo = styled.div`
  padding: 1.5rem;

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    opacity: 0.8;
    font-size: 0.9rem;
  }
`;

const TechTags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  span {
    background: #222;
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    font-size: 0.8rem;
    opacity: 0.8;
  }
`;

export default WorksPage; 