import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/config";
import reservationinfo from "../../../lib/model/reservationinfo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method === "POST"){
        connect()
        reservationinfo.find().then(function(obj){
        console.log(obj)
        res.json({
            type:true,
            data : obj
        })
    })
    }
}