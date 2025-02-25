import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '../lib/LanguageContext';

interface SkillItem {
  name: string;
  category: string;
  icon: string;
}

interface AboutSkillsSectionProps {
  skills: SkillItem[];
}

const AboutSkillsSection: React.FC<AboutSkillsSectionProps> = ({ skills }) => {
  const { language } = useLanguage();
  const isJapanese = language === 'ja';

  // アニメーション用の変数
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  // スキルをカテゴリーごとにグループ化
  const groupedSkills = skills.reduce<Record<string, SkillItem[]>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <SkillsSectionWrapper>
      <motion.h3 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="section-title"
      >
        {isJapanese ? 'スキル' : 'Skills'}
      </motion.h3>
      
      {Object.entries(groupedSkills).map(([category, items], categoryIndex) => (
        <CategorySection key={category}>
          <CategoryTitle
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {category}
          </CategoryTitle>
          
          <SkillsGrid
            as={motion.div}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {items.map((skill, index) => (
              <SkillItem
                key={`${category}-${skill.name}-${index}`}
                custom={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                  transition: { duration: 0.2 }
                }}
              >
                <SkillIconWrapper>
                  <SkillIcon>
                    {skill.icon.startsWith('http') ? (
                      <Image 
                        src={skill.icon} 
                        alt={skill.name} 
                        width={24} 
                        height={24} 
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    ) : (
                      skill.icon
                    )}
                  </SkillIcon>
                </SkillIconWrapper>
                <SkillName>{skill.name}</SkillName>
              </SkillItem>
            ))}
          </SkillsGrid>
        </CategorySection>
      ))}
    </SkillsSectionWrapper>
  );
};

const SkillsSectionWrapper = styled.div`
  margin-top: 6rem;
  padding: 2rem;
  
  .section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    font-weight: 300;
    letter-spacing: 3px;
    background: linear-gradient(to right, #fff, #888);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
`;

const CategorySection = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled(motion.h4)`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 300;
  letter-spacing: 2px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
  color: #ccc;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.2rem;
  }
`;

const SkillItem = styled(motion.div)`
  background: linear-gradient(145deg, #141414, #1d1d1d);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
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

const SkillIconWrapper = styled.div`
  margin-bottom: 1rem;
`;

const SkillIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #333, #1a1a1a);
  border-radius: 12px;
  font-size: 1.8rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.6rem;
  }
`;

const SkillName = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.5px;
`;

export default AboutSkillsSection;
