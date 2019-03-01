import passport from 'passport'
import localStrategy from 'passport-local'
import bcrypt from 'bcrypt-nodejs'
import {User} from '../models'

passport.use('test', new localStrategy(
  function (username, password, done) {
    User.findOne({
      where: {
        username: username
      }
    })
    .then((user) => {
      console.log('User found')
      if(bcrypt.compareSync(password, user.password)) {
        console.log('User authenticated')
        return done(null, user)
      } else {
        console.log('Passwords do not match')
        return done(null, false, { message: 'Passwords do not match' })
      }
    })
    .catch(done)
  }
))

passport.use('local', new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  session: true
  }, 

  function (req, username, password, done) {
    User.findOne({
      where: {
        username: username
      }
    })
    .then((user) => {
      if(bcrypt.compareSync(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Passwords do not match' })
      }
    })
    .catch(done)
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findOne({
    where: {
      id: id
    }
  })
  .then((id) => {
    return done(null, id)
  })
  .catch(done)
})