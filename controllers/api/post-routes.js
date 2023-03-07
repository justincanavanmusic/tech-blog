const router = require('express').Router();
const Post = require('../../models/Post');

router.post('/', async (req, res) => {
    try {
      const postData = await Post.create({
        title: req.body.title,
        body: req.body.body,
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/:id', async (req, res) => {

    try {
      const post = await Post.update(
        {
          title: req.body.title,
          body: req.body.body,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      // If the database is updated successfully, what happens to the updated data below?
      // The updated data (dish) is then sent back to handler that dispatched the fetch request.
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;