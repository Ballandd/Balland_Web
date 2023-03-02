import React, { useEffect, useState } from 'react';
import axios from "axios";
import Calendar from 'react-calendar';
import moment from 'moment'
import FacilityCard from "../../components/FacilityCard.tsx"
import 'react-calendar/dist/Calendar.css'; // css import

export default function MyApp() {
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([])
  const onClick = async ()=> {
    await axios.post("/api/reservation/bigground",{
      method : "POST",
      Headers:{"Content-Type": "application/json" },
      body : {
        date : value,
      }
    })
  }
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
      <div>
              <Calendar
                  onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
                  onClickDay={onClick}
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
                  } } />
          </div>
          <div>
              <h1>time</h1>
          </div>
          
          </div>
  );
}