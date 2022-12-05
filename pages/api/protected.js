const nextConnect = require('next-connect');
import { csrf } from 'lib/csrf';
import middleware from '../../middleware/middleware';

export const config = {
  api: {
    bodyParser: false,
  },
}

const apiRoute = nextConnect({
  onError(err, req, res) {
    if (err) console.log('emails.js', { err })
    return res.status(403)
  },
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(middleware);

apiRoute.post(async (req, res) => {
    return res.status(200).json({ data: 'success' })
});

export default csrf(apiRoute);