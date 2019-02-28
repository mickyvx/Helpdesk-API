import {Ticket, User, Department, Reply} from '../models'
import { userInfo } from 'os';

module.exports = {
  list(req, res) {
    return Ticket.findAll({
      include: [{
        all: true,
        nested: true
      }],
      order: [
        ['created_at', 'DESC']
      ]
    })
      .then((Ticket) => res.status(200).send(Ticket))
      .catch((error) => res.status(400).send(error));
  },
  read(req, res) {
    return Ticket.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        all: true,
        nested: true
      }]
    })
      .then((Ticket) => res.status(201).send(Ticket))
      .catch((error) => res.status(400).send(error));
  },
}