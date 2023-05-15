import Head from "next/head"
import Link from "next/link"
import WaitingService from "../../components/WaitingService.tsx"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Reservation() {
  const { data: session, status } = useSession()
  const [userReservation, setuserReservation] = useState([]) //유저의 reservation 정보 여기에 담겨있습니다
  const [isSSR, setisSSR] = useState(true)

  const [currentTab, setCurrentTab] = useState(0)

  const tabMenu = [
    { title: "전체보기", content: <div>전체보기</div> },
    { title: "예약ing", content: <div>예약ing</div> },
    { title: "예약ed", content: <div>예약ed</div> },
  ]

  const getreservationinfo = async () => {
    await axios
      .post(`${process.env.API_URL}/reservation/myreservation`, {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          email: session?.user?.name, // session 객체가 null이 아닐 때만 접근
        },
      })
      .then((response) => {
        console.log(response)
        setuserReservation(response.data.data)
      })
  }
  useEffect(() => {
    if (session) {
      // session 객체가 null이 아닐 때만 호출
      getreservationinfo()
    }
  }, [session])
  useEffect(() => {
    if (userReservation != null) {
      setisSSR(false)
    }
  }, [userReservation])
  if (status === "loading") {
    // 세션 정보가 로드 중일 때
    return null
  }
  if (!isSSR) {
    return (
      <div>
        <Head>
          <title>Reservation Main</title>
          <link rel="icon" href="/AU.png" />
        </Head>
        <div className="h-screen">
          <div className="border-b">
            {tabMenu.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    currentTab === index
                      ? "text-sky-600 border-sky-600"
                      : "border-transparent hover:border-gray-200"
                  } py-2 border-b-4 transition-colors duration-300 mr-8`}
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
}
