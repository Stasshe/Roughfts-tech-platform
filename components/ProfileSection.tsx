import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../lib/LanguageContext';
const Background = styled.div`
  position: relative;
  min-height: 450px;
  background: black;
  z-index: 2;
  margin-top: 50px;

  @media (max-width: 768px) {
    min-height: 80vh;
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
  }
`;

const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-right: 30px;

  @media (max-width: 768px) {
    margin-right: 0px;
    width: 60vw;
    height: 60vw;
    max-width: 300px;
    max-height: 300px;
    margin-bottom: 2rem;
  }
`;

const ProfileInfo = styled.div`
  h1 {
    margin: 0;
    width: 500px;
    font-size: 2.5em;
  }

  p {
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    width: 90vw;
    padding: 0;
    margin-left: 0px;
    text-align: center; /* Center the text */

    h1 {
      font-size: 1.5em;
      width: auto;
      margin-bottom: 1rem; /* Add more space below h1 */
    }

    p {
      font-size: 0.8rem;
      width: auto;
      margin: 0 1rem;
    }
  }
`;

interface ProfileSectionProps {
  id?: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ id }) => {
  const { language } = useLanguage();

  const paragraphs = [
    "Hi! I'm Roughfts, and this blog is my digital playground where I showcase my coding prowess and share my journey in the tech world.",
    "Here, you'll find in-depth tutorials, tips, and insights on a range of topics including Node.js, Docker, web security, Firebase, and SNS web app development.",
    "Whether you're a fellow developer, a tech enthusiast, or someone just getting started, this blog is your go-to resource for mastering these technologies and staying ahead in the ever-evolving world of coding."
  ];
  const paragraphs_ja = [
    "こんにちは!Roughftsです。このブログは、私のコーディングの腕前を披露し、テックワールドでの旅を共有するデジタルプレイグラウンドです。",
    "ここでは、Node.js、Docker、Webセキュリティ、Firebase、SNS Webアプリ開発など、さまざまなトピックについての詳細なチュートリアル、ヒント、洞察を紹介しています。",
    "あなたが開発者仲間、テック愛好家、または初心者であるかどうかに関係なく、このブログはこれらのテクノロジーをマスターし、常に進化し続けるコーディングの世界で先を行くための必読リソースです。"
  ]

  return (
    <section id={id}>
      <Background>
        <ProfileContainer>
          <ProfileImage src="/assets/ico.png" alt="Profile Icon" />
            <ProfileInfo>
            <h1>Hi! I'm Roughfts.</h1>
            {(language === 'ja' ? paragraphs_ja : paragraphs).map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            </ProfileInfo>
        </ProfileContainer>
      </Background>
    </section>
  );
};
