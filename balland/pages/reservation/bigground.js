import React, { useEffect, useState } from 'react';
import axios from "axios";
import moment from 'moment'
import Introduce from "../../components/Introduce.tsx"
import FacilityCard from "../../components/FacilityCard.tsx"
import { DatePicker } from '@mantine/dates';
import { Group } from '@mantine/core';
import ReserveTime from "../../components/ReserveTime.tsx"
export default function MyApp() {
  const [value, setValue] = useState(new Date());
  const [mindate, setMindate] = useState(new Date())
  const [maxdate, setmaxDate] = useState(new Date())
  // const [mark, setMark] = useState([])
  // const [eight, setEight] = useState(true)
  // const [ten, setTen] = useState(true)
  // const [twelve, setTwelve] = useState(true)
  // const [fourteen, setFourteen] = useState(true)
  // const [sixteen, setSixteen] = useState(true)
  // const onClick = async ()=> {
  //   await axios.post("/api/reservation/bigground",{
  //     method : "POST",
  //     Headers:{"Content-Type": "application/json" },
  //     body : {
  //       date : value,
  //     }
  //   }).then(response => {
  //       console.log(response.data)
  //       setEight(response.data[8])
  //       setTen(response.data[10])
  //       setTwelve(response.data[12])
  //       setFourteen(response.data[14])
  //       setSixteen(response.data[16])
  //   })
  // }

  useEffect(()=>{
    setmaxDate(Date(mindate.getDate() + 14))
  },[])
  useEffect(()=>{
    console.log(maxdate)
  },[maxdate])
  return (
    <div className = "grid justify-items-center">
    <div className = "flex ">
      <FacilityCard 
        picture = "/groud.jpeg"
      />
      <Introduce
        facilityname = "대운동장"
        phonenumber = "041-566-8775"
        location = "수원시"
      />
    </div>
    <div className = "flex mt-[21px]">
      <div className = "w-[570px] h-[398px] bg-white">
      <Group position="center">
        <DatePicker 
        hideOutsideDates
          value={value} 
          onChange={setValue} 
          size = "xl"
          defaultDate={value}
          minDate={mindate}
          maxDate={maxdate}
          />
      </Group>
      </div>
      <div className = "w-[350px] h-[398px] bg-white ml-[20px]">
      <div className = "divide-y-2 divide-solid divide-black">
            <h2 className = " mt-5 ml-5 left-9 top-5 font-mono text-left text-xl font-semibold">예약 현황 확인</h2>
            <div className = "grid grid-cols-2 ml-[38px] mr-[38px]">
                <ReserveTime 
                  time = "05:00 ~ 06:00"
                  status = {true}
                />
                <ReserveTime 
                  time = "06:00 ~ 07:00"
                  status = {true}
                />
                <ReserveTime 
                  time = "07:00 ~ 08:00"
                  status = {true}
                />
                <ReserveTime 
                  time = "08:00 ~ 09:00"
                  status = {true}
                />
                </div>
      </div>
      </div>
    </div>
    </div>
  );
}