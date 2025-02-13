import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: relative;
  height: 650px; /* 高さを少し増やす */
  background: black;
  transform: skewY(10deg);
  z-index: 2;
  margin-top: 250px; /* マージンを少し増やす */
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 350px; /* 高さを増やす */
    background: black;
    transform: skewY(-10deg);
    z-index: 1;
  }
`;

const ProfileContainer = styled.div`
  position: absolute;
  top: 45%; /* プロフィールの位置を調整 */
  left: 50%;
  transform: translate(-50%, -50%) skewY(-10deg);
  color: white;
  display: flex;
  align-items: center;
  z-index: 3;
`;

const ProfileImage = styled.img`
  width: 250px; /* 画像の大きさを調整 */
  height: 250px; /* 画像の大きさを調整 */
  border-radius: 50%; /* 円形にする */
  margin-right: 30px; /* 画像とテキストの間に余白を設定 */
`;

const ProfileInfo = styled.div`
  margin-left: 30px; /* テキストの左側に余白を追加 */
  h1 {
    margin: 0;
    width: 500px;
    font-size: 2.5em;
  }
  p {
    margin-top: 10px;
  }
`;

export const ProfileSection = () => {
  const paragraphs = [
    "Hi! I'm Roughfts, and this blog is my digital playground where I showcase my coding prowess and share my journey in the tech world.",
    "Here, you'll find in-depth tutorials, tips, and insights on a range of topics including Node.js, Docker, web security, Firebase, and SNS web app development.",
    "Whether you're a fellow developer, a tech enthusiast, or someone just getting started, this blog is your go-to resource for mastering these technologies and staying ahead in the ever-evolving world of coding."
  ];

  return (
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
  );
};
