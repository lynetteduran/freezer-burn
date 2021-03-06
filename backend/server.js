/*IMPORT DEPENDENCIES*/
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import { getSecret } from './secrets';
import Freezer from './models/freezer';

/*APP, ROUTER AND API_PORT CONSTRUCTORS*/
const app = express();
const router = express.Router();
const API_PORT = process.env.API_PORT || 3000;

/* DB CONFIG - SETS URI FROM MLAB IN secrets.js*/
mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*SETS DEPENDENCIES FOR APP INSTANCES*/
app.use(bodyParser.urlencoded({ extended: false} ));
app.use(bodyParser.json());
app.use(logger('dev'));

/*SETS HOMEPAGE AND API*/
router.get('/', (req,res) => {
  res.json({ message: 'Hello, world!'})
});
app.use('/api', router);

/*SETS GET FREEZER REQ ROUTE*/
router.get('/freezers', (req, res) => {
  Freezer.find((err, freezers) => {
    if (err) return res.json({ success: false, error: err});
    return res.json({ success: true, data: freezers });
  });
});

/*SETS POST FREEZER REQ ROUTE*/
router.post('/freezers', (req, res) => {
  const freezer = new Freezer();
  const { freezerNum, freezerLoc } = req.body;
  if (!freezerNum || !freezerLoc) {
    return res.json({
      success: false,
      error: 'You must provide a freezer number and freezer location'
    });
  }
  freezer.freezerNum = freezerNum;
  freezer.freezerLoc = freezerLoc;
  freezer.save(err => {
    if (err) return res.json({ success: false, error: err});
    return res.json({success: true});
  });
});

/*SETS PUT FREEZER REQ ROUTE*/
router.put('/freezers/:freezerId', (req, res) => {
  const { freezerId } = req.params;
  if (!freezerId) {
    return res.json({ success: false, error: 'No freezer id provided' });
  }
  Freezer.findById(freezerId, (error, freezer) => {
    if (error) return res.json({ success: false, error });
    const { freezerNum, freezerLoc } = req.body;
    if (freezerNum) freezer.freezerNum = freezerNum;
    if (freezerLoc) freezer.freezerLoc = freezerLoc;
    freezer.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
});

/*SETS DELETE FREEZER REQ ROUTE*/
router.delete('/freezers/:freezerId', (req, res) => {
  const { freezerId } = req.params;
  if (!freezerId) {
    return res.json({ success: false, error: 'No freezer id provided' });
  }
  Freezer.remove({ _id: freezerId }, (error, freezer) => {
    if (error) return res.json({ success: false, error: 'freezer no longer exists' });
    return res.json({ success: true });
  });
});

/*SETS PORT LISTENER*/
app.listen(API_PORT, () => console.log(`I can hear you breath...on port ${API_PORT}`));
