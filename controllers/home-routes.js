const router = require('express').Router();
const { Post, Comment, User }   = require('../models');
const withAuth = require('../utils/auth');
// 
//this displays added

router.get('/', withAuth, async (req, res) => {  
  try {
    const postData = await Post.findAll({
      include: [
        User,
        { 
          model: Comment, 
          include: [User]
        }
      ]
    });
    
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)
    const loggedIn = req.session.loggedIn; 
    res.render('all', { posts, loggedIn }); 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try{ 
      const postData = await Post.findByPk(req.params.id, { 
        include: [
          User, 
          { model: Comment, 
          include: [User]
        }
        
        ]
       })
      if(!postData) {
          res.status(404).json({message: 'No post with this id!'});
          return;
      }
      const post = postData.get({ plain: true });

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



router.get('/dashboard', withAuth, async (req, res) => {  
  const postData = await Post.findAll({
    include: [
      User,
      { 
        model: Comment, 
        include: [User]
      }
    ]
  }).catch((err) => { 
    res.json(err);
  });

      const posts = postData.map((post) => post.get({ plain: true }));
      
      // posts.forEach(post => console.log(post.User.username));
      // console.log(posts.User.username);
      res.render('dashboard', { posts });
    });

// router.get('/dashboard', async (req, res) => {  
//   const postData = await Post.findAll({
//     include: [{ model: User }]
//   }).catch((err) => { 
//     res.json(err);
//   });
//       const posts = postData.map((post) => post.get({ plain: true }));
    
//       res.render('dashboard', { posts });
//     });

module.exports= router;