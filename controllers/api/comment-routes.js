const router = require('express').Router();
const Comment = require('../../models/Comment');

router.get('/', async (req, res) => {
  const commentData = await Comment.findAll().catch((err) => { 
      res.json(err);
    });
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      res.render('all', { comments });
    });

router.post('/', async (req, res) => {
    try {
      const commentData = await Comment.create({
        body: req.body.body,
        post_id: req.body.post_id,
        user_id: req.session.user_id
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;