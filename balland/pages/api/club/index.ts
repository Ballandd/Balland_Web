import { NextApiRequest, NextApiResponse } from "next"
import connect from "../../../lib/config"
import club from "../../../lib/model/club"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (req.method === "GET") {
        connect()
        club.find().then(function(clubInfos){
            res.json({
                type : true,
                data : clubInfos
            })
        })
    }
    if (req.method === "POST"){
        connect()
        const clubInfo = new club(req.body.body)
        clubInfo.save()
        .then(()=>{
            console.log("Success!")
            res.json({
                type : true,
                data : clubInfo
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