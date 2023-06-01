import { NextApiRequest, NextApiResponse } from "next"
import connect from "../../../lib/config"
import information from "../../../lib/model/information"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (req.method === "POST"){
        connect()
        const informationnid = req.body.body.id
        const findinformation = { _id: informationnid }
        res.json({
            type: true,
            data: await information.findOne(findinformation)
        })
    }
}