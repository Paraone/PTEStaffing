const bcrypt = require('bcrypt');
import { v4 as uuidv4 } from 'uuid';
import clientPromise from 'lib/mongodb';
import { PROVIDER_TYPE, DB_NAME } from '~constants';

const saltRounds = 10;

export async function getContentProviderCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection(PROVIDER_TYPE)
}

export async function confirmContentProvider(confirmationCode) {
    const collection = await getContentProviderCollection();
    return await collection.updateOne(
      { confirmationCode }, 
      { $set: { emailConfirmed: true } }, 
      { upsert: true })
}

export async function authContentProvider(password, hash) {
    return await bcrypt.compare(password, hash);
}

export async function findContentProvider({ email, confirmationCode }) {
    const collection = await getContentProviderCollection();
    return await collection.findOne({ $or: [{ email }, { confirmationCode }]});
}

export async function createContentProvider({ 
    legalName, 
    email, 
    instagram,
    twitter,
    ticktock,
    onlyfans,
    city,
    state,
    lingerie,
    shoe,
    bag,
    jewelry,
    restaurant,
    travel,
    terms
}) {
    const collection = await getContentProviderCollection();
    return await bcrypt.hash('password', saltRounds).then(async (hash) => {
        console.log('bcrypt')
        if (!hash) {
            console.log('no hash')
            return null;
        }
        console.log('hashed')
        const confirmationCode = uuidv4();
        const response = await collection.insert(
            {
                userId: uuidv4(),
                legalName,
                email,
                instagram,
                twitter,
                ticktock,
                onlyfans,
                city,
                state,
                lingerie,
                shoe,
                bag,
                jewelry,
                restaurant,
                travel,
                confirmationCode,
                accountType: PROVIDER_TYPE,
                emailConfirmed: false,
                password: hash,
                terms
            },

        );
        if (!response.acknowledged) return null;

        return { confirmationCode }
    })
}
