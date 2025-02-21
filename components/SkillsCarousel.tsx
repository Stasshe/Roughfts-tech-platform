import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import skillDescriptions from '../data/skills/descriptions.json';
import skillIcons from '../data/skills/icons.json';

interface Skill {
  name: string;
  description: string;
}

// Helper function to chunk array into groups of 4
const chunkArray = <T,>(arr: T[], size: number = 4): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const createSkillsData = () => {
  const rawData = {
    frontend: [
      { name: 'React/Next.js' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'HTML5/CSS3' },
      { name: 'Styled Components' },
      { name: 'Swift' }
    ],
    backend: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'Firebase' },
      { name: 'Python' },
      { name: 'AWS' },
      { name: 'Google Cloud' }
    ],
    devops: [
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'Bash' }
    ],
    other: [
      { name: 'Unity' },
      { name: 'Blender' },
      { name: 'OpenCV' },
      { name: 'LaTeX' },
      { name: 'WordPress' },
      { name: 'RESTful APIs' },
      { name: 'Network Security' }
    ]
  };

  // Process each category and add description and icon
  const processed = Object.entries(rawData).map(([category, skills]) => {
    const enrichedSkills = skills.map(skill => ({
      ...skill,
      description: skillDescriptions[skill.name],
      icon: skillIcons[skill.name] || null
    }));
    
    // Split into chunks of 4
    const chunks = chunkArray(enrichedSkills, 4);
    return chunks.map((chunk, i) => ({
      title: chunks.length > 1 ? `${category} ${i + 1}` : category,
      skills: chunk
    }));
  }).flat();

  return processed;
};

const getSkillIcon = (skill: { name: string; icon: string | null }): { type: 'svg' | 'emoji'; content: string } => {
  if (!skill.icon) {
    // Fallback emojis for conceptual skills
    const fallbackEmojis: { [key: string]: string } = {
      'RESTful APIs': '🔌',
      'Network Security': '🔒'
    };
    return {
      type: 'emoji',
      content: fallbackEmojis[skill.name] || '⚡'
    };
  }
  
  return {
    type: 'svg',
    content: skill.icon
  };
};

const SkillsCarousel: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [showArrows, setShowArrows] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const sections = createSkillsData();

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setDirection('right');
      setActiveSection((prev) => (prev + 1) % sections.length);
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
        return (prev + 1) % sections.length;
      }
      return (prev - 1 + sections.length) % sections.length;
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
          {showArrows && activeSection < sections.length - 1 && (
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
                        <SkillIcon>
                          {getSkillIcon(skill).type === 'svg' ? (
                            <Image
                              src={getSkillIcon(skill).content}
                              alt={skill.name}
                              width={24}
                              height={24}
                            />
                          ) : (
                            getSkillIcon(skill).content
                          )}
                        </SkillIcon>
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
    margin-bottom: 3rem;
    background: linear-gradient(to right, #fff, #888);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 720px; // Fixed height to accommodate 5 items + title + navigation
  display: flex;
  flex-direction: column;
`;

const CarouselTrack = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

const CarouselSlide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  background: #111;
`;

const SlideContent = styled.div`
  width: 90%;
  max-width: 1200px;
  padding: 2.5rem 2rem; // Increased padding
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 70%;
  }
`;

const SectionTitle = styled(motion.h3)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem; // Increased margin
  text-align: center;
  background: linear-gradient(45deg, #fff, #888);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem; // Increased gap
  width: 100%;
  flex: 1;
  overflow: visible;
  padding: 0rem 0; // Add vertical padding
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem; // Slightly reduced padding
  height: 80px; // Increased height for better spacing
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

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
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

  @media (max-width: 768px) {
    font-size: 1.2rem;
    white-space: normal;
    text-align: center;
  }
`;

const SkillDescription = styled.p`
  opacity: 0.8;
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
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
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  position: relative;
  z-index: 2;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: brightness(0) invert(1); // Make icons pure white

    @media (max-width: 768px) {
      width: 32px;
      height: 32px;
    }
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

const SkillContent = styled.div`
  flex: 1;
`;

export default SkillsCarousel;
