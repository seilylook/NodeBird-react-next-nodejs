module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      name: {
        type: String,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4-general-ci',
    }
  );
  Hashtag.associate = (db) => {};
  return Hashtag;
};
