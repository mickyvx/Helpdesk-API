import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routing from './routes';

const APP = express();

APP.use(cors());
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({extended: true}));

routing(APP);

APP.get('*', (req, res) => {
  res.status(404).send({
    status: 'false',
    message: 'Resource Not Found',
  });
});

APP.listen(process.env.APP_PORT, () => {
  console.log(`Server available at http://localhost:${process.env.APP_PORT}/`);
});