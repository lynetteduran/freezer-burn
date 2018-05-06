/*IMPORT DEPENDENCIES*/
import express from 'express';
import bodyParse from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

/*APP, ROUTER AND API_PORT CONSTRUCTORS*/
const app = express();
const router = express.Router();
const API_PORT = process.env.API_PORT || 3000;

/*SETS DEPENDENCIES FOR APP INSTANCES*/
app.use(bodyParser.urlencoded({ extended: false} ));
app.use(bodyParser.json());
app.(logger('dev'));

/*SETS HOMEPAGE AND API*/
router.get('/', (req,res) => {
  res.json({ message: 'Hello, world!'})
});
app.use('/api', router);

/*SETS PORT LISTENER*/
app.listen(API_PORT, () => console.log('I can hear you breath...on port ${API_PORT}'));
