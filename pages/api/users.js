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

export const config = {
  api: {
    bodyParser: false,
  },
}

const saltRounds = 10;
const dbName = 'ptestaffing';

function findUser(db, email, profileId, callback) {
  const collection = db.collection('user');
  collection.findOne({ $or: [{ email }, { profileId }]}, { _id: 0, password: 0 }, callback);
}

function createUser(db, firstName, lastName, email, password, profileId, callback) {
  const collection = db.collection('user');

  bcrypt.hash(password, saltRounds, function(err, hash) {
    const confirmationCode = uuid();

    collection.insertOne(
      {
        userId: v4(),
        firstName,
        lastName,
        email,
        profileId,
        confirmationCode,
        emailConfirmed: false,
        password: hash,
      },
      function(err, userCreated) {
        assert.equal(err, null);
        callback(userCreated);
      },
    );
  });
}

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

apiRoute.post(async (req, res) => {
  
  // signup
  try {
    assert.notEqual(null, req.body.lastName, 'Last Name required');
    assert.notEqual(null, req.body.firstName, 'First Name required');
    assert.notEqual(null, req.body.email, 'Email required');
    assert.notEqual(null, req.body.password, 'Password required');
    assert.notEqual(null, req.body.profileId, 'Profile ID required');
  } catch (bodyError) {
    return res.status(401).json({error: true, message: bodyError.message});
  }

  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const { email, password, firstName, lastName, profileId } = req.body;

    findUser(db, email, profileId, function(err, user) {
      if (err) {
        res.status(500).json({error: true, message: 'Error finding User'});
        return;
      }
      if (!user) {
        
        createUser(db, firstName, lastName, email, password, profileId, function({ ops, ops: [createdUser] }) {
          if (ops.length === 1) {
            const { userId, email, firstName, lastName, profileId, /*confirmationCode, */emailConfirmed } = createdUser;
            const token = jwt.sign(
              {userId, email, firstName, lastName, profileId, emailConfirmed },
              jwtSecret,
              {
                expiresIn: 3000, //50 minutes
              },
            );

            // const emailData = {
            //   from: '<management@ptestaffing.com>',
            //   to: email,
            //   subject: "PTEStaffing Registration test ✔",
            //   message: `
            //     Please go to the link below to confirm your account\n
            //     https://local.ptestaffing.com:3000/confirmation?confirmationCode=${confirmationCode}&profileId=${profileId}
            //   `
            // };
            res.status(200).json({token, email});
            return;
            // sendMail(emailData, (data) => { 
            //   return;
            // });
          }
        });
      } else {
        // User exists
        res.status(200).json({error: true, message: 'Profile exists'});
        return;
      }
    });
  } catch (e) {
    console.log('users.js try/catch', { e });
    res.status(400).json({ error: true, message: e });
  }
});

apiRoute.get(async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection('user');

    const data = await collection.find().toArray();
    return res.status(200).json({ data })
  } catch (error) {
    console.log('get users.js', { error });
    res.status(400).json({ error: true, message: error });
  }
});

export default apiRoute;