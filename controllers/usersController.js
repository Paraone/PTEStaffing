const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
import clientPromise from 'lib/mongodb';
import { WORKER_ACCOUNT_TYPE, DB_NAME } from '~constants';

const saltRounds = 10;

async function getUserCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME)
    return db.collection('user');
}

export async function authWorker(password, hash) {
    return await bcrypt.compare(password, hash);
}

export async function findWorker(email, profileId) {
    const collection = await getUserCollection();
    return await collection.findOne({ $or: [{ email }, { profileId }]});
}

export async function createWorker(firstName, lastName, email, password, profileId) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection('user');
    
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
