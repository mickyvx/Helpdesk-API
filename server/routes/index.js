module.exports = function(app) {
  app.get('/', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'Hello, World!'
    })
  })
}