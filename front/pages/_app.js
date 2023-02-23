import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';

import { Provider } from 'react-redux';

const NodeBird = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Provider store={store}>
        <Head>
          <meta charSet='utf-8' />
          <title>NodeBird</title>
        </Head>
        <Component />
      </Provider>
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object,
};

export default wrapper.withRedux(NodeBird);
