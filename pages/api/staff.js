const nextConnect = require('next-connect');
const assert = require('assert');
import middleware from '../../middleware/middleware';
import { findStaff, createStaff, getStaffCollection } from '~controllers/staffController';
import { csrf } from 'lib/csrf';
// import  { sendMail } from '~controllers/mailController';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://pte-staffing.vercel.app' : 'http://localhost:3000' // eslint-disable-line

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
      res.status(200).json({ error: true, message: 'User already exists' });
      return;
    }

    const createdUser = await createStaff(firstName, lastName, email, password, profileId);

    if (!createdUser) {
      res.status(200).json({ error: true, message: 'User not created.'});
      return;
    }
    
    const { confirmationCode } = createdUser;

    const encodedURL = encodeURIComponent(`${baseURL}/confirmation?confirmationCode=${confirmationCode}&profileId=${profileId}`);
    // const emailData = {
    //   from: '<management@ptestaffing.com>',
    //   to: email,
    //   subject: "PTEStaffing Registration test ✔",
    //   message: `
    //     Please go to the link below to confirm your account\n
    //     http://localhost:3000/confirmation?confirmationCode=${confirmationCode}&profileId=${profileId}
    //   `
    // };
    res.status(200).json({ email, url: encodedURL });
    return;
    // sendMail(emailData, (data) => { 
    //   return;
    // });
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

export default csrf(apiRoute);
