import CompetitionResult from "../../components/CompetitionResult.tsx"
import GroupRank from "../../components/GroupRank.tsx"
import Tournament from "../../components/Tournament.tsx"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Gamedate from "../../components/Gamedate.tsx"

export default function CompetitionDetail() {
  const router = useRouter()
  const [competitionId, setcompetitionId] = useState('');
  const [startdate, setStartdate] = useState('')
  const [enddate, setEnddate] = useState('')
  const [duringdate, setDuringdate] = useState(null)
  const [selectedDate, setselectedDate] = useState(null)
  const [gamedetailinfobydate, setGamedatailinfobydate] = useState(null)
  const {viewid} = router.query || []
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
      .post("http://localhost:5001/competition/detail", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          id: viewid,
        },
      })
      .then((response) => {
        setStartdate(response.data.data.startdate)
        setEnddate(response.data.data.enddate)
      })
  }
  const gameinfobydate = async () => {
    await axios
      .post("http://localhost:5001/gameinfo/getByDate", {
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
  const grouplist = [
    "A조",
    "B조",
    "C조",
  ]
  const [isCategorySelect, setIsCategorySelect] = useState(false);

  const handleClick = (idx) => {
	  const newArr = Array(duringdate.length).fill(false);
    newArr[idx] = true;
	  setIsCategorySelect(newArr);
  };
  useEffect(() => {
    competitiondetail()
  },[])
  useEffect(() => {
    if(startdate != ''){
      getDatesStartToLast(startdate,enddate)
    }
  },[startdate])
  useEffect(()=>{
    console.log(isCategorySelect)
    if(isCategorySelect !=false){
      const selectedDate = Array.from(isCategorySelect).indexOf(true)
      setselectedDate(duringdate[selectedDate])
    }
  },[isCategorySelect])
  useEffect(() => {
    gameinfobydate()
  },[selectedDate])
  return (
    <div className="flex flex-col mt-5 justify-items-center">
      <div className="flex flex-row">
        {grouplist.map((group) => (
          <div className="mr-2.5">
            <GroupRank
              group={group}
              teamOne="아주대학교"
              teamTwo="홍익대학교"
              teamThree="중앙대학교"
              key = {index}
            />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Tournament
        team="토너먼트"
        />
      </div>
      <div className="w-[940px] h-full mt-[46px] text-2xl font-extrabold">
        <button className = "w-[940px] flex overflow-x-auto">
          {duringdate && duringdate.map((item,index) => {
            return  <Gamedate 
                      key = {index} 
                      date = {item}
                      isSelected={isCategorySelect[index]}
                      handleClick={handleClick}
                      elementIndex={index}
                      />
          })} 
        </button>
      </div>
      <div className="mt-[46px] flex flex-col">
        <div className="pb-2.5">
          {gamedetailinfobydate && gamedetailinfobydate.map((item,index)=>{
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
          })}
      </div>
    </div>
  </div>
  )
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
