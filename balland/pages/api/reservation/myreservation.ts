import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const client = await clientPromise;
    const db = client.db("balland")
    if(req.method === "GET"){
        const {email} = req.body;
        const {filter} = req.body;
        const today = new Date();
        const myReservation = await db.collection("reservationinfo").find({email}).toArray();
        const responseReservation = myReservation.filter((reservation)=>{
            const reservationDate = new Date(reservation.reservationDate)
            if (filter == "past"){
                return reservationDate < today
            } else if (filter == "future") {
                return reservationDate > today
            } else {
                return true
            }
        })
        res.status(200).json({
            type : true,
            data : responseReservation,
        })
    }
}