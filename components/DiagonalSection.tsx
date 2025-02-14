import { motion } from 'framer-motion';
import styled from 'styled-components';

const DiagonalSection = () => {
  return (
    <Section>
      <DiagonalDiv />
      <Content
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>My Expertise</h2>
        <SkillsList>
          <li>Node.js</li>
          <li>Docker</li>
          <li>Web Security</li>
          <li>Firebase</li>
          <li>SNS Web Apps</li>
        </SkillsList>
      </Content>
    </Section>
  );
};

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  background: #000;
  overflow: hidden;
`;

const DiagonalDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #111;
  transform: skewY(-10deg);
  transform-origin: top left;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  color: white;
  padding: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  
  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  @media (max-width: 768px) {
    h2 {
      text-align:center;
    }
  }
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  
  li {
    font-size: 1.5rem;
    padding: 1rem;
    background: #000;
    border-radius: 4px;
    text-align: center;
  }
  @media (max-width: 768px) {
    gap: 1rem;
    li {
      font-size: 1.0rem;
      padding: 0rem;
    }
  } 
`;

export default DiagonalSection; 