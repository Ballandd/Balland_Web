import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  if (req.method === 'POST') {
    const db = client.db('balland');
    const readdatereservation = await db.collection('reservationperdate').findOne();
  } else {
    res.status(500).json({ result: false, error: 'Route not valid' });
  }
}