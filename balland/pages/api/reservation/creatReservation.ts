import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = await clientPromise
  const db = client.db("balland")
  if (req.method === "POST") {
    const { body } = req
    const date = new Date()
    console.log(date)
    // 예약 정보 생성, 수정 날짜는 초기 생성 날짜를 기본으로 한다.
    body.reservationModifyDate = date
    body.reservationCreateDate = date
    const reservationInfo = await db
      .collection("reservationInfo")
      .insertOne(body)
    res.send("Success!")
  } else {
    res.status(500).json({ result: false, error: "Route not valid" })
  }
}
