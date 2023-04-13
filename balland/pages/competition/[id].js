import React from "react"
import CompetitionResult from "../../components/CompetitionResult.tsx"
import GroupRank from "../../components/GroupRank.tsx"
import Tournament from "../../components/Tournament.tsx"
import { useRouter } from "next/router"

export default function CompetitionDetail({props}) {
  console.log(props)

  const grouplist = [
    "A조",
    "B조",
    "C조",
    "D조",
  ]
 
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
        <h2 className="text-center">03.18 SAT</h2>
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
export async function getStaticPaths() {
	const res = await fetch('http://localhost:3000/competition/')
  const posts = await res.json()
  console.log(posts)
	return {
		paths : posts,
		fallback: false,
	};
}
// export async function getStaticProps(context) {
//   console.log(context)
//   // const res = await fetch(`http://localhost:5001/competition/detail?id=${params.id}`)
//   // const data = await res.json()
//   return {
//     props: {
//       context,
//     },
//   }
// }