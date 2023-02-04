import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  return (
    <Form>
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
      <div>
        <Button type='primary' htmlType='submit' loading={false}>
          로그인
        </Button>
        <Link href='/signup'>
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
