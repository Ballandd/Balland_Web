import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const client = await clientPromise;
    const db = client.db("balland")
    if(req.method === "GET"){
        const {year} = req.body
        const data = await db.collection("competition").find({year}).toArray();
        res.status(200).json({
            type : true,
            data : data,
        })
    }
}