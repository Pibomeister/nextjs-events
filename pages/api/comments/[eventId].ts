import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../helpers/db-util';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (e) {
    res.status(500).json({ message: 'Connecting to the database failed' });
    return;
  }
  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      client.close();
      return;
    }
    const comment: any = {
      email,
      name,
      text,
      eventId,
    };
    try {
      const result = await insertDocument(client, 'comments', comment);
      comment._id = result.insertedId;
      res.status(201).json({ message: 'Created comment', comment });
    } catch (e) {
      res.status(500).json({ message: 'Inserting data failed' });
    }
  }
  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { eventId },
        { _id: -1 }
      );
      res.status(200).json({
        comments: documents,
      });
    } catch (e) {
      res.status(500).json({ message: 'Loading comments failed' });
    }
  }
  client.close();
};
