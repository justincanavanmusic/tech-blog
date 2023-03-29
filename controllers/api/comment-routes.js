const router = require('express').Router();
const Comment = require('../../models/Comment');

//post route to create a comment
router.post('/', async (req, res) => {
    try {
      const commentData = await Comment.create({
        body: req.body.body,
        post_id: req.body.post_id,
        user_id: req.session.user_id
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //delete route to delete a comment based on the :id param
  router.delete('/:id', async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

            //COMMENT PUT ROUTE, MAYBE ADD THIS//
  // router.put('/:id', async (req, res) => {
  //   try {
  //     const comment = await Comment.update(
  //       {
  //         body: req.body.body
  //       },
  //       {
  //         where: {
  //           id: req.params.id,
  //         },
  //       }
  //     );
     
  //     res.status(200).json(comment);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });

  module.exports = router;