const router = require('express').Router();
const Comment = require('../../models/Comment');

router.get('/comments', async (req, res) => {
  const commentData = await Comment.findAll().catch((err) => { 
      res.json(err);
    });
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      res.render('all', { comments });
    });

router.post('/', async (req, res) => {
    try {
      const commentData = await Comment.create({
        title: req.body.title,
        body: req.body.body,
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;