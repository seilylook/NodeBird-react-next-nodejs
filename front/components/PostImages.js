import React from 'react';
import PropTypes from 'prop-types';

const PostImages = ({ images }) => {
  return <div>waiting...</div>;
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
