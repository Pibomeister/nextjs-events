import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json([]);
  } else if (req.method === 'POST') {
    console.log(req.body);
    res.status(201).json({ message: 'Success', comment: req.body });
  }
};
