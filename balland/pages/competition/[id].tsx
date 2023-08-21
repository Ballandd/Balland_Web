import CompetitionResult from "../../components/CompetitionResult";
import GroupRank from "../../components/GroupRank";
import Image from 'next/image';
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Gamedate from "../../components/Gamedate";
import { idState } from "../../components/recoil/state";
import { useRecoilState } from 'recoil';
import { Icon } from "@iconify/react"

interface GameDetail {
  phase: string;
  time: string;
  facility: string;
  status: boolean;
  team1: string;
  team2: string;
  team1_score: number;
  team2_score: number;
}

export default function CompetitionDetail() {
  const router = useRouter();
  const [id, setIdState] = useRecoilState(idState);
  const [competitionId, setCompetitionId] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [duringdate, setDuringdate] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [gamedetailinfobydate, setGamedatailinfobydate] = useState<GameDetail[]>([]);
  const [grouplist, setGrouplist] = useState<any[]>([]); // 여기서 teams에 해당하는 배열 받아오게 하면됨
  // const [grouplist, setGrouplist] = useState<string[]>(["아주대학교", "아주대학교", "아주대학교"])
  const [isCategorySelect, setIsCategorySelect] = useState<boolean[]>([]);
  const [isSSR, setIsSSR] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(0);

  // 이런식으로 db에서 team을 배열로 저장하게
  // 구조 변경해야함
  // 기존의 teamOne, teamTwo, teamThree는 삭제
  const teamlist2 = [
    "아주대학교",
    "홍익대학교",
  ]
  const teamlist3 = [
    "아주대학교",
    "홍익대학교",
    "성균관대학교"
  ]
  const teamlist4 = [
    "아주대학교",
    "홍익대학교",
    "한국외국어대학교",
    "서울대학교"
  ]
  const teamlist5 = [
    "아주대학교",
    "홍익대학교",
    "연세대학교",
    "고려대학교",
    "한양대학교"
  ]

  function getDatesStartToLast(startDate: string, lastDate: string): string[] {
    var result: string[] = [];
    var curDate = new Date(startDate);
    var last = new Date(lastDate);
    last.setDate(last.getDate() + 1);
    while (curDate <= last) {
      result.push(curDate.toISOString().split("T")[0]);
      curDate.setDate(curDate.getDate() + 1);
    }
    setDuringdate(result);
    return result;
  }

  const competitiondetail = async () => {
    setCompetitionId('hello');
    await axios
      .post("/api/competition/detail", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          id: id,
        },
      })
      .then((response) => {
        setStartdate(response.data.data.startdate);
        setEnddate(response.data.data.enddate);
      });
  };

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
        setGamedatailinfobydate(response.data.data);
      });
  };

  const getgrouplist = async () => {
    await axios
      .post(`${process.env.API_URL}/groupinfo/getbycompetitionid`, {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          id: id,
        },
      })
      .then((response) => {
        setGrouplist(response.data.data);
      });
  }

  const handleClick = (idx: number) => {
    const newArr: boolean[] = Array(duringdate.length).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
  };
  const datehandleClick = (index: number) => {
    setVisibleIndex(index);
  };

  const handleRightButtonClick = () => {
    if (visibleIndex < duringdate.length - 1) {
      setVisibleIndex(visibleIndex + 1);
    }
  };

  const handleLeftButtonClick = () => {
    if (visibleIndex > 0) {
      setVisibleIndex(visibleIndex - 1);
    }
  };

  useEffect(() => {
    setIsSSR(false);
    competitiondetail();
    getgrouplist();
  }, []);

  useEffect(() => {
    if (startdate !== '') {
      getDatesStartToLast(startdate, enddate);
    }
  }, [startdate]);

  useEffect(() => {
    if (isCategorySelect.includes(true)) {
      const selectedDate = Array.from(isCategorySelect).indexOf(true);
      setSelectedDate(duringdate[selectedDate]);
    }
  }, [isCategorySelect]);

  useEffect(() => {
    gameinfobydate();
  }, [selectedDate]);

  if (!isSSR) {
    return (
      <div className="h-screen lg:h-full flex flex-col mt-5 items-center">
        <div className={`${grouplist.length > 4 ? "w-8/12" : null} flex justify-items-center overflow-x-auto overflow-y-hidden`}>
          <div className="mr-1.5">
            <GroupRank
              group= "A"
              teams= {teamlist2}
            />
          </div>
          <div className="mr-1.5">
            <GroupRank
              group= "B"
              teams= {teamlist3}
            />
          </div>
          <div className="mr-1.5">
            <GroupRank
              group= "C"
              teams= {teamlist4}
            />
          </div>
          <div className="mr-1.5">
            <GroupRank
              group= "D"
              teams= {teamlist5}
            />
          </div>
        </div>
        {/* <div className={`${grouplist.length > 4 ? "w-8/12" : null} flex justify-items-center overflow-x-auto overflow-y-hidden`}>
          {grouplist.map((group, index) => (
            <div className="mr-1.5" key={index}>
              <GroupRank
                key={index}
                group={group.name}
                teamOne={group.rank[1]}
                teamTwo={group.rank[2]}
                teamThree={group.rank[3]}
              />
            </div>
          ))}
        </div> */}
        <div className="mt-5">
          {id[0] !== '' && <Image
            src={`${process.env.IMAGE_URL}/competition/${id}.png`}
            alt=""
            width="940"
            height="410"
            unoptimized={true}
          />}
        </div>
        <div className="w-[100%] xl:w-[940px] mt-11 text-2xl font-extrabold ">
          <div className="w-[100%] flex overflow-x-auto overflow-y-hidden scrollbar-hide">
          <button 
            onClick={handleLeftButtonClick}
            className="absolute top-0 left-0 h-full flex justify-center items-center"
          >
            <Icon icon="carbon:chevron-left" />
          </button>
          <div className="flex" style={{ flex: "1 0 auto" }}>
            {duringdate && duringdate.map((item, index) => {
              return <Gamedate
                key={index}
                date={item}
                isSelected={isCategorySelect[index]}
                handleClick={handleClick}
                elementIndex={index}
              />
            })}
          </div>
          <button 
            onClick={handleRightButtonClick}
            className="absolute top-0 right-0 h-full flex justify-center items-center"  
          >
              <Icon icon="carbon:chevron-right" />
            </button>
        </div>
        </div>
        <div className="mt-3 lg:mt-11 flex flex-col">
          <div className="pb-2.5">
            {gamedetailinfobydate.length === 0 ? (
              <h1 className="mt-10 text-[15px] sm:text-[18px] lg:text-[20px] xl:text-[25px] 2xl:text-[30px]">해당 날짜에는 경기 진행이 없습니다.</h1>
            ) : (
              gamedetailinfobydate.map((item, index) => {
                return <CompetitionResult
                  Round={item.phase}
                  Time={item.time}
                  facility={item.facility}
                  status={item.status}
                  teamA={item.team1}
                  teamB={item.team2}
                  scoreA={item.team1_score}
                  scoreB={item.team2_score}
                  key={index}
                />
              }))
            }
          </div>
        </div>
      </div>
    );
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
