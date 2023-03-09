const sequelize = require('../config/config');
const { Post, Comment, User }   = require('../models');
const postData = require('./post-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  // await Comment.bulkCreate(postData, {
  //   individualHooks: true,
  //   returning: true,
  // })

  process.exit(0);
};

seedDatabase();