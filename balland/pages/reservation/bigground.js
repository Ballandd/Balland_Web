import React, { useEffect, useState } from "react"
import axios from "axios"
import Introduce from "../../components/Introduce.tsx"
import FacilityCard from "../../components/FacilityCard.tsx"
import { DatePicker } from "@mantine/dates"
import { Group } from "@mantine/core"
import ReserveTime from "../../components/ReserveTime.tsx"
import Link from "next/link"
import { useMediaQuery } from '@mantine/hooks';
import { Router } from "next/router"
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
    var year = value.getFullYear()
    var month = ("0" + (value.getMonth() + 1)).slice(-2)
    var day = ("0" + value.getDate()).slice(-2)
    var dateString = new Date(`${year}-${month}-${day}T15:00:00.000Z`)
    dateString.setDate(dateString.getDate() - 1)
    await axios
      .post("/api/reservation/bigground", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          date: dateString,
        },
      })
      .then((response) => {
        setEight(response.data[8])
        setTen(response.data[10])
        setTwelve(response.data[12])
        setFourteen(response.data[14])
        setSixteen(response.data[16])
        setEightteen(response.data[18])
      })
  }
  const timeClick = (idx) => {
    const newArr = Array(availabletime.length).fill(false)
    newArr[idx] = true
    setChoiceTime(newArr)
  }
  
  const xlsize = useMediaQuery('(min-width: 1280px)');
  const lgsize = useMediaQuery('(min-width: 1024px)');
  const mdsize = useMediaQuery('(min-width: 768px)');
  const smsize = useMediaQuery('(min-width: 640px)');
  const ssize = useMediaQuery('(min-width: 480px)');

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
      <div className="md:flex space-y-4 md:space-y-0">
        <FacilityCard picture="/groud.jpeg" />
        <Introduce
          facilityname="대운동장"
          phonenumber="041-566-8775"
          location="수원시"
        />
      </div>
      <div className=" md:flex mt-[21px] space-y-4 md:space-y-0">
        <div className="xxs:w-[232px] xs:w-[290px] s:w-[337px] sm:w-[450px] md:w-[342px] lg:w-[456px] xl:w-[570px] xxs:h-[220px] sm:h-[220px] md:h-[228px] lg:h-[304px] xl:h-[398px] bg-white">
          <Group position="center">
            <DatePicker
              hideOutsideDates
              value={value}
              onChange={setValue}
              defaultDate={value}
              minDate={mindate}
              maxDate={maxdate}
              size = {xlsize ? 'lg' : lgsize ? 'sm' : 'xs'}
              />
          </Group>
        </div>
        <div className="xxs:w-[232px] xs:w-[290px] s:w-[337px] sm:w-[450px] md:w-[210px] lg:w-[280px] xl:w-[350px] xxs:h-[165px] sm:h-[220px] md:h-[228px] lg:h-[304px] xl:h-[398px]  bg-white md:ml-[20px] overflow-auto">
          <div className="divide-y-2 divide-solid divide-black ml-[35px] mr-[35px]">
            <h2 className="mt-5 left-9 top-5 text-left xs:text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] xl:text-[30px] font-semibold">
              예약 현황 확인
            </h2>
            <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-1 md:items-center lg:grid-cols-2 xxs:mt-2 sm:mt-4 md:mt-3 lg:mt-5">
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
        <div className="md:w-[342px] lg:w-[456px] xl:w-[570px] md:h-[228px] lg:h-[304px] xl:h-[398px]"></div>
        <Link
          href={{
            pathname: "/reservation/bigground/[time]",
            query: { viewtime: linktime, time: linktime, date: String(value) },
          }}
          as="/reservation/bigground/reservationdetail"
        >
          <button className="xxs:w-[232px] xs:w-[290px] s:w-[337px] sm:w-[450px] md:w-[210px] lg:w-[280px] xl:w-[350px] xxs:h-[40px] s:h-[40px] sm:h-[40px] md:h-[38px] lg:h-[50px] xl:h-[60px] md:ml-[20px] bg-blue-600 rounded-lg text-white xs:text-[13px] s:text-[15px] lg:text-[20px]">
            예약 하기
          </button>
        </Link>
      </div>
    </div>
  )
}
