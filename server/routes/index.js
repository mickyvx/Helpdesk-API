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

  app.post('/user/test', (req, res) => passport.authenticate('test', { failWithError: true }))

  app.post('/user/login', passport.authenticate('local-login', {
    failWithError: true
  }))

  app.get('/user/list', userController.list)
  app.get('/user/:id', userController.read)

  app.get('/department/list', departmentController.list)

  app.get('/ticket/list', ticketController.list)
  app.get('/ticket/:id', ticketController.read)
}