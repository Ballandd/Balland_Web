import Head from "next/head"
import Link from "next/link"
import WaitingService from "../../components/WaitingService.tsx"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Reservation() {
  const { data: session, status } = useSession()
  const [userReservation, setuserReservation] = useState([])  //유저의 reservation 정보 여기에 담겨있습니다
  const [isSSR, setisSSR] = useState(true)
  const getreservationinfo = async () => {
    await axios
      .post(`${process.env.API_URL}/reservation/myreservation`, {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          email : session?.user?.name // session 객체가 null이 아닐 때만 접근
        },
      })
      .then((response) => {
        console.log(response)
        setuserReservation(response.data.data)
      })
  }
  useEffect(() => {
    if (session) { // session 객체가 null이 아닐 때만 호출
      getreservationinfo()
    }
  },[session])
  useEffect(()=>{
    if (userReservation!=null){
      setisSSR(false)
    }
  },[userReservation])
  if (status === "loading") { // 세션 정보가 로드 중일 때
    return null
  }
  if(!isSSR){
    return (
      <div>
        <Head>
          <title>Reservation Main</title>
          <link rel="icon" href="/AU.png" />
        </Head>
        <div className = "h-screen">
          
        </div>
      </div>
    )
  }
}