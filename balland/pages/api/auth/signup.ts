import { NextApiRequest, NextApiResponse } from "next"
import * as bcrypt from "bcrypt"
import clientPromise from "../../../lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = await clientPromise

  if (req.method === "POST") {
    const { email, password, name } = req.body.body

    // MongoDB 연결
    const db = client.db("balland")
    // 기존의 가입된 이메일 체크하기
    const checkExisting = await db.collection("balland").findOne({ email })

    if (checkExisting) {
      return res.send({ result: false, message: "이미 가입된 계정이에요!" })
    }

    const status = await db.collection("balland").insertOne({
      email,
      password: await bcrypt.hash(password, 12),
      name,
    })
    // password: await hash(password, 12),
    // 성공시 response
    res.send({ result: true, message: "User created", ...status })
  } else {
    res.status(500).json({ result: false, error: "Route not valid" })
  }
}
