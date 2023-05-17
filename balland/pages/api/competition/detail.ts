import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/config.js"
import competition from "../../../lib/model/competition.js"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        connect()
        const competitionid = req.body.body.id
        const findcompetition = { _id: competitionid }
        res.json({
            type: true,
            data: await competition.findOne(findcompetition)
        })
    }
    else{
        res.json({
            type : 500
        })
    }
}