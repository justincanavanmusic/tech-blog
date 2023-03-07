const router = require('express').Router();
const { Post, Comment, User }   = require('../models');

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;