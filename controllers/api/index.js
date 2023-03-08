const router = require('express').Router();

const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const loginRoutes = require('./login-routes');

router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/user', loginRoutes);


module.exports = router;