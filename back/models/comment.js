module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
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
  Comment.associate = (db) => {};
  return Comment;
};
