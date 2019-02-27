import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const APP = express();

APP.use(cors());
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({extended: true}));

APP.get('*', (req, res) => {
  res.status(404).send({
    status: 'true',
    message: 'Hello World',
  });
});

APP.listen(process.env.APP_PORT, () => {
  console.log(`Server available at http://localhost:${process.env.APP_PORT}/`);
});