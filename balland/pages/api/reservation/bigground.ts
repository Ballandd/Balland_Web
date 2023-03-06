import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
if (!process.env.NEXT_PUBLIC_MONGODB_URI) throw new Error('env error');
const uri: string = process.env.NEXT_PUBLIC_MONGODB_URI;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log("hi")
    const {date}  = req.body.body;
    // MongoDB 연결
    const client = await MongoClient.connect(uri);
    const db = client.db('balland');
    const readdatereservation = await db.collection('reservationperdate').findOne({date:new Date(date)});
    res.send(readdatereservation)

    // if (checkExisting) {
    //   client.close();
    //   res.status(422).json({ result: false, error: '이미 가입된 계정이에요!' });
    //   return;
    // }

    // const status = await db.collection('balland').insertOne({
    //   email,
    //   password: await bcrypt.hash(password, 12),
    //   name
    // });
    // // password: await hash(password, 12),
    // // 성공시 response
    // res.status(201).json({ result: true, message: 'User created', ...status });
    // client.close();
  } else {
    res.status(500).json({ result: false, error: 'Route not valid' });
  }
}