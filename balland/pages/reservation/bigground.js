import React, { useEffect, useState } from 'react';
import axios from "axios";
import Calendar from 'react-calendar';
import moment from 'moment'
import FacilityCard from "../../components/FacilityCard.tsx"
import 'react-calendar/dist/Calendar.css'; // css import

export default function MyApp() {
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([])
  const [eight, setEight] = useState(true)
  const [ten, setTen] = useState(true)
  const [twelve, setTwelve] = useState(true)
  const [fourteen, setFourteen] = useState(true)
  const [sixteen, setSixteen] = useState(true)
  const onClick = async ()=> {
    await axios.post("/api/reservation/bigground",{
      method : "POST",
      Headers:{"Content-Type": "application/json" },
      body : {
        date : value,
      }
    }).then(response => {
        console.log(response.data)
        setEight(response.data[8])
        setTen(response.data[10])
        setTwelve(response.data[12])
        setFourteen(response.data[14])
        setSixteen(response.data[16])
    })
  }
  useEffect(()=>{
    onClick()
  },[value])
  return (
      <div className = "grid grid-cols-2 gap-4 p-3">
      <div className = "col-span-2">
          <FacilityCard
            imageSrc="/groud.jpeg"
            title="대운동장"
            desc="아주대학교의 Homeground"
            link = "../reservation"
          />
      </div>
      <div className = "mt-10">
              <Calendar
                  onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
                  value ={value}
                  formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                  value={value}
                  minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                  maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                  navigationLabel={null}
                  showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                  className="mx-auto w-full text-sm border-b"
                  tileContent={({ date, view }) => {
                      // 추가할 html 태그를 변수 초기화
                      let html = [];
                      // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                      if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                          html.push(<div className="dot"></div>);
                      }
                      // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
                      return (
                          <>
                              <div className="flex justify-center items-center absoluteDiv">
                                  {html}
                              </div>
                          </>
                      );
                  } }
                   />
          </div>
          <div className = "w-full mt-10 p-0">
              <h4 className = "text-lg">선택날짜 {value.getFullYear()}년 {value.getMonth()+1}월 {value.getDate()}일 </h4>
              <ul className = "overflow-x-hidden	overflow-y-auto	">
                <li className = "w-2/4 float-left mt-0 mx-0 mb-8 pr-6	box-border">
                  <div className="w-full h-14 px-5 py-0 border-2 border-gray-400 rounded-md">
                    <h4 className = "float-left relative mt-3 pl-22 text-base font-semibold ">08:00 ~ 10:00</h4>
                    <span className = "float-right relative mt-3">{eight == true ? <h4 className = "text-blue-600	">예약 가능</h4> : <h4 className = "text-red-500	">예약 불가</h4>}</span>
                  </div>
                </li>
                <li className = "w-2/4 float-left mt-0 mx-0 mb-8 pr-6	box-border">
                  <div className="w-full h-14 px-5 py-0 border-2 border-gray-400 rounded-md">
                    <h4 className = "float-left relative mt-3 pl-22 text-base font-semibold ">10:00 ~ 12:00</h4>
                    <span className = "float-right relative mt-3">{ten == true ? <h4 className = "text-blue-600	">예약 가능</h4> : <h4 className = "text-red-500	">예약 불가</h4>}</span>
                  </div>
                </li>
                <li className = "w-2/4 float-left mt-0 mx-0 mb-8 pr-6	box-border">
                  <div className="w-full h-14 px-5 py-0 border-2 border-gray-400 rounded-md">
                  <h4 className = "float-left relative mt-3 pl-22 text-base font-semibold ">12:00 ~ 14:00</h4>
                    <span className = "float-right relative mt-3">{twelve == true ? <h4 className = "text-blue-600	">예약 가능</h4> : <h4 className = "text-red-500	">예약 불가</h4>}</span>
                  </div>
                </li>
                <li className = "w-2/4 float-left mt-0 mx-0 mb-8 pr-6	box-border">
                  <div className="w-full h-14 px-5 py-0 border-2 border-gray-400 rounded-md">
                  <h4 className = "float-left relative mt-3 pl-22 text-base font-semibold ">14:00 ~ 16:00</h4>
                    <span className = "float-right relative mt-3">{fourteen == true ? <h4 className = "text-blue-600	">예약 가능</h4> : <h4 className = "text-red-500	">예약 불가</h4>}</span>
                  </div>
                </li>
                <li className = "w-2/4 float-left mt-0 mx-0 mb-8 pr-6	box-border">
                  <div className="w-full h-14 px-5 py-0 border-2 border-gray-400 rounded-md">
                  <h4 className = "float-left relative mt-3 pl-22 text-base font-semibold ">16:00 ~ 18:00</h4>
                    <span className = "float-right relative mt-3">{sixteen == true ? <h4 className = "text-blue-600	">예약 가능</h4> : <h4 className = "text-red-500	">예약 불가</h4>}</span>
                  </div>
                </li>
                <li className = "w-2/4 float-left mt-0 mx-0 mb-8 pr-6	box-border">
                  <div className="w-full h-14 px-5 py-0 border-2 border-gray-400 rounded-md">
                  <h4 className = "float-left relative mt-3 pl-22 text-base font-semibold ">18:00 ~ 20:00</h4>
                    <span className = "float-right relative mt-3">{twelve == true ? <h4 className = "text-blue-600	">예약 가능</h4> : <h4 className = "text-red-500	">예약 불가</h4>}</span>
                  </div>
                </li>
              </ul>
          </div>
          
          </div>
  );
}