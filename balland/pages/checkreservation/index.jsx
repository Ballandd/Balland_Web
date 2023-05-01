import Head from "next/head"
import Link from "next/link"
import WaitingService from "../../components/WaitingService.tsx"


export default function Reservation() {
  return (
    <div>
      <Head>
        <title>Reservation Main</title>
        <link rel="icon" href="/AU.png" />
      </Head>
      <div className = "h-screen">
        <WaitingService />
      </div>
    </div>
  )
}
