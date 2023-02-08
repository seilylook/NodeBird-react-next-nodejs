import React, { useCallback, useRef, useState } from 'react';
import { Form, Input, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = () => {
  const [text, setText] = useState('');
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef();

  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText('');
  }, []);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      stype={{ margin: '10px 0 20px' }}
      encType='multipart/form-data'
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder='어떤 일이 있었나요?'
      />
      <div style={{ marginBottom: 10 }}>
        <input
          type='file'
          multiple
          hidden
          ref={imageInput}
          style={{ display: 'none' }}
        />
        <Button onClick={onClickImageUpload} style={{ marginTop: 5 }}>
          이미지 업로드
        </Button>
        <Button
          type='primary'
          style={{ float: 'right', marginTop: 5 }}
          htmlType='submit'
        >
          업로드
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
