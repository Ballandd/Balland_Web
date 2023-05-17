import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const client = await clientPromise;
    const db = client.db("balland")
    if(req.method === "POST"){
        const {email} = req.body.body;
        const today = new Date();
        const myReservation = await db.collection("reservationinfo").find({email}).toArray();
        const responseReservation = myReservation.filter((reservation)=>{
            const reservationDate = new Date(reservation.reservationDate)
                return reservationDate >= today
        })
        res.status(200).json({
            type : true,
            data : responseReservation,
        })
    }
}