import Head from "next/head"
import Link from "next/link"
import WaitingService from "../../components/WaitingService.tsx"
export default function Reservation() {
  return (
    <div className="h-screen"> 
      <Head>
        <title>Reservation Main</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WaitingService />
      {/* <div className="py-32 text-center">
        <div className="text-4xl font-extrabold">reservation page </div>
      </div>
      <div className="flex justify-center">
        <Link href="/reservation/bigground">대운동장 예약</Link>
      </div>
      <div className="flex justify-center mt-20">
        <Link href="/reservation/smallground">소운동장 예약</Link>
      </div> */}
    </div>
  )
}
