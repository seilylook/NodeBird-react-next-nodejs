const express = require('express');
const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

// from app.use('/posts/, postsRouter);
// GET /posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          // 모든 게시물의 작성자 정보
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          // 댓글 작성자의 정보
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          // 좋아요 누른 사람 정보
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
