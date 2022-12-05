const bcrypt = require('bcrypt');
import { v4 as uuidv4 } from 'uuid';
import clientPromise from 'lib/mongodb';
import { EMPLOYER_TYPE, DB_NAME } from '~constants';

const saltRounds = 10;

export async function getEmployerCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection(EMPLOYER_TYPE)
}

export async function confirmEmployer(confirmationCode) {
    const collection = await getEmployerCollection();
    return await collection.updateOne(
      { confirmationCode }, 
      { $set: { emailConfirmed: true } }, 
      { upsert: true })
}

export async function authEmployer(password, hash) {
    return await bcrypt.compare(password, hash);
}

export async function findEmployer({ email, businessName, confirmationCode }) {
    const collection = await getEmployerCollection();
    return await collection.findOne({ $or: [{ email }, { businessName }, { confirmationCode }]});
}

export async function createEmployer({firstName, lastName, email, password, businessName}) {
    const collection = await getEmployerCollection();
    return await bcrypt.hash(password, saltRounds).then(async (hash) => {
        if (!hash) {
            return null;
        }
        const confirmationCode = uuidv4();
        const response = await collection.insert(
            {
                userId: uuidv4(),
                firstName,
                lastName,
                email,
                businessName,
                confirmationCode,
                accountType: EMPLOYER_TYPE,
                emailConfirmed: false,
                password: hash,
            },

        );
        if (!response.acknowledged) return null;

        return { confirmationCode }
    })
}
