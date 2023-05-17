import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/config.js"
import competition from "../../../lib/model/competition.js"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    
    if(req.method === "POST"){
        connect()
        competition.find().then(function(obj){
            res.json({
                type : true,
                data : obj
            })
        })
    }
}