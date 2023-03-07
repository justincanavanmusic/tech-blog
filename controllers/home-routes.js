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


//this displays already existing

// router.get('/', async (req, res) => {
//     res.render('all', { posts });
// });

module.exports = router;