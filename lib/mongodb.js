import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) { // eslint-disable-line
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI // eslint-disable-line
const options = { useUnifiedTopology: true }

let client
let clientPromise

if (process.env.NODE_ENV === 'development') { // eslint-disable-line
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) { // eslint-disable-line
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect() // eslint-disable-line
}
clientPromise = global._mongoClientPromise // eslint-disable-line
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
  clientPromise = client.connect()
}
console.log('Connected to mongodb.')
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise