import Head from "next/head"
import WaitingService from "../../components/WaitingService.tsx"
export default function Club() {
  return (
    <div className = "h-screen">
      <Head>
        <title>동아리정보</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WaitingService/>
    </div>
  )
}