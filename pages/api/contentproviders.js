const nextConnect = require('next-connect');
const assert = require('assert');
import middleware from '../../middleware/middleware';
import { findContentProvider, createContentProvider, getContentProviderCollection } from '~controllers/contentProvidersController';
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
    if (err) console.log('api/contentProvider.js', { err })
    return res.status(403)
  },
  
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(middleware);

apiRoute.post(async (req, res) => {
  const { 
    email, 
    legalName, 
    instagram,
    twitter,
    ticktock,
    onlyfans,
    city,
    state,
    lingerie,
    shoe,
    bag,
    jewelry,
    restaurant,
    travel,
    terms
  } = req.body;

  try {
    assert.notEqual(null, legalName, 'First Name required');
    assert.notEqual(null, email, 'Email required');
    assert.notEqual(null, terms, 'Terms and conditions are required');

    const contentProvider = await findContentProvider({ email, username })
    if (contentProvider) {
      console.log('contentProvider not null', { contentProvider })
      res.status(400).json({ error: true, message: 'A Profile with this username or email already exists.' });
      return;
    }

    const createdContentProvider = await createContentProvider({ 
      legalName, 
      email, 
      instagram,
      twitter,
      ticktock,
      onlyfans,
      city,
      state,
      lingerie,
      shoe,
      bag,
      jewelry,
      restaurant,
      travel,
      terms
    });
    
    if (createdContentProvider) {
      const { confirmationCode } = createdContentProvider;
      const encodedURL = encodeURIComponent(`${baseURL}/confirmation?confirmationCode=${confirmationCode}&username=${snakeCaseUsername}`);
      // const emailData = {
      //   from: '<management@ptecontentProvidering.com>',
      //   to: email,
      //   subject: "PTEcontentProvidering Registration test ✔",
      //   message: `
      //     Please go to the link below to confirm your account\n
      //     ${baseURL}/confirmation?confirmationCode=${confirmationCode}&username=${username}
      //   `
      // };
      res.status(200).json({ email, url: encodedURL });
      return;
      // sendMail(emailData, (data) => { 
      //   return;
      // });
    }
  } catch (e) {
    console.log({ e });
    res.status(400).json({ error: true, message: e.message || e });
  }
});

apiRoute.get(async (req, res) => {
  try {
    
    const collection = await getContentProviderCollection();
    const data = await collection.find({}, { projection: { _id: 0, password: 0 } }).toArray();

    return res.status(200).json({ data })
  } catch (error) {
    console.log('get users.js', { error });
    res.status(400).json({ error: true, message: error });
  }
});

export default csrf(apiRoute);