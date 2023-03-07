const router = require('express').Router();
const Comment = require('../../models/Comment');

router.post('/comments', async (req, res) => {
    try {
      const commentData = await Comment.create({
        body: req.body.body
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;