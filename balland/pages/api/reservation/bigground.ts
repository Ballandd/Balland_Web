import { NextApiRequest, NextApiResponse } from "next"
import connect from "../../../lib/config"
import reservationperdate from "../../../lib/model/reservationperdate.js"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    connect()
    console.log(req.body.body.date)
    const { date } = req.body.body
    const clone = new Date(date)
    clone.setDate(clone.getDate() + 1)
    const newdateInfo = new reservationperdate({
      8: true,
      10: true,
      12: true,
      14: true,
      16: true,
      18: true,
      date: clone
  })
  const finddate = {
    date: clone,
  };
reservationperdate.findOne(finddate).then(function(obj){
      if (obj == null){
          newdateInfo.save()
          .then(()=> {
              reservationperdate.findOne(finddate).then(function(obj1){
                  res.json({
                      type : true,
                      data : obj1
                  })
              })
          })
      }
      else{ 
          res.json({
              type : true,
              data : obj
          })
      }
  })
}
}
