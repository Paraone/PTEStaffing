const nextConnect = require('next-connect');
// import  { sendMail } from '../../controllers/mailController';
import middleware from '../../middleware/middleware';
import { findEmployer, createEmployer } from 'controllers/employersController';

export const config = {
  api: {
    bodyParser: false,
  },
}

const apiRoute = nextConnect({
  onError(err, req, res) {
    if (err) console.log('api/employers.js', { err })
    return res.status(403)
  },
  
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(middleware);

apiRoute.get(async (req, res) => {
    try {
        const employer = await findEmployer('w@w.com', 'ww');
        
        if (employer) {
            res.status(400).json({ error: 'User already exists' })
            return;
        }
        
        createEmployer().then((data) => { 
            console.log({data}) 
            return res.status(200).json({data})
        })
    } catch (e) {
        console.log({ e })
    }
});
// apiRoute.post(async (req, res) => {});
// apiRoute.put(async (req, res) => {});
// apiRoute.delete(async (req, res) => {});

export default apiRoute;
