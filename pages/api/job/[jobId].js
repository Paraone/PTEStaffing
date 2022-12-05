const nextConnect = require('next-connect');
import { findJob } from 'controllers/jobsController';
import middleware from '../../../middleware/middleware';
// import { useDrive } from '../google/gapi';

export const config = {
  api: {
    bodyParser: false,
  },
}

const apiRoute = nextConnect({
  onError(err, req, res) {
    if (err) console.log('[profileId].js', { err })
    return res.status(403)
  },
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(middleware);

apiRoute.get(async (req, res) => {
  const { query : { jobId } } = req;

  findJob(jobId)
  .then((data) => {
    return res.status(200).json(data);
  })
  .catch((err) => {
    console.log('[profileId].js', { err });
    return res.status(401).json({ data: { err } });
  });
})

// apiRoute.patch(async ({ body, files, query }, res) => {
//   const { jobId } = query;
//   res.status(200).json({ name: 'anolis' })
// })

export default apiRoute;
