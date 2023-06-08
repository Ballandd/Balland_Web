import Head from "next/head"
import Link from "next/link"
import Facilitychoice from "../../components/Facilitychoice"
export default function Reservation() {
  return (
    <div className="h-full"> 
      <Head>
        <title>Reservation Main</title>
        <link rel="icon" href="/AU.png" />
      </Head>
      <div className="flex flex-wrap px-5 py-20 justify-center items-center">
          {/* First Card */}
            <Facilitychoice
              Facility="대운동장"
              Image = "/bigground.jpg"
            />
            <Facilitychoice
              Facility="소운동장"
              Image = "/groud.jpeg"
            />
            <Facilitychoice
              Facility="체육관"
              Image = "/gym.jpeg"
            />
            <Facilitychoice
              Facility="테니스장"
              Image = "/tennis.jpeg"
            />
        </div>
    </div>
  )
}
