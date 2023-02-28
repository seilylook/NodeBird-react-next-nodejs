import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <PostCard post={singlePost}></PostCard>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      store.dispatch({
        type: LOAD_POST_REQUEST,
        data: params.id,
      });

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Post;
