import { NextApiRequest, NextApiResponse } from "next"
import connect from "../../../lib/config"
import reservationinfo from "../../../lib/model/reservationinfo"
import reservationperdate from "../../../lib/model/reservationperdate"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    connect()
    const info = req.body.body
    const reservation = new reservationinfo(info)
    const time = reservation.time
    const finddate = {date : reservation.reservationDate}
    console.log(info)
    let changestatus: object | undefined;
    switch(time){
        case 8:
            changestatus = { $set : {8 : false}}
            break
        case 10:
            changestatus = { $set : {10 : false}}
            break
        case 12:
            changestatus = { $set : {12 : false}}
            break
        case 14:
            changestatus = { $set : {14 : false}}
            break
        case 16:
            changestatus = { $set : {16 : false}}
            break
        case 18:
            changestatus = { $set : {18 : false}}
            break
    }
    console.log(changestatus)
    if (changestatus !== undefined) {
        // 해당 시간대가 true인 경우에만 업데이트 실행
        const reservationData = await reservationperdate.findOne(finddate);
        const isTimeReserved = reservationData[String(time)];  // 해당 시간대의 예약 상태 가져오기
        console.log(reservationData)
        if (!isTimeReserved) {
            // 예약이 이미 존재하는 경우
                res.json({
                  type: false,
                  message: "해당 시간대는 이미 예약되었습니다."
              });
          } else {
            // 해당 시간대 예약 가능한 경우
            reservationperdate.updateOne(finddate, changestatus)
              .then(() => {
                reservation.save()
                  .then(() => {
                    res.json({
                      type: true,
                      data: reservation
                    });
                  });
              });
          }
      }
    }
  }