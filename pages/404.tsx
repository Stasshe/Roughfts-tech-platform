import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111;
  color: #fff;
  padding: 2rem;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 8rem;
  font-family: 'Playfair Display', serif;
  margin: 0;
  background: linear-gradient(to right, #fff, #666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Message = styled(motion.p)`
  font-size: 1.5rem;
  margin: 2rem 0;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 2px;
`;

const HomeLink = styled(motion.a)`
  color: #fff;
  text-decoration: none;
  border: 1px solid #fff;
  padding: 1rem 2rem;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #fff;
    transition: transform 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: #111;
    &:before {
      transform: translateX(100%);
    }
  }
`;

const NotFoundPage = () => {
  return (
    <Container>
      <ErrorCode
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        404
      </ErrorCode>
      <Message
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        The page you are looking for does not exist.
      </Message>
      <Link href="/" passHref>
        <HomeLink
          as={motion.a}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          Return Home
        </HomeLink>
      </Link>
    </Container>
  );
};

export default NotFoundPage;