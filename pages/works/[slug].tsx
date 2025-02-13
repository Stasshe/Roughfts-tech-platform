import { useRouter } from 'next/router';
import styled from 'styled-components';

const WorkDetail = styled.article`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const WorkHeader = styled.header`
  margin-bottom: 2rem;
`;

const WorkImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const WorkContent = styled.div`
  line-height: 1.6;
`;

const BackButton = styled.button`
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:hover {
    background: white;
    color: black;
  }
`;

const WorkDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // In a real app, you would fetch the work details based on the slug
  const workDetails = {
    title: "Project One",
    description: "Detailed description of the project",
    image: "/path-to-image.jpg",
    content: "Full project content goes here...",
    technologies: ["React", "TypeScript", "Node.js"],
    date: "2024"
  };

  return (
    <WorkDetail>
      <BackButton onClick={() => router.back()}>← Back</BackButton>
      
      <WorkHeader>
        <h1>{workDetails.title}</h1>
        <p>{workDetails.date}</p>
      </WorkHeader>

      <WorkImage src={workDetails.image} alt={workDetails.title} />

      <WorkContent>
        <h2>Overview</h2>
        <p>{workDetails.description}</p>

        <h2>Technologies Used</h2>
        <ul>
          {workDetails.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>

        <h2>Details</h2>
        <p>{workDetails.content}</p>
      </WorkContent>
    </WorkDetail>
  );
};

export default WorkDetailPage; 