import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../components/Layout';

const Works = () => {
  const projects = [
    {
      id: 1,
      title: "Project One",
      category: "Web Security",
      image: "/project1.jpg",
      description: "A secure authentication system"
    },
    // Add more projects...
  ];

  return (
    <Layout>
      <WorksContainer>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Works
        </PageTitle>
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ImageContainer>
                <img src={project.image} alt={project.title} />
              </ImageContainer>
              <ProjectInfo>
                <h3>{project.title}</h3>
                <span>{project.category}</span>
                <p>{project.description}</p>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </WorksContainer>
    </Layout>
  );
};

const WorksContainer = styled.div`
  padding: 120px 5vw;
  min-height: 100vh;
  background: #000;
  color: white;
`;

const PageTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 200;
  letter-spacing: 0.2em;
  margin-bottom: 4rem;
  text-align: center;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background: #111;
  overflow: hidden;
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ProjectInfo = styled.div`
  padding: 2rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 300;
    margin: 0 0 0.5rem;
  }

  span {
    font-size: 0.9rem;
    color: #888;
    display: block;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #ccc;
  }
`;

export default Works; 