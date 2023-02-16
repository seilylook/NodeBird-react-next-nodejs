module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // belongsTo 때문에 아래와 같은 column을 만들어준다.
      // UserId: 1,
      // PostId: 3,
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4-general-ci',
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
