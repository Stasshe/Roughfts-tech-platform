import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Wrapper>
      <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </MenuButton>

      <AnimatePresence>
        {isMenuOpen && (
          <Menu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            <nav>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </nav>
          </Menu>
        )}
      </AnimatePresence>

      <main>{children}</main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #000;
  min-height: 100vh;
`;

const MenuButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 25px;
  padding: 0;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background: white;
    margin: 6px 0;
    transition: 0.3s;
  }
`;

const Menu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: #111;
  z-index: 99;
  padding: 80px 40px;

  nav ul {
    list-style: none;
    padding: 0;
    
    li {
      margin: 20px 0;
      
      a {
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
        transition: 0.3s;
        
        &:hover {
          color: #666;
        }
      }
    }
  }
`;

export default Layout; 