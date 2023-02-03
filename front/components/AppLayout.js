import React from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href='/'>
          <a>NoeBird</a>
        </Link>
      </div>
      <div>
        <Link href='/profile'>
          <a>Profile</a>
        </Link>
      </div>
      <div>
        <Link href='/signup'>
          <a>SignUp</a>
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppLayout;
