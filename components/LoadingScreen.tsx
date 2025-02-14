import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Check if content is loaded quickly
    const contentLoadCheck = setTimeout(() => {
      setContentReady(true);
    }, 100); // Check if content is ready within 100ms

    // Check if this is the first visit
    const visited = localStorage.getItem('hasVisited');
    if (!visited) {
      setHasVisited(false);
      localStorage.setItem('hasVisited', 'true');
      
      // Show loading screen for first visit
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => {
        clearTimeout(timer);
        clearTimeout(contentLoadCheck);
      };
    } else {
      // Skip loading screen for returning visitors
      setIsLoading(false);
    }

    return () => clearTimeout(contentLoadCheck);
  }, []);

  // Don't show loading if content is ready quickly or if already visited
  if (!isLoading || hasVisited || contentReady) return null;

  return (
    <LoadingWrapper
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <LoadingContent>
        <LogoContainer>
          {/* Outer rotating circle */}
          <motion.div
            initial={{ rotate: 0, scale: 0 }}
            animate={{ 
              rotate: 360,
              scale: 1
            }}
            transition={{
              duration: 2,
              ease: "easeOut"
            }}
          >
            <OuterCircle />
          </motion.div>

          {/* Inner pulsing circle */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <InnerCircle />
          </motion.div>

          {/* Text animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <WelcomeText>Welcome</WelcomeText>
          </motion.div>
        </LogoContainer>

        <LoadingBar
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </LoadingContent>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const LogoContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OuterCircle = styled.div`
  width: 120px;
  height: 120px;
  border: 2px solid white;
  border-radius: 50%;
  position: absolute;
`;

const InnerCircle = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  position: absolute;
`;

const WelcomeText = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  position: absolute;
  width: 200px;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingBar = styled(motion.div)`
  height: 1px;
  background: white;
  position: absolute;
  bottom: 20%;
  left: 20%;
  right: 20%;
`;

export default LoadingScreen; 