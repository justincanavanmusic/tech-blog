const router = require('express').Router();
const Post = require('../../models/Post');

router.get('/posts', async (req, res) => {
  const postData = await Post.findAll().catch((err) => { 
      res.json(err);
    });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('all', { posts });
    });

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
     
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;