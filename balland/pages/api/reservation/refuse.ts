import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/config";
import reservationinfo from "../../../lib/model/reservationinfo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method === "POST"){
        connect()
        const id = req.body.body.id
        console.log(id)
        const finduserreservation = {_id : id}
        reservationinfo.updateOne(finduserreservation, { $set : {status : 'refuse'}})
        .then(() => {
              res.json({
                type: true,
                data: 'success'
              });
        });
    }
}