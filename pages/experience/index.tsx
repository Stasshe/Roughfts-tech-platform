import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ExperienceContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ExperienceCard = styled(motion.div)`
  background: #111;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Senior Developer",
      company: "Tech Company",
      date: "2022-2024",
      description: "Brief description of role and achievements",
      slug: "senior-developer-tech-company"
    },
    // Add more experiences
  ];

  return (
    <ExperienceContainer>
      {experiences.map((exp) => (
        <Link href={`/experience/${exp.slug}`} key={exp.id}>
          <ExperienceCard
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3>{exp.title}</h3>
            <h4>{exp.company}</h4>
            <p>{exp.date}</p>
            <p>{exp.description}</p>
          </ExperienceCard>
        </Link>
      ))}
    </ExperienceContainer>
  );
};

export default Experience; 