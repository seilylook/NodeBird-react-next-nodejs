const passport = require('passport');
const local = require('./local');
const { User, Post } = require('../models');

module.exports = () => {
  // 유저 정보 중에 id, cookie랑 묶어서 저장해주는 것
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });

      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
