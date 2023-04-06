import React, { useEffect, useState } from "react"
import axios from "axios"
import Introduce from "../../components/Introduce.tsx"
import FacilityCard from "../../components/FacilityCard.tsx"
import { DatePicker } from "@mantine/dates"
import { Group } from "@mantine/core"
import ReserveTime from "../../components/ReserveTime.tsx"
import Link from "next/link"
export default function MyApp() {
  const [value, setValue] = useState(new Date())
  const [mindate, setMindate] = useState(new Date())
  const [maxdate, setmaxDate] = useState(new Date())
  const [choiceTime, setChoiceTime] = useState(false)
  const [eight, setEight] = useState(true)
  const [ten, setTen] = useState(true)
  const [twelve, setTwelve] = useState(true)
  const [fourteen, setFourteen] = useState(true)
  const [sixteen, setSixteen] = useState(true)
  const [eightteen, setEightteen] = useState(true)
  const [linktime, setLinktime] = useState(0)
  const availabletime = [
    "08:00 ~ 10:00",
    "10:00 ~ 12:00",
    "12:00 ~ 14:00",
    "14:00 ~ 16:00",
    "16:00 ~ 18:00",
    "18:00 ~ 20:00",
  ]
  // 54.180.8.70
  const reservationstatus = [eight, ten, twelve, fourteen, sixteen, eightteen]
  const onClick = async () => {
    var year = value.getFullYear();
    var month = ('0' + (value.getMonth() + 1)).slice(-2);
    var day = ('0' + (value.getDate())).slice(-2);
    var dateString = new Date(`${year}-${month}-${day}T15:00:00.000Z`)
    dateString.setDate(dateString.getDate()-1)
    await axios
      .post("http://54.180.8.70:5001/reservation/bigground", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          date: dateString
        },
      })
      .then((response) => {
        console.log(response.data)
        setEight(response.data.data[8])
        setTen(response.data.data[10])
        setTwelve(response.data.data[12])
        setFourteen(response.data.data[14])
        setSixteen(response.data.data[16])
        setEightteen(response.data.data[18])
      })
  }
  const timeClick = (idx) => {
    const newArr = Array(availabletime.length).fill(false)
    newArr[idx] = true
    setChoiceTime(newArr)
  }

  useEffect(() => {
    onClick()
    setChoiceTime(false)
  }, [value])

  useEffect(() => {
    const maxday = new Date()
    maxday.setDate(maxday.getDate() + 14)
    setmaxDate(maxday)
  }, [])

  useEffect(() => {
    const timeset = choiceTime
    const time = Array.from(timeset).indexOf(true)
    setLinktime(8 + time * 2)
  }, [choiceTime])

  return (
    <div className="grid justify-items-center">
      <div className="flex ">
        <FacilityCard picture="/groud.jpeg" />
        <Introduce
          facilityname="대운동장"
          phonenumber="041-566-8775"
          location="수원시"
        />
      </div>
      <div className="flex mt-[21px]">
        <div className="w-[570px] h-[398px] bg-white">
          <Group position="center">
            <DatePicker
              hideOutsideDates
              value={value}
              onChange={setValue}
              size="lg"
              defaultDate={value}
              minDate={mindate}
              maxDate={maxdate}
            />
          </Group>
        </div>
        <div className="w-[350px] h-[398px] bg-white ml-[20px]">
          <div className="divide-y-2 divide-solid divide-black ">
            <h2 className=" mt-5 ml-[35px] mr-[35px] md-[10px] left-9 top-5 font-mono text-left text-xl font-semibold">
              예약 현황 확인
            </h2>
            <div className="grid grid-cols-2 mt-4 ml-[35px] mr-[35px]">
              {availabletime.map((time, index) => (
                <ReserveTime
                  key={index}
                  time={time}
                  status={reservationstatus[index]}
                  isSelected={choiceTime[index]}
                  handleClick={timeClick}
                  elementIndex={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-[21px]">
        <div className="w-[570px] h-[60px]"></div>
        <Link
          href={{
            pathname: "/reservation/bigground/[time]",
            query: { time: linktime, date: String(value) },
          }}
        >
          <button className="w-[350px] h-[60px] ml-[20px] bg-blue-600 rounded-lg text-white text-[20px]">
            예약 하기
          </button>
        </Link>
      </div>
    </div>
  )
}
