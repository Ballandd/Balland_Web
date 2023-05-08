import CompetitionResult from "../../components/CompetitionResult.tsx"
import GroupRank from "../../components/GroupRank.tsx"
import Image from 'next/image'
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Gamedate from "../../components/Gamedate.tsx"
import { idState } from "../../components/recoil/state.js"
import {useRecoilState} from 'recoil'

export default function CompetitionDetail() {
  const router = useRouter()
  const id = useRecoilState(idState)
  const [competitionId, setcompetitionId] = useState('');
  const [startdate, setStartdate] = useState('')
  const [enddate, setEnddate] = useState('')
  const [duringdate, setDuringdate] = useState(null)
  const [selectedDate, setselectedDate] = useState(null)
  const [gamedetailinfobydate, setGamedatailinfobydate] = useState([])
  const [grouplist, setGrouplist] = useState([])
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const [isSSR, setIsSSR] = useState(true);
  function getDatesStartToLast(startDate, lastDate) {
    var result = [];
    var curDate = new Date(startDate);
    while(curDate <= new Date(lastDate)) {
      result.push(curDate.toISOString().split("T")[0]);
      curDate.setDate(curDate.getDate() + 1);
    }
    setDuringdate(result)
    return result;
  }
  const competitiondetail = async () =>{
    setcompetitionId('hello')
    await axios
      .post(`${process.env.API_URL}/competition/detail`, {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          id: id[0],
        },
      })
      .then((response) => {
        setStartdate(response.data.data.startdate)
        setEnddate(response.data.data.enddate)
      })
  }
  const gameinfobydate = async () => {
    await axios
      .post(`${process.env.API_URL}/gameinfo/getByDate`, {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          date: selectedDate,
        },
      })
      .then((response) => {
        setGamedatailinfobydate(response.data.data)
      })
  }
  const getgrouplist = async() => {
    await axios
      .post(`${process.env.API_URL}/groupinfo/getbycompetitionid`, {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          id: id[0],
        },
      })
      .then((response) => {
        setGrouplist(response.data.data)
      })

  }

  const handleClick = (idx) => {
	  const newArr = Array(duringdate.length).fill(false);
    newArr[idx] = true;
	  setIsCategorySelect(newArr);
  };
  useEffect(() => {
    setIsSSR(false);
    competitiondetail()
    getgrouplist()
  },[])
  useEffect(() => {
    if(startdate != ''){
      getDatesStartToLast(startdate,enddate)
    }
  },[startdate])
  useEffect(()=>{
    if(isCategorySelect !=false){
      const selectedDate = Array.from(isCategorySelect).indexOf(true)
      setselectedDate(duringdate[selectedDate])
    }
  },[isCategorySelect])
  useEffect(() => {
    gameinfobydate()
  },[selectedDate])
if(!isSSR){
  return (
    <div className= "h-screen lg:h-full flex flex-col mt-5 items-center">
      <div className={`${grouplist.length >4 ? "w-8/12" : null} flex justify-items-center overflow-x-auto overflow-y-hidden`}>
        {grouplist.map((group,index) => (
          <div className="mr-1.5" key = {index}>
            <GroupRank
              key = {index}
              group={group.name}
              teamOne={group.rank[1]}
              teamTwo={group.rank[2]}
              teamThree={group.rank[3]}
            />
          </div>
        ))}
      </div>
      <div className="mt-5">
        {id[0] != '' && <Image 
          src={`${process.env.IMAGE_URL}/competition/${id[0]}.png`}
          alt="" 
          width= "940"
          height="410"
          unoptimized={true}
          />}
      </div>
      <div className="w-[100%] xl:w-[940px] mt-11 text-2xl font-extrabold ">
        <div className = "w-[100%] flex overflow-x-auto overflow-y-hidden scrollbar-hide">
          {duringdate && duringdate.map((item,index) => {
            return  <Gamedate 
                      key = {index} 
                      date = {item}
                      isSelected={isCategorySelect[index]}
                      handleClick={handleClick}
                      elementIndex={index}
                      />
          })} 
        </div>
      </div>
      <div className="mt-3 lg:mt-11 flex flex-col">
        <div className="pb-2.5">
          {gamedetailinfobydate.length === 0 ? (
            <h1 className="mt-10 text-[15px] sm:text-[18px] lg:text-[20px] xl:text-[25px] 2xl:text-[30px]">해당 날짜에는 경기 진행이 없습니다.</h1>
          ) : (
            gamedetailinfobydate.map((item,index)=>{
              return <CompetitionResult
                      Round = {item.phase}
                      Time = {item.time}
                      facility = {item.facility}
                      status = {item.status}
                      teamA = {item.team1}
                      teamB = {item.team2}
                      scoreA = {item.team1_score}
                      scoreB = {item.team2_score}
                      key = {index}
                      />
          }))
          }
      </div>
    </div>
  </div>
  )
}
}
// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//     fallback: false, // can also be true or 'blocking'
//   }
// }
// export async function getStaticProps(context) {
//   return {
//     // Passed to the page component as props
//     props: { post: {} },
//   }
// }

  // const res = await fetch(`http://localhost:5001/competition/detail?id=${params.id}`)
  // const data = await res.json()
