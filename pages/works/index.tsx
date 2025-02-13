import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const WorkCard = styled(motion.div)`
  background: #111;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const WorkImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const WorkInfo = styled.div`
  padding: 1rem;
  h3 {
    margin: 0 0 0.5rem;
  }
  p {
    margin: 0;
    opacity: 0.8;
  }
`;

const Works = () => {
  const works = [
    {
      id: 1,
      title: "Project One",
      description: "A brief description of the project",
      image: "/path-to-image.jpg",
      slug: "project-one"
    },
    // Add more projects
  ];

  return (
    <WorksGrid>
      {works.map((work) => (
        <Link href={`/works/${work.slug}`} key={work.id}>
          <WorkCard
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.95 }}
          >
            <WorkImage src={work.image} alt={work.title} />
            <WorkInfo>
              <h3>{work.title}</h3>
              <p>{work.description}</p>
            </WorkInfo>
          </WorkCard>
        </Link>
      ))}
    </WorksGrid>
  );
};

export default Works; 