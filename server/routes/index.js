import userController from '../controllers/user'
import departmentController from '../controllers/department'
import ticketController from '../controllers/ticket'
import jwt from 'jsonwebtoken'

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next()
  res.status(400).send({ message: 'access denied' })
}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== 'undefined') {
    // Split Token
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    // Verify Token Data
    jwt.verify(bearerToken, 'icanhaztoken', (err, data) => {
      if(err) {
        res.sendStatus(403)
      } else {
        next()
      }
    })
  } else {
    // Invalid Token
    res.sendStatus(403)
  }
}

module.exports = function(app, passport) {
  app.get('/', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'Hello, World!'
    })
  })

  app.post('/user/login', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user
        });
      }

    req.login(user, {session: false}, (err) => {
        if (err) {
            res.send(err);
        }
        const token = jwt.sign({user}, 'icanhaztoken', {expiresIn: '7d'});
        return res.json({token, user});
      });
    }) (req, res);
  });

  app.post('/user/auth', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/failure'
  }))

  app.get('/user/profile', verifyToken, (req, res) => {
    res.status(200).json(req.user)
  })

  app.get('/success', (req, res) => {
    res.status(200).send(req.token)
  })

  app.get('/failure', (req, res) => {
    res.send('Failure logging in')
  })

  app.get('/user/list', verifyToken, userController.list)
  app.get('/user/:id', verifyToken, userController.read)

  app.get('/department/list', verifyToken, departmentController.list)

  app.get('/ticket/list', verifyToken, ticketController.list)
  app.get('/ticket/:id', verifyToken, ticketController.read)
}