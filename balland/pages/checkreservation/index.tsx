import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

interface ReservationData {
  reservationDate: string;
  userCnt: number;
  purpose: string;
  status: string;
}

export default function Reservation() {
  const { data: session, status } = useSession();
  const [userReservation, setuserReservation] = useState<ReservationData[]>([]);
  const [isSSR, setisSSR] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const tabMenu = [
    {
      title: "전체보기",
      content: (
        <>
          {userReservation.length > 0 ? (
            userReservation.map((item, index) => {
              const statusToKo =
                item.status === 'wait' ? '승인대기':
                item.status === 'approve' ? '승인완료':
                '승인거절';
              return (
                <div
                  key={index}
                  className="flex items-center my-2 font-light text-center bg-white border-2 border-gray-200 h-[50px] rounded font-table"
                >
                  <span className="w-[30%]">
                    {moment(item.reservationDate).format("YYYY-MM-DD HH:mm:ss")}
                  </span>
                  <span className="w-[20%]">{item.userCnt}</span>
                  <span className="w-[35%] text-left">{item.purpose}</span>
                  <span className={`w-[15%] ${
                    item.status === 'wait' ? "text-green":
                    item.status === 'approve' ? "text-blue":
                    "text-red"
                  }`}>{statusToKo}</span>
                </div>
              );
            })
          ) : (
            <div>조회할 데이터가 없습니다.</div>
          )}
        </>
      ),
    },
  ];

  const getreservationinfo = async () => {
    await axios
      .post("/api/reservation/myreservation", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          email: session?.user?.email, // session 객체가 null이 아닐 때만 접근
        },
      })
      .then((response) => {
        setuserReservation(response.data.data);
      });
  };
  
  useEffect(() => {
    if (session) {
      // session 객체가 null이 아닐 때만 호출
      getreservationinfo();
    }
  }, [session]);
  useEffect(() => {
    if (userReservation.length > 0) {
      setisSSR(false);
    }
  }, [userReservation]);
  if (status === "loading") {
    // 세션 정보가 로드 중일 때
    return null;
  }
  console.log("userReservation");
  console.log(userReservation);
  
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
                    setCurrentTab(index);
                  }}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
          <div className="px-4 py-6">
            <div className="w-[100%] rounded">
              <div className="h-[50px] flex items-center text-center">
                <span className="w-[30%]">예약 날짜</span>
                <span className="w-[20%]">사용 인원</span>
                <span className="w-[35%] text-left">목적</span>
                <span className="w-[15%]">승인 상태</span>
              </div>
              <div>{tabMenu[currentTab].content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  
}