import { NextApiRequest, NextApiResponse } from "next"
import connect from "../../../lib/config"
import information from "../../../lib/model/information.js"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
      if (req.method === "GET") {
          connect()
          const informationData = await information.find()
          res.json({
              type : true,
              data : informationData
          })
      }
      if (req.method === "POST"){
          connect()
          const informationData = new information(req.body.body)
          informationData.save()
          .then(()=>{
              console.log("Success!")
              res.json({
                  type : true,
                  data : informationData
              })
          })
          .catch((error: any)=>{
              console.log("Error!")
              res.json({
                  type : false,
                  err : error
              })
          }) 
      }
  }