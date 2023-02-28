const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { User, Post, Comment, Image, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 이미지 파일명 저장을 위한 파일 생성 함수 이용
try {
  fs.accessSync('uploads');
} catch (err) {
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출(.png, .jpg)
      const basename = path.basename(file.originalname, ext); // '사진이름'
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

// from app.use('/post', postRouter);
// POST /post
// 게시글 작성
// req.body.content || req.body.image = 키 값
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/(#[^\s#]+)/g);

    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      // [[React, true], [Nest, true]]
      // 이처럼 2차원 배열로 만들어진다.

      await post.addHashtags(result.map((v) => v[0]));
    }

    if (req.body.image) {
      // 이미지를 여러개 올리면 images: ['파일이름'.png, '파일이름'.png]
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      }
      // 이미지 하나만 올리면 image: '파일이름'.png
      else {
        const image = await Image.create({
          src: req.body.image,
        });

        await post.addImages(image);
      }
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname'],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(200).json(fullPost);
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

    res.status(200).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// from app.use('/post', postRouter)
// DELETE /post/:id/delete
// 게시글 삭제
router.delete('/:postId/delete', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });

    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// from app.use('/post', postRouter)
// PATCH /post/id/like
// 게시글의 좋아요
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
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
    res.status(200).json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// from app.use('/delete', postRouter)
// DELETE /post/id/delete
// 게시글 좋아요 취소
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send('게시물이 존재하지 않습니다.');
    }

    await post.removeLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// from app.js ('/post/images')
// POST /post/images
// 이미지 업로드
// upload.array = 여러 장의 사진을 올릴 수 있도록
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

// from app.js('/post/:id/retweet')
// POST /post/:id/retweet
// 리트윗
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });

    if (!post) {
      return res.status(403).send('게시물이 존재하지 않습니다.');
    }

    // 내 게시물 -> 남이 리트윗 -> 그걸 내가 다시 리트윗하는 동작은 막아준다.
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send('자신의 글을 리트윗 할 순 없습니다.');
    }

    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });

    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다.');
    }

    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });

    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(200).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// from app.js('/post/:postId')
// GET /post/:postId
// 게시물 1개 가져오기
router.get('/:postId', async (req, res, next) => {
  // GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
