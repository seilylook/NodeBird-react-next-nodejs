module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: String,
        required: true,
      },
      nickname: {
        type: String,
        required: true,
      },
      password: String,
    },
    {
      charset: 'utf8',
      collate: 'utf8-general-ci',
    }
  );
  User.associate = (db) => {};
  return User;
};
