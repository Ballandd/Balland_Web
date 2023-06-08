import Head from "next/head";
import Link from "next/link";
import WaitingService from "../../components/WaitingService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

interface ReservationData {
  reservationDate: string;
  userCnt: number;
  purpose: string;
}

export default function Reservation() {
  const { data: session, status } = useSession();
  const [userReservation, setuserReservation] = useState<ReservationData[]>([]);
  const [userlastReservation, setuserLastReservation] = useState<ReservationData[]>([]);
  const [userfutureReservation, setuserfutureReservation] = useState<ReservationData[]>([]);
  const [isSSR, setisSSR] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const tabMenu = [
    {
      title: "전체보기",
      content: (
        <>
          {userReservation.length > 0 ? (
            userReservation.map((item, index) => {
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
                  <span className="w-[15%]">-</span>
                </div>
              );
            })
          ) : (
            <div>조회할 데이터가 없습니다.</div>
          )}
        </>
      ),
    },
    { title: "예약ing", content: <div>예약ing</div> },
    { title: "예약ed", content: <div>예약ed</div> },
  ];

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
        setuserReservation(response.data.data);
      });
  };
  const getoldreservationinfo = async () => {
    await axios
      .post("/api/reservation/mylastreservation", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          email: session?.user?.name,
        },
      })
      .then((response) => {
        setuserLastReservation(response.data.data);
      });
  };
  const getfuturereservationinfo = async () => {
    await axios
      .post("/api/reservation/myfuturereservation", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          email: session?.user?.name,
        },
      })
      .then((response) => {
        setuserfutureReservation(response.data.data);
      });
  };
  useEffect(() => {
    if (session) {
      // session 객체가 null이 아닐 때만 호출
      getreservationinfo();
      getoldreservationinfo();
      getfuturereservationinfo();
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
}