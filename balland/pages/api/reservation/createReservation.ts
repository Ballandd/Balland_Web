import { NextApiRequest, NextApiResponse } from "next"
import connect from "../../../lib/config"
import reservationinfo from "../../../lib/model/reservationinfo"
import reservationperdate from "../../../lib/model/reservationperdate"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    connect()
    const info = req.body
    const reservation = new reservationinfo(info)
    const time = reservation.time
    const finddate = {date : reservation.reservationDate}
    let changestatus: object | undefined;
    switch(time){
        case 8:
            changestatus = { $set : {8 : false}}
            break
        case 10:
            changestatus = { $set : {10 : false}}
            break
        case 12:
            changestatus = { $set : {12 : false}}
            break
        case 14:
            changestatus = { $set : {14 : false}}
            break
        case 16:
            changestatus = { $set : {16 : false}}
            break
        case 18:
            changestatus = { $set : {18 : false}}
            break
    }
    if(changestatus != undefined){
        reservationperdate.updateOne(finddate,changestatus).then(function(obj){
            reservation.save()
            .then(()=> {
                res.json({
                    type : true,
                    data : reservation
                })
            })
        })  
    }
    }
}
