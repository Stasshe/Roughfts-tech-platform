import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasVisited, setHasVisited] = useState(false);
  const [gridLines, setGridLines] = useState([]);
  const router = useRouter();

  useEffect(() => {
    document.getElementById('__next')?.classList.remove('loaded');

    // 初回訪問のチェック
    const visited = localStorage.getItem('hasVisited');
    if (!visited) {
      setHasVisited(false);
      localStorage.setItem('hasVisited', 'true');
    } else {
      setHasVisited(true);
    }

    let timeoutDuration = 500;
    if (router.pathname === '/') timeoutDuration = 2000;
    else if (!hasVisited) timeoutDuration = 800;

    // プログレスバーのアニメーション
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(elapsed / timeoutDuration, 1);
      setProgress(newProgress);
      
      if (newProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          document.getElementById('__next')?.classList.add('loaded');
        }, 300);
      }
    };
    
    requestAnimationFrame(animate);
    
    return () => {};
  }, [router.pathname]);

  useEffect(() => {
    // 水平と垂直の線を生成
    const horizontalCount = Math.floor(window.innerHeight / 50);
    const verticalCount = Math.floor(window.innerWidth / 50);
    
    const lines = [];
    
    // 水平線
    for (let i = 0; i < horizontalCount; i++) {
      lines.push({
        horizontal: true,
        position: (i + 1) * 50,
        delay: i * 0.1
      });
    }
    
    // 垂直線
    for (let i = 0; i < verticalCount; i++) {
      lines.push({
        horizontal: false,
        position: (i + 1) * 50,
        delay: i * 0.1 + 0.5
      });
    }
    
    setGridLines(lines);
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <LoadingWrapper
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <GridBackground>
          {gridLines.map((line, index) => (
            <GridLine
              key={index}
              horizontal={line.horizontal}
              style={{
                top: line.horizontal ? `${line.position}px` : 0,
                left: line.horizontal ? 0 : `${line.position}px`,
                width: line.horizontal ? '100%' : '1px',
                height: line.horizontal ? '1px' : '100%'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: line.delay, duration: 0.5 }}
            />
          ))}
        </GridBackground>
        
        <LoadingContent>
          <LogoContainer>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <OuterCircle 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <CircleHighlight />
              </OuterCircle>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <InnerCircle 
                initial={{ rotate: 360 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <InnerCircleHighlight />
              </InnerCircle>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <CenterDot 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <TextContainer>
              <WelcomeText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Welcome
              </WelcomeText>
            </TextContainer>
          </LogoContainer>

          <LoadingBarContainer>
            <LoadingBarTrack>
              <LoadingBarFill
                style={{ width: `${progress * 100}%` }}
              />
            </LoadingBarTrack>
            <LoadingPercentage>
              {Math.round(progress * 100)}%
            </LoadingPercentage>
          </LoadingBarContainer>
        </LoadingContent>
      </LoadingWrapper>
    </AnimatePresence>
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
  overflow: hidden;
`;

const GridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.15;
`;

const GridLine = styled(motion.div)<{ horizontal?: boolean }>`
  position: absolute;
  background: linear-gradient(
    ${props => props.horizontal ? 'to right' : 'to bottom'},
    rgba(255,255,255,0), 
    rgba(255,255,255,0.4), 
    rgba(255,255,255,0)
  );
  ${props => props.horizontal ? 'height: 1px;' : 'width: 1px;'}
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  position: relative;
  z-index: 2;
`;

const LogoContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OuterCircle = styled(motion.div)`
  width: 150px;
  height: 150px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleHighlight = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
`;

const InnerCircle = styled(motion.div)`
  width: 100px;
  height: 100px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCircleHighlight = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
`;

const CenterDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  position: absolute;
`;

const TextContainer = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: -40px;
`;

const WelcomeText = styled(motion.h1)`
  color: white;
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  margin-right: -0.5em;
`;

const LoadingBarContainer = styled.div`
  width: 260px;
  text-align: center;
`;

const LoadingBarTrack = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
`;

const LoadingBarFill = styled.div`
  height: 100%;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.1s linear;
`;

const LoadingPercentage = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  letter-spacing: 0.2em;
`;

export default LoadingScreen;