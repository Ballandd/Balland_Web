import Head from "next/head"
import Link from "next/link"
import WaitingService from "../../components/WaitingService.tsx"
<<<<<<< HEAD
import { useState } from "react"

export default function Reservation() {
  const [currentTab, setCurrentTab] = useState(0)

  const tabMenu = [
    { title: "tab1", content: <div>tab1</div> },
    { title: "tab2", content: <div>tab2</div> },
    { title: "tab3", content: <div>tab3</div> },
  ]
  return (
    <div>
      <Head>
        <title>Reservation Main</title>
        <link rel="icon" href="/AU.png" />
      </Head>
      <div className="h-screen">
        <div className="divide-y-2 divide-black divide-solid">
          {tabMenu.map((item, index) => {
            return (
              <button
                key={index}
                className={`${
                  currentTab === index ? "text-red-900" : ""
                } mr-10`}
                onClick={() => {
                  setCurrentTab(index)
                }}
              >
                {item.title}
              </button>
            )
          })}
        </div>
        <div>{tabMenu[currentTab].content}</div>
      </div>
    </div>
  )
}

//
=======
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
>>>>>>> edc4fa6aa8cd30442e24175e8b30baeb47701a3c
