import {Department} from '../models'

module.exports = {
  list(req, res) {
    return Department.findAll()
      .then((Department) => res.status(200).send(Department))
      .catch((error) => res.status(400).send(error));
  },
}