import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Menu, Input, Row, Col } from 'antd';
import Router from 'next/router';

import Link from 'next/link';

import useInput from '../hooks/useInput';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode='horizontal'>
        <Menu.Item key='home'>
          <Link href='/'>
            <a>NodeBird</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='profile'>
          <Link href='/profile'>
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href='https://github.com/seilylook'
            target='_blank'
            rel='noreferrer noopener'
          >
            Made by Seilylook
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppLayout;
