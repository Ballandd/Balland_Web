import Head from "next/head"
import ClubCard from "../../components/ClubCard.tsx"
import ClubInfo from "../../components/ClubInfo.tsx"

export default function Club() {
  const clublist = [
    "Balland",
    "AFC",
    "심볼",
    "오프사이드",
    "미디어FC",
    "단",
    "터뷸런스",
    "A2",
    "비더비즈",
    "볼랜드A",
  ]
  return (
    <div className="h-max">
      <Head>
        <title>동아리정보</title>
        <link rel="icon" href="/AU.png"/>
      </Head>
      <div className="grid justify-items-center">
        <ClubInfo
          clubimage="../BallandLogo.png"
          clubname="Balland"
          captain="유정협"
          people="임형준, 우용운"
          phonenumber="010-0000-0000"
          history="2022 정통대배 우승"
        />
        <div className="grid justify-items-center">
          <div className="grid s:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
            {clublist.map((club, index) => (
              <ClubCard
                key={index}
                imageBack="../AU.png"
                imageAmbler="../AU2.png"
                name={club}
                info="학과 학과"
            />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}