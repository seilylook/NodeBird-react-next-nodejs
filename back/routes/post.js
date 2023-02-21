const express = require('express');
const router = express.Router();

const { User, Post, Comment, Image } = require('../models');
const { findOne } = require('../models/comment');
const { isLoggedIn } = require('./middlewares');

// from app.use('/post', postRouter);
// POST /post
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    const fullPost = await Post.findOne({
      where: {
        id: newPost.id,
      },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              // 댓글 작성자
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          // 게시글 작성자
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// from app.use('/post', postRouter)
// POST /post/id/comment
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });

    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }

    const newComment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });

    const fullComment = await Comment.findOne({
      where: { id: newComment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });

    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', (req, res) => {});

module.exports = router;
