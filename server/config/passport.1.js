import passport from 'passport'
import localStrategy from 'passport-local'
import bcrypt from 'bcrypt-nodejs'
import {User} from '../models'

passport.use('local-login', new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
  },

  function(username, password, done) {
    User.findOne({
      where: {
        username: username
      }
    }).then(function(user) {
      if(!user) {
        return done(null, false, { message: 'Username does not exist' })
      } else {
        bcrypt.compare(password, user.password).then(response => {
          if (!response) {
            console.log('Passwords do not match')
            return done(null, false, { message: 'Passwords do not match' })
          }
          console.log('User found and authenticated')
          return done(null, user)
        })
      }
    })
  })
)