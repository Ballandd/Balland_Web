import React, { useEffect, useState } from "react"
import Head from "next/head"
import ClubCard from "../../components/ClubCard.tsx"
import ClubInfo from "../../components/ClubInfo.tsx"

// 화면 사이즈 구하는 함수
export default function Club(props) {
  const clublist = props.data.data
  const getWindowSize = () => {
    const [windowSize, setWindowSize] = useState(0);

    useEffect(() => {
      if(typeof window !== "undefined") {
        const handleResize = () => {
          setWindowSize(window.innerWidth);
        };
  
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
      } else {
        return;
      }
    }, []);
    return windowSize;
  };

  const width = getWindowSize();
  // 480이상일 떄 true
  // 480보다 작을 때 false
  const status = width >= 480 ? true : false;

  // 초기 Balland 값들로 설정해 놓았음
  const [clubName, setclubName] = useState('Balland');
  const [clubImage, setclubImage] = useState('../BallandTeam.jpg');
  const [clubCaptain, setclubCaptain] = useState('유정협');
  const [clubPeople, setclubPeople] = useState('임형준, 우용운');
  const [clubPhonenumber, setclubPhonenumber] = useState('010-0000-0000');
  // 연혁 부분도 배열로 설정해서 map으로 보여지게 해야함
  const [clubHistory, setclubHistory] = useState(['2022년 정소대배 우승']);
  const [selectClub, setselectClub] = useState(0)

  // Club 선택했을 때
  const handleClick = (idx) => {
    setselectClub(idx);
  };
  // 이 안에 데이터들 API로 받아오면 될 거 같음
  useEffect(() => {
    setclubName(clublist[selectClub].name);
    setclubImage(clublist[selectClub].imageteam);
    setclubCaptain(clublist[selectClub].captain);
    setclubPeople(clublist[selectClub].people);
    setclubPhonenumber(clublist[selectClub].phonenumber);
    setclubHistory(clublist[selectClub].history);
  },[selectClub])

  return (
    <div className="h-max lg:h-full">
      <Head>
        <title>동아리정보</title>
        <link rel="icon" href="/AU.png"/>
      </Head>
      <div className="grid justify-items-center">
        <ClubInfo
          clubimage={clubImage}
          clubname={clubName}
          captain={clubCaptain}
          people={clubPeople}
          phonenumber={clubPhonenumber}
          history={clubHistory}
        />
        <div className="grid justify-items-center">
          <div className="grid s:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-1 s:gap-4">
            {clublist.map((club, index) => (
              <ClubCard
                key={index}
                status={status}
                imageBack={club.imageBack}
                imageAmbler={club.imageAmbler}
                name={club.name}
                info={club.info}
                color={club.color}
                handleClick={handleClick}
                elementIndex={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/club")
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}
