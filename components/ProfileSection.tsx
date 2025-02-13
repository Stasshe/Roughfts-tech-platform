// ../components/ProfileSection.tsx
import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: relative;
  height: 300px;
  background: black;
  transform: skewY(-10deg); /* 左上から右下にかけての斜め */
`;

const ProfileContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  z-index: 5;
`;

const ProfileSection = () => {
  return (
    <Background>
      <ProfileContainer>
        <h1>プロフィール</h1>
        <p>ここにプロフィール情報を追加します。</p>
      </ProfileContainer>
    </Background>
  );
};

export default ProfileSection;
