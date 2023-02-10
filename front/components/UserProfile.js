import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';

const ButtonWrapper = styled(Button)`
  margin-top: 10px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
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
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      ></Card.Meta>
      <ButtonWrapper onClick={onLogout} loading={isLoggingOut}>
        로그아웃
      </ButtonWrapper>
    </Card>
  );
};

export default UserProfile;
