import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = await clientPromise
  const db = client.db("balland")
  if (req.method === "POST") {
    const { date } = req.body.body
    const clone = new Date(date)
    clone.setDate(clone.getDate() + 1)
    console.log(date, clone)
    // if (
    //   (await db.collection("reservationperdate").findOne({ date: clone })) ==
    //   null
    // ) {
    //   const status = await db.collection("reservationperdate").insertOne({
    //     8: true,
    //     10: true,
    //     12: true,
    //     14: true,
    //     16: true,
    //     18: true,
    //     date: clone,
    //   })
    // }
    const readdatereservation = await db
      .collection("reservationperdate")
      .findOne({ date: clone })
    res.send(readdatereservation)
  } else {
    res.status(500).json({ result: false, error: "Route not valid" })
  }
}
