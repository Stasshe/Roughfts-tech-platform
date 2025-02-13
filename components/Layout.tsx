import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <LayoutWrapper>
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
            <MenuContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <nav>
                <MenuItem>
                  <Link href="/">HOME</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/works">WORKS</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/experience">EXPERIENCES</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/about">ABOUT</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/search">SEARCH</Link>
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
`;

export default Layout;
