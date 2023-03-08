const router = require('express').Router();
const { Post, Comment, User }   = require('../models');
// 
//this displays added

router.get('/', async (req, res) => {  
  try {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));
    const loggedIn = req.session.loggedIn; 
    res.render('all', { posts, loggedIn }); 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/post/:id', async (req, res) => {
  try{ 
      const postData = await Post.findByPk(req.params.id, { include: Comment, User })
      if(!postData) {
          res.status(404).json({message: 'No post with this id!'});
          return;
      }
      const post = postData.get({ plain: true });
      console.log(post)
    
    
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
  const postData = await Post.findAll({
    include: [{ model: User }]
  }).catch((err) => { 
    res.json(err);
  });
      const posts = postData.map((post) => post.get({ plain: true }));
    
      res.render('dashboard', { posts });
    });

module.exports= router;