import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongodb"
import express , {Request, Response, NextFunction} from "express"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = await clientPromise
  const db = client.db("balland")
  if (req.method === "POST") {
    const { body } = req
    const { finddate } = req.body.body.reservationDate
    const date = new Date()
    // 예약 정보 생성, 수정 날짜는 초기 생성 날짜를 기본으로 한다.
    body.reservationModifyDate = date
    body.reservationCreateDate = date
    console.log(finddate)
    // db.collection("reservationperdate").find({date : body.body.reservationtime},function(err: any, result: any){
    //   if(err){
    //     console.log(err)
    //     res.send(err)
    //   }
    //   else{
    //     console.log("result")
    //     res.send(result)
    //   }
    // })
    // const reservationInfo = await db
    //   .collection("reservationInfo")
    //   .insertOne(body)
    // db.collection("reservationInfo").insertOne(body)
    // res.send("Success!")
    const checkDate = await db.collection("reservationperdate").findOne({date : finddate})
    if (checkDate){
      console.log(checkDate)
      return res.send(200)
    }
  } else {
    res.status(500).json({ result: false, error: "Route not valid" })
  }
}
