const nextConnect = require('next-connect');
import clientPromise from 'lib/mongodb';
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; // eslint-disable-line
import middleware from '../../middleware/middleware';

export const config = {
  api: {
    bodyParser: false,
  },
}

const dbName = 'ptestaffing';

async function findUser(db, email, callback) {
  const collection = db.collection('user');
  collection.findOne({ email }, callback);
}

function authUser(db, email, password, hash, callback) {
  // const collection = db.collection('user');
  bcrypt.compare(password, hash, callback);
}

const apiRoute = nextConnect({
  onError(err, req, res) {
    if (err) console.log('auth.js', { err })
    return res.status(403)
  },
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(middleware);

apiRoute.post(async (req, res) => {
    let client;
    //login
    try {
      assert.notEqual(null, req.body.email, 'Email required');
      assert.notEqual(null, req.body.password, 'Password required');    
    } catch (bodyError) {
      res.status(403).send(bodyError.message);
    }

    try {
      client = await clientPromise;
      const db = client.db(dbName);
      const email = req?.body?.email;
      const password = req?.body?.password;

      findUser(db, email, function(err, user) {
        if (err) {
          res.status(299).json({error: true, message: 'Error finding User'});
          return;
        }
        if (!user) {
          res.status(200).json({error: true, message: 'User not found'});
          return;
        } else {
          const { password: userPassword, userId, profileId, emailConfirmed } = user;
          authUser(db, email, password, userPassword, function(err, match) {
            if (err) {
              res.status(200).json({error: true, message: 'Auth Failed'});
            }
            if (match) {
              const token = jwt.sign(
                { userId, email, profileId, emailConfirmed },
                jwtSecret,
                {
                  expiresIn: 3000, //50 minutes
                },
              );
              return res.status(200).json({token});
            } else {
              res.status(200).json({error: true, message: 'Auth Failed'});
              return;
            }
          });
        }
      });
    } catch (error) {
      console.log({error});
      res.status(400).json({error});
    }
});

export default apiRoute;


