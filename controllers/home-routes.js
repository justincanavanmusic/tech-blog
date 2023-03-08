const router = require('express').Router();
const { Post, Comment, User }   = require('../models');
// 
//this displays added
router.get('/', async (req, res) => {  
  const postData = await Post.findAll().catch((err) => { 
      res.json(err);
    });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('all', { posts });
    });

router.get('/post/:id', async (req, res) => {
  try{ 
      const postData = await Post.findByPk(req.params.id, { include: Comment })
      if(!postData) {
          res.status(404).json({message: 'No post with this id!'});
          return;
      }
      const post = postData.get({ plain: true });
      console.log(post);
      res.render('post', post);
    } catch (err) {
      console.log(err)
        res.status(500).json(err);
    };     
});

router.get('/login', (req, res) => {
 
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

router.get('/signup', (req, res) => {
 
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('signup');
});

router.get('/dashboard', async (req, res) => {  
  const commentData = await Comment.findAll().catch((err) => { 
      res.json(err);
    });
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      res.render('all', { comments });
    });

module.exports= router;