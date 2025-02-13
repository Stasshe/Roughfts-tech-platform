import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: relative;
  min-height: 450px;
  background: black;
  z-index: 2;
  margin-top: 150px;

  @media (max-width: 768px) {
    min-height: 100vh; /* スマホ時に高さを高くする */
  }
`;

const ProfileContainer = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  display: flex;
  align-items: center;
  z-index: 3;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    margin-top: 0;
    top: 60%;

    img {
      width: 100%;
      height: auto;
      max-width: 300px;
      margin-bottom: 2rem;
    }
  }
`;

const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-right: 30px;
`;

const ProfileInfo = styled.div`
  margin-left: 40px;

  h1 {
    margin: 0;
    width: 500px;
    font-size: 2.5em;
  }

  p {
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;

    h1 {
      font-size: 1.5em;
      width: auto;
    }

    p {
      font-size: 1rem;
      width: auto;
      margin: 0 1rem;
    }
  }
`;

interface ProfileSectionProps {
  id?: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ id }) => {
  const paragraphs = [
    "Hi! I'm Roughfts, and this blog is my digital playground where I showcase my coding prowess and share my journey in the tech world.",
    "Here, you'll find in-depth tutorials, tips, and insights on a range of topics including Node.js, Docker, web security, Firebase, and SNS web app development.",
    "Whether you're a fellow developer, a tech enthusiast, or someone just getting started, this blog is your go-to resource for mastering these technologies and staying ahead in the ever-evolving world of coding."
  ];

  return (
    <section id={id}>
      <Background>
        <ProfileContainer>
          <ProfileImage src="/assets/ico.png" alt="Profile Icon" />
          <ProfileInfo>
            <h1>Hi! I'm Roughfts.</h1>
            {paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </ProfileInfo>
        </ProfileContainer>
      </Background>
    </section>
  );
};
