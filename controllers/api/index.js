const router = require('express').Router();

const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');
// const editRoutes = require('./edit-routes');

router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/user', userRoutes);
// router.use('/edit-post', editRoutes);


module.exports = router;