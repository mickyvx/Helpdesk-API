import {User} from '../models'

module.exports = {
  list(req, res) {
    return User.findAll()
      .then((User) => res.status(200).send(User))
      .catch((error) => res.status(400).send(error));
  },
  read(req, res) {
    return User.findOne({
      where: {
        id: req.params.id
      },
    })
      .then((User) => res.status(200).send(User))
      .catch((error) => res.status(400).send(error));
  },
}