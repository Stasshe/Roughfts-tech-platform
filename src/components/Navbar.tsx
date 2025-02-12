import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </MenuButton>

      <AnimatePresence>
        {isOpen && (
          <Menu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            <MenuItems>
              <MenuItem onClick={() => setIsOpen(false)}>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem onClick={() => setIsOpen(false)}>
                <Link to="/products">Products</Link>
              </MenuItem>
              <MenuItem onClick={() => setIsOpen(false)}>
                <Link to="/contact">Contact</Link>
              </MenuItem>
            </MenuItems>
          </Menu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  padding: 2rem;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;

  span {
    display: block;
    width: 25px;
    height: 2px;
    background: white;
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
  padding: 6rem 2rem;
`;

const MenuItems = styled.ul`
  list-style: none;
`;

const MenuItem = styled.li`
  margin: 2rem 0;
  font-size: 1.5rem;
  
  a {
    transition: 0.3s;
    
    &:hover {
      opacity: 0.7;
    }
  }
`;

export default Navbar; 