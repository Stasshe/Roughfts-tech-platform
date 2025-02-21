import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  description: string;
}

const skillsData = {
  frontend: [
    { name: 'React/Next.js', description: 'Building modern, responsive web applications with React and Next.js framework' },
    { name: 'TypeScript', description: 'Writing type-safe code to prevent runtime errors and improve maintainability' },
    { name: 'HTML5/CSS', description: 'Creating structured, semantic markup and stylish designs' },
    { name: 'Responsive Design', description: 'Ensuring applications work beautifully across all device sizes' }
  ],
  backend: [
    { name: 'Node.js', description: 'Developing scalable server-side applications and APIs' },
    { name: 'Python', description: 'Building robust backend services and data processing systems' },
    { name: 'Firebase', description: 'Implementing real-time databases and authentication systems' },
    { name: 'RESTful APIs', description: 'Designing and implementing REST APIs for client-server communication' }
  ],
  tools: [
    { name: 'Git/GitHub', description: 'Version control and collaborative development workflows' },
    { name: 'Docker', description: 'Containerizing applications for consistent deployment' },
    { name: 'AWS', description: 'Cloud infrastructure and serverless computing' },
    { name: 'Network Security', description: 'Implementing secure communication protocols and best practices' }
  ]
};

const SkillsCarousel: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const sections = [
    { title: 'Frontend', skills: skillsData.frontend },
    { title: 'Backend', skills: skillsData.backend },
    { title: 'Tools & Other', skills: skillsData.tools }
  ];

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 3000); // Changed to 3 seconds

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
    setActiveSection((prev) => {
      if (direction === 'right') {
        return (prev + 1) % 3;
      }
      return (prev - 1 + 3) % 3;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = e;
    const { width } = e.currentTarget.getBoundingClientRect();
    const threshold = 100;
    setShowArrows(clientX < threshold || clientX > width - threshold);
  };

  return (
    <SkillsSection
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2>Technical Skills</h2>
      <CarouselWrapper>
        <AnimatePresence>
          {showArrows && activeSection > 0 && (
            <StyledArrowButton
              as={motion.button}
              left
              onClick={() => handleScroll('left')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ←
            </StyledArrowButton>
          )}
          {showArrows && activeSection < 2 && (
            <StyledArrowButton
              as={motion.button}
              right
              onClick={() => handleScroll('right')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              →
            </StyledArrowButton>
          )}
        </AnimatePresence>

        <CarouselTrack>
          {sections.map((section, sectionIndex) => (
            <CarouselSlide
              key={section.title}
              initial={false}
              animate={{
                x: `${(sectionIndex - activeSection) * 100}%`,
                opacity: sectionIndex === activeSection ? 1 : 0.3
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <SlideContent>
                <SectionTitle
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {section.title}
                </SectionTitle>
                <SkillsList>
                  {section.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <SkillItem>
                        <SkillName>{skill.name}</SkillName>
                        <SkillDescription>{skill.description}</SkillDescription>
                      </SkillItem>
                    </motion.div>
                  ))}
                </SkillsList>
              </SlideContent>
            </CarouselSlide>
          ))}
        </CarouselTrack>
      </CarouselWrapper>

      <Navigation>
        {sections.map((_, index) => (
          <NavigationDot
            key={index}
            $active={activeSection === index}
            onClick={() => setActiveSection(index)}
            type="button"
          />
        ))}
      </Navigation>
    </SkillsSection>
  );
};

const StyledMotionDiv = styled(motion.div)``;

const StyledArrowButton = styled.button<{ left?: boolean; right?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.left ? 'left: 20px;' : 'right: 20px;'};
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  z-index: 10;
  backdrop-filter: blur(5px);
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SkillsSection = styled.section`
  min-height: 80vh;
  background: #000;
  color: white;
  padding: 4rem 2rem;
  overflow: hidden;
  position: relative;

  h2 {
    font-size: 3rem;
    font-weight: 200;
    text-align: center;
    letter-spacing: 0.2em;
    margin-bottom: 4rem;
    background: linear-gradient(to right, #fff, #888);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: 600px; // Add explicit height
`;

const CarouselTrack = styled.div`
  position: relative;
  width: 100%;
  min-height: 600px; // Match wrapper height
`;

const CarouselSlide = styled(motion.div)`
  position: absolute;
  width: 100%;
  min-height: 600px; // Match wrapper height
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  will-change: transform;
`;

const SlideContent = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  min-height: 100%; // Fill parent height
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled(motion.h3)`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(45deg, #fff, #888);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  flex: 1; // Take remaining space
  margin-bottom: 2rem; // Add space for navigation dots
`;

const SkillItem = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  align-items: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(10px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const SkillName = styled.h4`
  font-size: 1.4rem;
  margin: 0;
  background: linear-gradient(45deg, #fff, #888);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  white-space: nowrap;
`;

const SkillDescription = styled.p`
  opacity: 0.8;
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const NavigationDot = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => $active ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

export default SkillsCarousel;
