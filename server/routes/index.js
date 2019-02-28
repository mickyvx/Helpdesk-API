import userController from '../controllers/user'
import departmentController from '../controllers/department'
import ticketController from '../controllers/ticket'

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'Hello, World!'
    })
  })

  app.get('/user/list', userController.list)
  app.get('/user/:id', userController.read)

  app.get('/department/list', departmentController.list)

  app.get('/ticket/list', ticketController.list)
  app.get('/ticket/:id', ticketController.read)
}