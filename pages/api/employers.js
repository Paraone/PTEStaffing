const nextConnect = require('next-connect');
const assert = require('assert');
import middleware from '../../middleware/middleware';
import { findEmployer, createEmployer, getEmployerCollection } from '~controllers/employersController';
import { csrf } from 'lib/csrf';
const baseURL = process.env.NODE_ENV === 'production' ? 'https://pte-staffing.vercel.app' : 'http://localhost:3000' // eslint-disable-line
// import  { sendMail } from '~controllers/mailController';

export const config = {
  api: {
    bodyParser: false,
  },
}

const apiRoute = nextConnect({
  onError(err, req, res) {
    if (err) console.log('api/employer.js', { err })
    return res.status(403)
  },
  
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(middleware);

apiRoute.post(async (req, res) => {
  const { email, password, firstName, lastName, businessName } = req.body;
  
  try {
    assert.notEqual(null, lastName, 'Last Name required');
    assert.notEqual(null, firstName, 'First Name required');
    assert.notEqual(null, email, 'Email required');
    assert.notEqual(null, password, 'Password required');
    assert.notEqual(null, businessName, 'Profile ID required');

    const employer = await findEmployer({ email, businessName })
    if (employer) {
      console.log('employer not null', { employer })
      res.status(400).json({ error: true, message: 'Business already exists.' });
      return;
    }

    const snakeCaseBusinessName = businessName.split(' ').join('_');
    const createdEmployer = await createEmployer({ firstName, lastName, email, password, businessName: snakeCaseBusinessName });
    
    if (createdEmployer) {
      const { confirmationCode } = createdEmployer;
      const encodedURL = encodeURIComponent(`${baseURL}/confirmation?confirmationCode=${confirmationCode}&businessName=${snakeCaseBusinessName}`);
      // const emailData = {
      //   from: '<management@pteEmployering.com>',
      //   to: email,
      //   subject: "PTEEmployering Registration test ✔",
      //   message: `
      //     Please go to the link below to confirm your account\n
      //     ${baseURL}/confirmation?confirmationCode=${confirmationCode}&businessName=${businessName}
      //   `
      // };
      res.status(200).json({ email, url: encodedURL });
      return;
      // sendMail(emailData, (data) => { 
      //   return;
      // });
    }
  } catch (e) {
    console.log({ e })
    res.status(400).json({ error: true, message: e.message || e });
  }
});

apiRoute.get(async (req, res) => {
  try {
    
    const collection = await getEmployerCollection();
    const data = await collection.find({}, { projection: { _id: 0, password: 0 } }).toArray();

    return res.status(200).json({ data })
  } catch (error) {
    console.log('get users.js', { error });
    res.status(400).json({ error: true, message: error });
  }
});

export default csrf(apiRoute);