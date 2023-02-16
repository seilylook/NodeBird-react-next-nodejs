module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      src: {
        type: String,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8-general-ci',
    }
  );
  Image.associate = (db) => {};
  return Image;
};
