import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const client = await clientPromise;
    const db = client.db("balland")
    if(req.method === "POST"){
        const {competitionid} = req.body;
        const objectId = new ObjectId(competitionid);
        const findcompetition = {_id : objectId};
        const data = await db.collection("competition").findOne(findcompetition);
        res.status(200).json({
            type : true,
            data : data,
        })
    }
}