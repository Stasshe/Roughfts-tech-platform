import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: relative;
  height: 600px; /* 高さを少し増やす */
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
  top: 50%; /* プロフィールの位置を調整 */
  left: 50%;
  transform: translate(-50%, -50%) skewY(-10deg);
  color: white;
  text-align: left;
  display: flex;
  align-items: center;
  z-index: 3;
`;

const ProfileImage = styled.img`
  width: 250px; /* 画像の大きさを調整 */
  height: 250px; /* 画像の大きさを調整 */
  border-radius: 50%; /* 円形にする */
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  h1 {
    margin: 0;
    width:500px;
    font-size: 2.5em;
  }
  p {
    margin-top: 10px;
  }
`;

const ProfileSection = () => {
  return (
    <Background>
      <ProfileContainer>
        <ProfileImage src="/assets/ico.png" alt="Profile Icon" />
        <ProfileInfo>
          <h1>Hi! I'm Roughfts.</h1>
          <p>ここに自己紹介文を追加します。</p>
        </ProfileInfo>
      </ProfileContainer>
    </Background>
  );
};

export default ProfileSection;
