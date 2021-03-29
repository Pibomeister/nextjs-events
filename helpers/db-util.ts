import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://admin:SaAxvlU02PcMLUUi@cluster0.e5tix.mongodb.net/events?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(
  client,
  collection,
  conditions = {},
  sort = {}
) {
  const db = client.db();
  return await db.collection(collection).find(conditions).sort(sort).toArray();
}
