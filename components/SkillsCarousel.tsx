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

const getSkillIcon = (skillName: string): string => {
  const iconMap: { [key: string]: string } = {
    // Frontend icons
    'React/Next.js': '⚛️',
    'TypeScript': '📝',
    'HTML5/CSS': '🎨',
    'Responsive Design': '📱',
    // Backend icons
    'Node.js': '🟢',
    'Python': '🐍',
    'Firebase': '🔥',
    'RESTful APIs': '🔌',
    // Tools icons
    'Git/GitHub': '📂',
    'Docker': '🐳',
    'AWS': '☁️',
    'Network Security': '🔒'
  };
  return iconMap[skillName] || '⚡';
};

const SkillsCarousel: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [showArrows, setShowArrows] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const sections = [
    { title: 'Frontend', skills: skillsData.frontend },
    { title: 'Backend', skills: skillsData.backend },
    { title: 'Tools & Other', skills: skillsData.tools }
  ];

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setDirection('right');
      setActiveSection((prev) => (prev + 1) % 3);
    }, 5000); // Increased time for better readability

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  const handleScroll = (dir: 'left' | 'right') => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
    setDirection(dir);
    setActiveSection((prev) => {
      if (dir === 'right') {
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

  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
          <AnimatePresence mode="wait" initial={false}>
            <CarouselSlide
              key={`slide-${activeSection}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <SlideContent>
                <SectionTitle
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {sections[activeSection].title}
                </SectionTitle>
                <SkillsList
                  as={motion.div}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {sections[activeSection].skills.map((skill, index) => (
                    <motion.div
                      key={`${sections[activeSection].title}-${skill.name}-${index}`}
                      variants={itemVariants}
                      transition={{ duration: 0.5 }}
                    >
                      <SkillItem>
                        <SkillIcon>{getSkillIcon(skill.name)}</SkillIcon>
                        <SkillContent>
                          <SkillName>{skill.name}</SkillName>
                          <SkillDescription>{skill.description}</SkillDescription>
                        </SkillContent>
                      </SkillItem>
                    </motion.div>
                  ))}
                </SkillsList>
              </SlideContent>
            </CarouselSlide>
          </AnimatePresence>
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
  padding: 4rem 2rem 6rem; // Increased bottom padding
  position: relative;
  
  // Remove overflow: hidden to prevent cutoff
  
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
  margin-bottom: 2rem; // Add space at bottom
  min-height: 600px; // Add explicit height
`;

const CarouselTrack = styled.div`
  position: relative;
  width: 100%;
  min-height: 600px; // Match wrapper height
  padding-bottom: 3rem; // Add padding to prevent cutoff
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
  background: #111;
`;

const SlideContent = styled.div`
  width: 70%;
  max-width: 1200px;
  padding: 2rem;
  position: relative;
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
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(10px) scale(1.02);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }

  &:hover::before {
    transform: translateX(100%);
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
  padding-bottom: 2rem; // Add padding to prevent cutoff
  position: relative; // Ensure dots are always visible
  z-index: 2;
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

const SkillIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #333, #111); // グラデーション背景を追加
  border-radius: 12px;
  margin-right: 1rem;
  font-size: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 2;
`;
const SkillContent = styled.div`
  flex: 1;
`;

export default SkillsCarousel;
