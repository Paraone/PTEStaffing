const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
import clientPromise from 'lib/mongodb';
import { STAFF_ACCOUNT_TYPE, DB_NAME } from '~constants';

const saltRounds = 10;

export async function getStaffCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME)
    return db.collection(STAFF_ACCOUNT_TYPE);
}

export async function confirmstaff(confirmationCode) {
    const collection = await getStaffCollection();
    return await collection.updateOne(
      { confirmationCode }, 
      { $set: { emailConfirmed: true } }, 
      { upsert: true })
}

export async function authstaff(password, hash) {
    return await bcrypt.compare(password, hash);
}

export async function findstaff({ email, profileId, confirmationCode }) {
    const collection = await getStaffCollection();
    return await collection.findOne({ $or: [{ email }, { profileId }, { confirmationCode }]});
}

export async function createstaff(firstName, lastName, email, password, profileId) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(STAFF_ACCOUNT_TYPE);
    
    return await bcrypt.hash(password, saltRounds).then(async (hash) => {
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
                accountType: STAFF_ACCOUNT_TYPE,
                emailConfirmed: false,
                password: hash,
            }
        );
    })
}
