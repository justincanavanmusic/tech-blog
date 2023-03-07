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
      const postData = await Post.findByPk(req.params.id);
      if(!postData) {
          res.status(404).json({message: 'No dish with this id!'});
          return;
      }
      const post = postData.get({ plain: true });
      res.render('post', post);
    } catch (err) {
        res.status(500).json(err);
    };     
});


//this displays already existing

// router.get('/', async (req, res) => {
//     res.render('all', { posts });
// });

module.exports = router;