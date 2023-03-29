const router = require('express').Router();
const User = require('../../models/User');

//login post route. uses findOne to find one username that matches the username entered in the req.body which is read by the login.js page
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
      
    });
   //if userData doesn't exist send a 400 message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    // console.log(req.body) //req.body is the username & password from the fetch request on login.js

    const userDataNew = userData.get({ plain: true });
    console.log(userDataNew);  //User object {id, uname,email,pass}

    //calls the checkPassword method comparing userData.password (or this.password) with the req.body password (entered password)
    const validPasswordBoolean = await userData.checkPassword(req.body.password); 
    // console.log(validPasswordBoolean);

    //if valid password returns false (passwords DONT match), send a 400 response with a .json message
    if (!validPasswordBoolean) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    //if the validPasswordBoolean is equal to true;
    //saves the session for the user to the server. sets the req.session user_id = to the id from the userDataNew object
    //sets loggedIn property of the session object to true
    //stores the plain user data into the user variable and sends a .json message
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
   
  //uses signup post route to create a new user object using the information in the req.body to populate the User model
  router.post('/signup', async (req, res) => {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
     
      const userDataNew = dbUserData.get({ plain: true });
       console.log(userDataNew);
  
      req.session.save(() => {
     req.session.user_id = userDataNew.id;
        req.session.loggedIn = true;
  
        res.status(200).json(userDataNew);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
//if the user is logged in and you choose to log out, destroy the session and its data
  router.post('/logout', (req, res) => {
    
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  

  module.exports = router;