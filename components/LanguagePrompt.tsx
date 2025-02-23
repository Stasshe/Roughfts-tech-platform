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
        <Title>Welcome / ようこそ</Title>
        <ButtonContainer>
          <LanguageOption onClick={() => onSelectLanguage('en')}>
            <span>English</span>
            <Description>View in English</Description>
          </LanguageOption>
          <Divider />
          <LanguageOption onClick={() => onSelectLanguage('ja')}>
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
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  color: white;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 200;
  letter-spacing: 0.1em;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const LanguageOption = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 1.5rem;
    font-weight: 200;
    letter-spacing: 0.1em;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const Description = styled.small`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const Divider = styled.div`
  width: 1px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
`;

export default LanguagePrompt;
