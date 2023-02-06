import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers';

import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';

const ButtonWrapper = styled(Button)`
  margin-top: 10px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
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
      <ButtonWrapper onClick={onLogout}>로그아웃</ButtonWrapper>
    </Card>
  );
};

export default UserProfile;
