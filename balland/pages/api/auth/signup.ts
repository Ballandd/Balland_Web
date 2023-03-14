import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import * as bcrypt from 'bcrypt'
if (!process.env.NEXT_PUBLIC_MONGODB_URI) throw new Error('env error');
const uri: string = process.env.NEXT_PUBLIC_MONGODB_URI;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log("hi")
    const { email, password, name } = req.body.body;
	
    // MongoDB 연결
    const client = await MongoClient.connect(uri);
    const db = client.db('balland');
    // 기존의 가입된 이메일 체크하기
    const checkExisting = await db.collection('balland').findOne({ email });

    if (checkExisting) {
      res.send({ result: false, message: '이미 가입된 계정이에요!' })
      client.close();
      return; 
    }

    const status = await db.collection('balland').insertOne({
      email,
      password: await bcrypt.hash(password, 12),
      name
    });
    // password: await hash(password, 12),
    // 성공시 response
    res.send({ result: true, message: 'User created', ...status })
    res.status(201).json({ result: true, message: 'User created', ...status });
    client.close();
  } else {
    res.status(500).json({ result: false, error: 'Route not valid' });
  }
}