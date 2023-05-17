import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/config.js";
import reservationinfo from "../../../lib/model/reservationinfo.js";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method === "POST"){
        connect()
        const email = req.body.body.email;
        const today = new Date();
        const findUserReservation = {email : email}
        const filterData = await (await reservationinfo.find(findUserReservation)).filter((reservation)=> {
            const reservationDate = new Date(reservation.reservationDate)
            return reservationDate < today
        });
        res.json({
            type : true,
            data : filterData
        })
    }
}