import clientPromise from 'lib/mongodb';
import { DB_NAME, JOB_TYPE } from '~constants';


export async function getJobCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME)
    return db.collection(JOB_TYPE);
}

export async function findJob(id) {
    const collection = await getJobCollection();
    return await collection.findOne({ id: Number(id) });
}

export async function createJob({
    jobtitle,
    date,
    wardrobe,
    positions,
    other,
    othertext,
}) {
    const collection = await getJobCollection();
    const id = Date.now();
    const response = await collection.insert(
        {
            id,
            jobtitle,
            date,
            wardrobe,
            positions,
            other,
            othertext
        }
    );
    if (!response.acknowledged) return null;

    return { id };
}
