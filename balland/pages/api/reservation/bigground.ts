import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method)
  const client = await clientPromise;
  if (req.method === 'POST') {
    const {date}  = req.body.body;
    const clone = new Date(date)
    clone.setDate(clone.getDate()+1)
    const db = client.db('balland');
    const readdatereservation = await db.collection('reservationperdate').findOne({date:clone});
    res.send(readdatereservation)
  } else {
    res.status(500).json({ result: false, error: 'Route not valid' });
  }
}