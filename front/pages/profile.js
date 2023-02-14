import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';

import { useSelector } from 'react-redux';

import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  const onClose = (e) => {
    console.log(e, 'I was closed');
  };

  // 로그인했다가 로그아웃 했을 때
  useEffect(() => {
    if (!(me && me.id)) {
      alert('로그인을 먼저 해야 합니다.');
      Router.push('/');
    }
  }, [me && me.id]);

  // 로그인 하지 않았을 때
  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird </title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉' data={me.Followings} />
        <FollowList header='팔로워' data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
