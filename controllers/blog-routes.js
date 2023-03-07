const router = require('express').Router();

const blogPosts = [
    {
      id: 1,
      title: 'Web Dev',
      body: 'I love web dev'
   
    },
    {
      id: 2,
      title: 'Cooking',
      body: 'I love cooking'
    },
]

router.get('/', async (req, res) => {
    res.render('all', { blogPosts });
});

module.exports = router;