const nextConnect = require('next-connect');
const mongo = require('mongodb');
const assert = require('assert');
import { rejects } from 'assert';
import fs from 'fs';
import clientPromise from 'lib/mongodb';
import middleware from '../../../middleware/middleware';
// import { useDrive } from '../google/gapi';
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
// const nodemailer = require("nodemailer");

export const config = {
  api: {
    bodyParser: false,
  },
}

const url = 'mongodb://localhost:27017';
const dbName = 'ptestaffing';

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
  const { query : { profileId } } = req;

  try {
    const client = await clientPromise;
    const db = client.db(dbName); 
    const collection = db.collection('user');

    collection.findOne({ profileId }, { password: false })
    .then((data) => {
      return res.status(200).json({ data: { ...data, password: undefined} });
    })
    .catch((err) => {
      console.log('[profileId].js', { err });
      return res.status(401).json({ data: { err } });
    });

  } catch (error) {
    console.log('get [profileId].js', { error });
  }
})

apiRoute.patch(async ({ body, files, query }, res) => {
  const { profileId, confirmationCode } = query;

  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection('user');

    if (confirmationCode) {
      collection.findOne({ confirmationCode }, (err, data) => {
        console.log({err, data})
        const {email, userId } = data;
        
        collection.updateOne(
          { confirmationCode }, 
          { $set: { emailConfirmed: true } }, 
          { upsert: true }, 
          () => {
          const token = jwt.sign(
            { userId, email, profileId, emailConfirmed: true },
            jwtSecret,
            {
              expiresIn: 3000, //50 minutes
            },
          );
          return res.status(200).json({ email, token});
        });
      });
      return;
    }

    const { 
      firstName, 
      lastName,
      email,
      phone
    } = body;

    assert.notEqual(null, lastName, 'Last Name required');
    assert.notEqual(null, firstName, 'First Name required');
    assert.notEqual(null, email, 'Email required');
    assert.notEqual(null, phone, 'A phone number is required');


    const updateFields = Object.keys(body).reduce((acc, key) => {
      if (!body[key] || body[key] === 'undefined') return acc;
      return {
        ...acc,
        [key]: body[key]
      }
    }, {});
    const fileKeys = Object.keys(files);
    const fieldData = fileKeys.map((name) => {
      const { mimeType, filepath } = files[name];
      return new Promise((resolve) => {
        resolve(['john doe', '1111']);
        // useDrive((drive) => {
        //   const fileMetadata = {
        //     name: `${firstName} ${lastName} ${name}`,
        //     mimeType
        //   };
        //   const media = {
        //     mimeType,
        //     body: fs.createReadStream(filepath)
        //   };
        //   drive.files.create({
        //     resource: fileMetadata,
        //     media: media,
        //     fields: 'id'
        //   }, (err, file) => {
        //     if (err) {
        //       console.log('[profileId]', { err });
        //       rejects({ err })
        //     }
        //     const id = file?.data?.id;
        //     resolve([name, id]);
        //   });
        // });
      });
    })
    Promise.all(fieldData).then(async (values) => {
      collection.findOne({ profileId }).then((user) => {
        const deletedFiles = values.map(([fieldname, id]) => {
          return new Promise((resolve) => {
            if (user[fieldname] && user[fieldname] !== id) {
              resolve({});
              // useDrive((drive) => {
              //     drive.files.delete({ fileId: user[fieldname] }, (err) => {
              //       if (err) console.log( err );
              //       console.log(`'image ${user[fieldname]} deleted'`);
              //       updateFields[fieldname] = id;
              //       return resolve({});
              //     })
              // });
            } else {
              updateFields[fieldname] = id;
              return resolve({});
            }
          });
        })

        Promise.all(deletedFiles).then(() => {
          collection.updateOne({ profileId }, { $set: updateFields }, { upsert: true }, (err, data) => {

            return res.status(200).json(data);
          });
        })
      })

    })
  } catch (error) {
    console.log('patch [profileId].js', { error });
    res.status(400).json({ error: true, message: error });
  }
})

export default apiRoute;
