const express = require('express');
const router = express.Router();

const { User, Post, Comment, Image } = require('../models');
const { isLoggedIn } = require('./middlewares');

// from app.use('/post', postRouter);
// POST /post
// 게시글 작성
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
        {
          // 좋아요 누른 사람
          model: User,
          as: 'Likers',
          attributes: ['id'],
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
// 게시글의 댓글 작성
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

// from app.use('/post', postRouter)
// PATCH /post/id/like
// 게시글의 좋아요
router.patch('/:postId/like', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send('존재하지 않는 게시물입니다.');
    }

    // mysql db connection 할 때
    // sequelize가 자동으로 add, set, remove와 같은 것들을 만들어준다.
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// from app.use('/delete', postRouter)
// DELETE /post/id/delete
// 게시글 좋아요 취소
router.delete('/:postId/like', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send('게시물이 존재하지 않습니다.');
    }

    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
