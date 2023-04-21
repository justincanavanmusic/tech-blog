const router = require('express').Router();
const { Post, Comment, User }   = require('../models');
const withAuth = require('../utils/auth');
//page requirements; express router, all 3 models, and the withAuth util for validation for sign-in

//include statement below allows us to access data from other models that are connected via their relationships (belongsTo, hasMany, etc) as well as their foreign keys 

//provides a get route for the "/" endpoint
//finds all Post objects and stores them into const postData which will include other classes via each classes foreign keys. 
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
    //loops through the postData array of objects via the .map method. this returns a new array in a more readable format using .get ({plain: true})
    //req.session.loggedIn is a boolean which we are storing in the loggedIn variable. if true, you can access the page; if not you are directed to the login page
    //the response renders the 'homepage.handlebars' page; we are storing the newPosts arr into a variable called "posts". we will use that variable to access the data in the handlebars page as you can see on line 1 of homepage.handlebars 
    
    const posts = postData.map((singlePost) => singlePost.get({ plain: true }));
    console.log(posts);
  
    const loggedIn = req.session.loggedIn; 
  
  
    res.render('homepage', { posts, loggedIn }); 
  } catch (err) {
    res.status(500).json(err);
  }
});




//this get route finds one Post object from the database using the find by primary key method. whatever is entered as the :id parameter will be used to grab the corresponding object in the database. ie if the endpoint is /post/2 , the findByPk method will grab the object that has "2" as its' id (which is the primary key by default)

router.get('/post/:id', withAuth, async (req, res) => {
  try{ 
      const postData = await Post.findByPk(req.params.id, { 
        include: [
          User, 
          { model: Comment, 
          include: [User]
        }
        ]
       })  //displays a .json message if the post :id doesn't exist
       console.log(req.session.user_id);
      if(!postData) {
          res.status(404).json({message: 'No post with this id!'});
          return;
      }
      //storing the readable data into the post const
      const post = postData.get({ plain: true });
      console.log(post);
      const loggedIn = req.session.loggedIn; 
      const userId = req.session.user_id;
      // console.log(userId)
     
      //renders the 'post' handlebars page. we then take the post object in the render statement which allows us to access the post object in the post.handlebars page. 
      res.render('post', { post, loggedIn, userId }); 
    } catch (err) {
      console.log(err)
        res.status(500).json(err);
    };     
});
//same as above but just the route is a get route to edit a post using its id
router.get('/edit-post/:id', withAuth, async (req, res) => {
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
      console.log(post)
      const loggedIn = req.session.loggedIn; 
      res.render('edit-post-NEW', { post, loggedIn }); 
    } catch (err) {
      console.log(err)
        res.status(500).json(err);
    };     
});

//get route for the login page. if you're logged in and you go to that page, redirect to the home page. if you are not logged in, render the login page

router.get('/edit-comment/:id', async (req, res) => {
  try {
    const oneComment = await Comment.findByPk(req.params.id, {
      
    })

    
if(!oneComment) {
  res.status(404).json({message: 'No comment with this id!'})
}


const comment = oneComment.get({ plain: true })
res.render('edit-comment', { comment })
  } catch (err) {
    console.log(err)
      res.status(500).json(err);
  };     
})

router.get('/login', (req, res) => {
 const loggedIn=req.session.loggedIn;

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login', { loggedIn } );
});

//same as above but for the signup page
// router.get('/signup', (req, res) => {
//   const loggedIn=req.session.loggedIn;
//   // console.log(req.session)

//   // if (req.session.loggedIn) {
//   //   res.redirect('/');
//   //   return;
//   // }
  
//   res.render('signup', loggedIn );
// });

router.get('/signup', (req, res) => {
  const loggedIn = req.session.loggedIn;
  res.render('signup', { loggedIn });
});

//get route for the dashboard page
//using findAll to find any Post object where the user_id = req.session.user_id. 
//in the post route where we create each post, we have added a user_id which is equal to the req.session user_id which is defined in our login post route. the req.session user_id equal to the id of the user who just logged in. 

router.get('/dashboard', withAuth, async (req, res) => {  
  const postData = await Post.findAll({
   
     where: {
        user_id: req.session.user_id,
      },
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
      console.log(posts)
      // console.log(postData)
      const loggedIn = req.session.loggedIn; 
      console.log(req.session);
      
      res.render('dashboard', { posts, loggedIn });
    });


module.exports= router;