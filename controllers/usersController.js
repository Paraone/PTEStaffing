const assert = require('assert');
const uuid = require('uuid-random');
const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
import { WORKER_ACCOUNT_TYPE } from '~constants';

const saltRounds = 10;

export async function findWorker(db, email, profileId) {
    const collection = db.collection('user');
    return await collection.findOne({ $or: [{ email }, { profileId }]}, { projection: { _id: 0, password: 0 }});
}

export async function createWorker(db, firstName, lastName, email, password = 'w', profileId) {
    const collection = db.collection('user');
    console.log('create workder')
    return await bcrypt.hash(password, saltRounds).then(async (hash) => {
        console.log({ hash })
        if (!hash) {
            return { error: 'No hash returned.'};
        }
        const confirmationCode = v4();
        return await collection.insertOne(
            {
                userId: v4(),
                firstName,
                lastName,
                email,
                profileId,
                confirmationCode,
                accountType: WORKER_ACCOUNT_TYPE,
                emailConfirmed: false,
                password: hash,
            }
        );
    })
}
