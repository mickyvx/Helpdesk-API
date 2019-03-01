import userController from '../controllers/user'
import departmentController from '../controllers/department'
import ticketController from '../controllers/ticket'

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

  app.post('/user/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/failure'
  }))

  app.get('/success', (req, res) => {
    res.status(200).send(`Welcome ${req.user.firstName}`)
  })

  app.get('/failure', (req, res) => {
    res.send('Failure logging in')
  })

  app.get('/user/list', userController.list)
  app.get('/user/:id', userController.read)

  app.get('/department/list', departmentController.list)

  app.get('/ticket/list', ticketController.list)
  app.get('/ticket/:id', ticketController.read)
}