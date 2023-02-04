import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';

const ButtonWrapper = styled(Button)`
  margin-top: 10px;
`;

const UserProfile = ({ setIsloggedIn }) => {
  const onLogout = useCallback(() => {
    setIsloggedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          띠링
          <br />
        </div>,
        <div key='followings'>
          팔로잉
          <br />
        </div>,
        <div key='followers'>
          팔로워
          <br />
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>SL</Avatar>} title='seilylook'></Card.Meta>
      <ButtonWrapper onSubmit={onLogout}>로그아웃</ButtonWrapper>
    </Card>
  );
};

export default UserProfile;
