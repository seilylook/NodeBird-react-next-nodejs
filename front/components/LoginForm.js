import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({ setIsLoggedIn }) => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  // onFinish는 이미 preventDefault() 리렌더링을 막아주는 함수가 내장되어 있다.
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor='user_id'>아이디</label>
        <br />
        <Input name='user_id' value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor='user_password'>비밀번호</label>
        <br />
        <Input
          name='user_password'
          type='password'
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type='primary' htmlType='submit' loading={false}>
          로그인
        </Button>
        <Link href='/signup'>
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
