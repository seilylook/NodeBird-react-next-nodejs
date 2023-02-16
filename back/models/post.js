module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: String,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4-general-ci',
    }
  );
  Post.associate = (db) => {};
  return Post;
};
