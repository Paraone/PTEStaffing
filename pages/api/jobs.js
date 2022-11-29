const nextConnect = require('next-connect');
const assert = require('assert');
import middleware from '../../middleware/middleware';
import { createJob, getJobCollection } from '~controllers/jobsController';
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
  const { 
    jobtitle,
    date,
    wardrobe,
    positions,
    other,
    othertext
   } = req.body;
  
  try {
    assert.notEqual(null, jobtitle, 'Last Name required');
    assert.notEqual(null, date, 'First Name required');
    assert.notEqual(null, wardrobe, 'Email required');
    assert.notEqual(null, positions, 'Password required');

    const { ops, ops: [createdJob] } = await createJob({jobtitle, date, wardrobe, positions, other, othertext});
    const { id } = createdJob;

    if (ops.length === 1) {
      res.status(200).json({ id });
      return;
    }
  } catch (e) {
    res.status(400).json({ error: true, message: e.message || e });
  }
});

apiRoute.get(async (req, res) => {
  try {
    
    const collection = await getJobCollection();
    const data = await collection.find({}).toArray();

    return res.status(200).json({ data })
  } catch (error) {
    console.log('get users.js', { error });
    res.status(400).json({ error: true, message: error });
  }
});

export default apiRoute;
