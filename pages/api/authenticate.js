const nextConnect = require('next-connect');
const assert = require('assert');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; // eslint-disable-line
import middleware from 'middleware/middleware';
import { findWorker, authWorker } from 'controllers/usersController';

export const config = {
  api: {
    bodyParser: false,
  },
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
    const { email, password } = req?.body || {};
    //login
    try {
      assert.notEqual(null, email, 'Email required');
      assert.notEqual(null, password, 'Password required'); 

      const worker = await findWorker(email);
      if (!worker) {
        res.status(400).json({ error: true, message: 'User not found' })
        return;
      }

      const { password: passwordHash, userId, profileId, emailConfirmed } = worker;
      const match = await authWorker(password, passwordHash);

      if (!match) {
        res.status(403).json({ error: true, message: 'Auth failed'})
      }

      const token = jwt.sign(
        { userId, email, profileId, emailConfirmed },
        jwtSecret,
        {
          expiresIn: 3000, //50 minutes
        },
      );
      return res.status(200).json({token});
    } catch (error) {
      console.log({error});
      res.status(400).json({error});
    }
});

export default apiRoute;


