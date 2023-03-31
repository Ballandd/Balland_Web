import React from 'react';
import { useRouter } from 'next/router'
import PickFacility from "../../../components/PickFacility"
const Reservationtime = () => {
  const router = useRouter();
  const { time } = router.query;

  return (
    <div className = "grid justify-items-center">
      <div className = "flex">
      <div className = "grid grid-row">
      <div className = "w-[570px] h-[283px] bg-white"></div>
      <div className = "w-[570px] h-[333px] bg-white mt-[20px]"></div>
      </div>
      <div className = "grid grid-row">
        <PickFacility
          facilityname = "대운동장"
          picture = "/groud.jpeg"
          date = "2023-04-13" 
          time = {time}
        />
        <button className = "w-[350px] h-[60px] ml-[20px] bg-blue-600 rounded-lg text-white text-[20px]">예약 하기</button>
        <button className = "w-[350px] h-[60px] ml-[20px] bg-slate-600 rounded-lg text-white text-[20px]">취소 하기</button>       
        
        </div>
    </div>
    </div>
  )
}
export default Reservationtime
