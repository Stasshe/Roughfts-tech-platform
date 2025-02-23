import styled from 'styled-components';
import { motion } from 'framer-motion';

interface LanguagePromptProps {
  onSelectLanguage: (lang: 'en' | 'ja') => void;
}

const LanguagePrompt = ({ onSelectLanguage }: LanguagePromptProps) => {
  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PromptContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <Title>Welcome<br />ようこそ</Title>
        <ButtonContainer>
          <LanguageOption 
            onClick={() => onSelectLanguage('en')}
            whileTap={{ scale: 0.95 }}
          >
            <span>English</span>
            <Description>View in English</Description>
          </LanguageOption>
          <Divider />
          <LanguageOption 
            onClick={() => onSelectLanguage('ja')}
            whileTap={{ scale: 0.95 }}
          >
            <span>日本語</span>
            <Description>日本語で見る</Description>
          </LanguageOption>
        </ButtonContainer>
      </PromptContainer>
    </Overlay>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
`;

const PromptContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: clamp(1.5rem, 5vw, 3rem);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  margin: 0 1rem;
`;

const Title = styled.h2`
  color: white;
  font-size: clamp(1.5rem, 5vw, 2rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  text-align: center;
  font-weight: 200;
  letter-spacing: 0.1em;
  line-height: 1.4;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LanguageOption = styled(motion.button)`
  background: none;
  border: none;
  color: white;
  padding: clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  span {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    font-weight: 200;
    letter-spacing: 0.1em;
  }

  &:hover {
    transform: translateY(-5px);
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const Description = styled.small`
  color: rgba(255, 255, 255, 0.6);
  font-size: clamp(0.8rem, 2.5vw, 0.9rem);
`;

const Divider = styled.div`
  width: 1px;
  height: clamp(30px, 8vw, 50px);
  background: rgba(255, 255, 255, 0.2);

  @media (max-width: 480px) {
    width: 80%;
    height: 1px;
  }
`;

export default LanguagePrompt;
