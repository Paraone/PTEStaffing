const nextConnect = require('next-connect');
const assert = require('assert');
const uuid = require('uuid-random');
const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
const jwt = require('jsonwebtoken');
// import  { sendMail } from '../../controllers/mailController';
const jwtSecret = process.env.JWT_SECRET; // eslint-disable-line
import clientPromise from 'lib/mongodb';
import middleware from '../../middleware/middleware';
import { WORKER_ACCOUNT_TYPE } from '~constants';
import { findWorker, createWorker } from '~controllers/usersController';

export const config = {
  api: {
    bodyParser: false,
  },
}

const dbName = 'ptestaffing';

const apiRoute = nextConnect({
  onError(err, req, res) {
    if (err) console.log('api/users.js', { err })
    return res.status(403)
  },
  
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(middleware);

apiRoute.get(async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(dbName);
        const worker = await findWorker(db, 'w@w.com', 'ww');
        
        if (worker) {
            res.status(400).json({ error: 'User already exists' })
            return;
        }

        createWorker(db).then((data) => { 
            console.log({data}) 
            return res.status(200).json({data})
        })
    } catch (e) {
        console.log({ e })
    }
});
apiRoute.post(async (req, res) => {});
apiRoute.put(async (req, res) => {});
apiRoute.delete(async (req, res) => {});

export default apiRoute;
