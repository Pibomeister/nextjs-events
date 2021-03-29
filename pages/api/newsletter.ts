import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, insertDocument } from '../../helpers/db-util';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Email is not present or is incorrect' });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (e) {
      res.status(500).json({ message: 'Connecting to the database failed' });
      return;
    }
    try {
      await insertDocument(client, 'newsletter', {
        email: userEmail,
      });
      client?.close();
    } catch (e) {
      res.status(500).json({ message: 'Inserting data failed' });
    }
    res.status(201).json({ message: 'Success', email: userEmail });
  }
};
