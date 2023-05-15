const path = require('path');
//node.js module 
//helps us make sure we're saving files in the correct place; transferrable through all operating systems (Windows, Mac, etc)

const express = require('express');
//allows us to use the entire express npm package, utilized for

//routing
//middleware
//handling http requests

const session = require('express-session');
//returns an object that contains several properties (Store, Cookie, Session)
//creates and manages sessions for each user
//assigns unique ID and stores info about your session

const exphbs = require('express-handlebars');

const app = express();
//this is a function that creates a new instance of the Express application and assigns it to the variable 'app'

const PORT = process.env.PORT || 3001;
const sequelize = require('./config/config');
//uses require function to import config.js file in the config folder
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbs.create({ helpers });

//sets up configuration rules for express-session middleware, utlizes connect-session-sequelize as the session store
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000,
    //specifies the length of time in milliseconds until the session expires
    httpOnly: true,
    //boolean value, prevents client-side JS code from accessing the cookie via document.cookie API
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: false,   //if true; generates new session id everytime you make a req to the server. 
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
//allows us to access express-session package and utilize rules from sess object ()

//app.use is a function that takes another function 
//allows you to add middleware
//middleware functions are functions that are executed between the client request and the server response


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
//adds middleware function that helps application read a payload in JSON format and makes them available in the req.body

//parses incoming requests with JSON payloads

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));
//require function is used to import the file located at the specified file path


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
