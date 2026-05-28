import { MongoClient } from "mongodb";

const options = {};

let client;
let clientPromise;

if (process.env.MONGO_URL) {
  const uri = process.env.MONGO_URL;
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  // During build time or if env var is missing, don't crash at import time.
  // Instead, create a rejected promise that will throw the error when awaited.
  clientPromise = Promise.reject(
    new Error('Invalid/Missing environment variable: "MONGO_URL"')
  );
  // Prevent unhandled promise rejection warnings in Node.js
  clientPromise.catch(() => {});
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

/**
 * Helper to get the default database instance directly
 */
export async function getDb() {
  const client = await clientPromise;
  const dbName = process.env.DB_NAME || "test";
  return client.db(dbName);
}
