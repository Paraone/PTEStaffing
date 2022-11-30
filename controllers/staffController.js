const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
import clientPromise from 'lib/mongodb';
import { STAFF_TYPE, DB_NAME } from '~constants';

const saltRounds = 10;

export async function getStaffCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME)
    return db.collection(STAFF_TYPE);
}

export async function confirmStaff(confirmationCode) {
    const collection = await getStaffCollection();
    return await collection.updateOne(
      { confirmationCode }, 
      { $set: { emailConfirmed: true } }, 
      { upsert: true })
}

export async function authStaff(password, hash) {
    return await bcrypt.compare(password, hash);
}

export async function findStaff({ email, profileId, confirmationCode }) {
    const collection = await getStaffCollection();
    return await collection.findOne({ $or: [{ email }, { profileId }, { confirmationCode }]});
}

export async function createStaff(firstName, lastName, email, password, profileId) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(STAFF_TYPE);
    
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
                accountType: STAFF_TYPE,
                emailConfirmed: false,
                password: hash,
            }
        );
    })
}
