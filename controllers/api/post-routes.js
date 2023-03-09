const router = require('express').Router();
const Post = require('../../models/Post');
const User = require('../../models/User');

router.get('/', async (req, res) => {
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
        user_id: req.session.user_id

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
          body: req.body.body
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

  router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  module.exports = router;