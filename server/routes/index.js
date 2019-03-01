import userController from '../controllers/user'
import departmentController from '../controllers/department'
import ticketController from '../controllers/ticket'

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next()
  res.status(400).send({ message: 'access denied' })
}

module.exports = function(app, passport) {
  app.get('/', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'Hello, World!'
    })
  })

  app.post('/user/test', passport.authenticate('test', {
    successRedirect: '/success',
    failureRedirect: '/failure'
  }))

  app.post('/user/auth', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/failure'
  }))

  app.get('/user/profile', isLoggedIn, (req, res) => {
    res.status(200).json(req.user)
  })

  app.get('/success', (req, res) => {
    res.status(200).send(req.user)
  })

  app.get('/failure', (req, res) => {
    res.send('Failure logging in')
  })

  app.get('/user/list', isLoggedIn, userController.list)
  app.get('/user/:id', userController.read)

  app.get('/department/list', departmentController.list)

  app.get('/ticket/list', ticketController.list)
  app.get('/ticket/:id', ticketController.read)
}