import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import { useDispatch, useSelector } from 'react-redux';
import {
  LOAD_MY_INFO_REQUEST,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from '../reducers/user';

import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 로그인했다가 로그아웃 했을 때
  useEffect(() => {
    if (!(me && me.id)) {
      alert('로그인을 먼저 해야 합니다.');
      Router.push('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });

    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Profile;
