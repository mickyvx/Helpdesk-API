import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport'
import session from 'express-session'
import './config/passport'

import routing from './routes';
import models from './models';

const APP = express();

APP.use(cors());
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({extended: true}));
 
APP.use(session({ secret: 'secret-key', cookie: { maxAge: 6000 }, resave: false, saveUninitialized: false }))
APP.use(passport.initialize())
APP.use(passport.session())

// Initialise Database & Create Tables
models.sequelize
  .sync()
  .then(function() {
    console.log('Database sync successful');
  })
  .catch(function(err) {
    console.log(`Database sync failed: ${err}`);
  });

routing(APP, passport);

APP.get('*', (req, res) => {
  res.status(404).send({
    status: 'false',
    message: 'Resource Not Found',
  });
});

APP.listen(process.env.APP_PORT, () => {
  console.log(`Server available at http://localhost:${process.env.APP_PORT}/`);
});