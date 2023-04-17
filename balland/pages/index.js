import Head from "next/head"
import Card from "../components/Card.tsx"
import Image from "next/image"
export default function Home() {
  return (
    <div className = "h-full">
      <Head>
        <title>Balland</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container px-5 py-10 mx-auto">
        {/* Cards Page - Title */}
        <div className="text-center mb-12">
          <h1 className="text-xl sm:text-lg md:text-6xl text-gray-700 font-semibold">
            Balland에 오신 것을 환영합니다!
          </h1>
        </div>

        <div className="flex flex-wrap -m-4">
          {/* First Card */}
          <Card
            imageSrc="/groud.jpeg"
            title="운동장 예약"
            desc="아주대학교의 대운동장, 소운동장을 예약하실 수 있습니다"
            link="/reservation"
          />

          {/* Second Card */}
          <Card
            imageSrc="/competition.jpeg"
            title="대회 정보"
            desc="아주대학교에서 진행되고 있는 축구 대회의 정보를 모아보실 수 있습니다"
            link="/competition"
          />

          {/* Third Card */}
          <Card
            imageSrc="/BallandLogo.png"
            title="동아리 정보"
            desc="아주대학교 축구 동아리의 정보를 확인하실 수 있습니다"
            link="/club"
          />
        </div>
      </div>
    </div>
  )
}
