const nextConnect = require('next-connect');
const assert = require('assert');
import middleware from '../../middleware/middleware';
import { findStaff, createStaff, getStaffCollection } from '~controllers/staffController';
// import  { sendMail } from '~controllers/mailController';

export const config = {
  api: {
    bodyParser: false,
  },
}

const apiRoute = nextConnect({
  onError(err, req, res) {
    if (err) console.log('api/staff.js', { err })
    return res.status(403)
  },
  
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(middleware);

apiRoute.post(async (req, res) => {
  const { email, password, firstName, lastName, profileId } = req.body;
  
  try {
    assert.notEqual(null, lastName, 'Last Name required');
    assert.notEqual(null, firstName, 'First Name required');
    assert.notEqual(null, email, 'Email required');
    assert.notEqual(null, password, 'Password required');
    assert.notEqual(null, profileId, 'Profile ID required');

    const staff = await findStaff({ email, profileId })
    if (staff) {
      res.status(400).json({ error: 'User already exists.' });
      return;
    }

    const { ops, ops: [createdUser] } = await createStaff(firstName, lastName, email, password, profileId);
    
    if (ops.length === 1) {
      const { email, confirmationCode, profileId } = createdUser;

      // const emailData = {
      //   from: '<management@ptestaffing.com>',
      //   to: email,
      //   subject: "PTEStaffing Registration test ✔",
      //   message: `
      //     Please go to the link below to confirm your account\n
      //     http://localhost:3000/confirmation?confirmationCode=${confirmationCode}&profileId=${profileId}
      //   `
      // };
      res.status(200).json({ email, url: `https://local.ptestaffing.com:3000/confirmation?confirmationCode=${confirmationCode}&profileId=${profileId}` });
      return;
      // sendMail(emailData, (data) => { 
      //   return;
      // });
    }
  } catch (e) {
    res.status(400).json({ error: true, message: e.message || e });
  }
});

apiRoute.get(async (req, res) => {
  try {
    
    const collection = await getStaffCollection();
    const data = await collection.find({}, { projection: { _id: 0, password: 0 } }).toArray();

    return res.status(200).json({ data })
  } catch (error) {
    console.log('get users.js', { error });
    res.status(400).json({ error: true, message: error });
  }
});

export default apiRoute;
