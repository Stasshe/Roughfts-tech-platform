import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import LoadingScreen from './LoadingScreen';
import { useLanguage } from '../lib/LanguageContext';
import { translations } from '../lib/translations';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const isSlugPage = router.pathname.includes('[');
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    // Ensure content is hidden initially
    document.getElementById('__next')?.classList.remove('loaded');
    
    // Show content after a brief delay
    const showContent = setTimeout(() => {
      document.getElementById('__next')?.classList.add('loaded');
    }, 100);

    return () => clearTimeout(showContent);
  }, []);

  return (
    <LayoutWrapper>
      {!isSlugPage && <LoadingScreen />}
      <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} $isOpen={isMenuOpen}>
        <span></span>
        <span></span>
      </MenuButton>

      <AnimatePresence>
        {isMenuOpen && (
          <FullScreenMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LanguageSwitcher>
              <LanguageButton 
                $active={language === 'en'} 
                onClick={() => setLanguage('en')}
              >
                EN
              </LanguageButton>
              <LanguageDivider>/</LanguageDivider>
              <LanguageButton 
                $active={language === 'ja'} 
                onClick={() => setLanguage('ja')}
              >
                日本語
              </LanguageButton>
            </LanguageSwitcher>
            <MenuContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <nav>
                <MenuItem>
                  <Link href="/">{translations[language].menu.home}</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/works">{translations[language].menu.works}</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/experience">{translations[language].menu.experiences}</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/about">{translations[language].menu.about}</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/search">{translations[language].menu.search}</Link>
                </MenuItem>
              </nav>
            </MenuContent>
          </FullScreenMenu>
        )}
      </AnimatePresence>

      <main>{children}</main>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  background: #000;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const MenuButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  top: 30px;
  right: 40px;
  z-index: 1000;
  background: none;
  border: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  span {
    display: block;
    width: 100%;
    height: 1px;
    background: white;
    transition: 0.5s;
    transform-origin: center;

    &:first-child {
      transform: ${({ $isOpen }) =>
        $isOpen ? 'rotate(45deg) translate(2px, 2px)' : 'rotate(0)'};
    }

    &:last-child {
      transform: ${({ $isOpen }) =>
        $isOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'rotate(0)'};
    }
  }
`;

const FullScreenMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuContent = styled(motion.div)`
  text-align: center;
  
  nav {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const MenuItem = styled.div`
  margin: 1rem 0;
  
  a {
    color: white;
    text-decoration: none;
    font-size: 3rem;
    font-weight: 200;
    letter-spacing: 0.2em;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 1rem;

    &:hover {
      letter-spacing: 0.3em;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 1px;
      background: white;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover::after {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    a {
      font-size: 2rem;
    }
  }
`;

const MenuLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 3rem;
  font-weight: 200;
  letter-spacing: 0.2em;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    letter-spacing: 0.3em;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 1px;
    background: white;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 100%;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LanguageSwitcher = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LanguageButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 4px 8px;
  
  &:hover {
    color: white;
  }
`;

const LanguageDivider = styled.span`
  color: rgba(255, 255, 255, 0.3);
`;

export default Layout;
