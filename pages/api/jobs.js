const nextConnect = require('next-connect');
import middleware from '../../middleware/middleware';
import { csrf } from 'lib/csrf';
import { createJob, getJobCollection } from '~controllers/jobsController';

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

   if (!jobtitle || !date || !positions ) {
     res.status(200).json({ error: true, message: 'Required fields are missing.'});
     return;
   }
  
  try {

    const createdJob = await createJob({jobtitle, date, wardrobe, positions, other, othertext});
    const { id } = createdJob;

    if (!createdJob) {
      res.status(200).json({ error: true, message: 'Job not created.' });
      return;
    }

    res.status(200).json({ id });
  } catch (e) {
    console.log( { e })
    res.status(400).json({ error: true, message: e.message || e });
  }
});

apiRoute.get(async (req, res) => {
  try {
    
    const collection = await getJobCollection();
    const data = await collection.find({}).toArray();
    console.log({ data })
    return res.status(200).json({ data })
  } catch (error) {
    console.log('get users.js', { error });
    res.status(400).json({ error: true, message: error });
  }
});

export default csrf(apiRoute);
