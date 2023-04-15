import CompetitionResult from "../../components/CompetitionResult.tsx"
import GroupRank from "../../components/GroupRank.tsx"
import Tournament from "../../components/Tournament.tsx"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Gamedate from "../../components/Gamedate.tsx"
let list = [
  { name: "item1" },
  { name: "item2" },
  { name: "item3" },
  { name: "item4" },
  { name: "item5" },
  { name: "item6" },
  { name: "item7" },
  { name: "item8" },
  { name: "item9" },
  { name: "item10" },
  { name: "item11" },
  { name: "item12" },
  { name: "item13" },
  { name: "item14" },
  { name: "item15" },
  { name: "item16" },
  { name: "item17" },
  { name: "item18" },
  { name: "item19" },
  { name: "item20" },
  { name: "item21" },
  { name: "item22" },
  { name: "item23" },
  { name: "item24" },
  { name: "item25" }
]; // 임시데이터 선언

export default function CompetitionDetail() {
  const router = useRouter()
  const [competitionId, setcompetitionId] = useState('');
  const [startdate, setStartdate] = useState('')
  const [enddate, setEnddate] = useState('')
  const [duringdate, setDuringdate] = useState(null)
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
  const grouplist = [
    "A조",
    "B조",
    "C조",
    "D조",
  ]
  useEffect(() => {
    competitiondetail()
  },[])
  useEffect(() => {
    if(startdate != ''){
      console.log(getDatesStartToLast(startdate,enddate))
    }
  },[startdate])
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
            />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Tournament
          team="토너먼트"
        />
      </div>
      <div className="w-[940px] h-[69px] mt-5 bg-white content-center">
        <h2 className="font-bold text-[24px] text-center">날짜</h2>
      </div>
      <div className="w-[940px] h-full mt-[46px] text-2xl font-extrabold">
      <div className = "w-[940px] flex overflow-x-auto">
        {duringdate && duringdate.map((item,index) => {
          return  <Gamedate key = {index} date = {item}/>
        })} 
      </div>
      </div>
      <div className="mt-[46px] flex flex-col">
        <div className="pb-2.5">
          <CompetitionResult
            Round="32강"
            Time="17:00"
            facility="대운동장"
            status={1}
            teamA="프라임"
            teamB="카리스마"
            scoreA={1}
            scoreB={0}
          />
        </div>
        <div className="pb-2.5">
          <CompetitionResult
            Round="32강"
            Time="18:00"
            facility="대운동장"
            status={1}
            teamA="줄리메"
            teamB="오프사이드B"
            scoreA={0}
            scoreB={3}
          />
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
