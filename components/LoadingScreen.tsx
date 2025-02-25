import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasVisited, setHasVisited] = useState(false);
  const [gridLines, setGridLines] = useState([]);
  const [isExiting, setIsExiting] = useState(false);
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
        // フェードアウトの開始
        setTimeout(() => {
          setIsExiting(true);
          // フェードアウト完了後に実際にコンポーネントを非表示にする
          setTimeout(() => {
            setIsLoading(false);
            document.getElementById('__next')?.classList.add('loaded');
          }, 800); // フェードアウトアニメーションの時間
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
        animate={{ opacity: isExiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        
        <LoadingContent>
          <AnimationContainer>
            {/* 大きな円のアニメーション */}
            <CircleGroup
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              {/* 背景の輪 */}
              <BackgroundRing 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1.2, 0.8], 
                  opacity: [0.1, 0.4, 0.1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut"
                }}
              />
              
              {/* 複数の円がぶつかり合う効果 */}
              <OrbitingCircles>
                <OrbitCircle 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  <GlowingCircle 
                    size={60} 
                    color="rgba(65, 184, 255, 0.8)" 
                    distance={140}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </OrbitCircle>
                
                <OrbitCircle 
                  initial={{ rotate: 120 }}
                  animate={{ rotate: -240 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <GlowingCircle 
                    size={40} 
                    color="rgba(255, 100, 255, 0.8)" 
                    distance={120}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{ 
                      duration: 3.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </OrbitCircle>
                
                <OrbitCircle 
                  initial={{ rotate: 240 }}
                  animate={{ rotate: 600 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <GlowingCircle 
                    size={35} 
                    color="rgba(120, 255, 180, 0.8)" 
                    distance={100}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </OrbitCircle>
              </OrbitingCircles>
              
              {/* 中心の円 */}
              <CenterCircle
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.8, 1, 0.8],
                  boxShadow: [
                    '0 0 20px 2px rgba(255, 255, 255, 0.3)',
                    '0 0 40px 5px rgba(255, 255, 255, 0.6)',
                    '0 0 20px 2px rgba(255, 255, 255, 0.3)'
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </CircleGroup>

            <TextContainer>
              <WelcomeText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Welcome
              </WelcomeText>
            </TextContainer>
          </AnimationContainer>

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

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  position: relative;
  z-index: 2;
`;

const AnimationContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleGroup = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundRing = styled(motion.div)`
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
  filter: blur(2px);
`;

const OrbitingCircles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrbitCircle = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GlowingCircle = styled(motion.div)<{ size: number; color: string; distance: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: ${props => props.color};
  box-shadow: 0 0 20px ${props => props.color};
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - ${props => props.distance}px));
  filter: blur(5px);
`;

const CenterCircle = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 100%);
  box-shadow: 0 0 30px 3px rgba(255, 255, 255, 0.5);
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