import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  if (req.method === 'POST') {
    const info  = req.body;
    console.log();
    const db = client.db('balland');
    const reservationInfo = await db.collection('reservationInfo').insertOne(info);
    res.status(200)
    res.send("Success!")
  } else {
    res.status(500).json({ result: false, error: 'Route not valid' });
  }
}