import Head from "next/head";
import Link from "next/link";
import WaitingService from "../../components/WaitingService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useRecoilState } from 'recoil';
import { reservationState } from "../../components/recoil/state";
import { useRouter } from "next/router";

interface ReservationData {
    _id : string;
  reservationDate: string;
  userCnt: number;
  purpose: string;
  status : string;
  time : number;
  file : string;
}

export default function Reservation() {
  const { data: session, status } = useSession();
  const [userReservation, setuserReservation] = useState<ReservationData[]>([]);
  const [userlastReservation, setuserLastReservation] = useState<ReservationData[]>([]);
  const [userfutureReservation, setuserfutureReservation] = useState<ReservationData[]>([]);
  const [isSSR, setisSSR] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 한 페이지당 보여줄 아이템 수
  const totalPages = Math.ceil(userReservation.length / itemsPerPage); // 총 페이지 수
  const [id, setidstate] = useRecoilState(reservationState)
  const router = useRouter();

  const currentPageData = userReservation.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  
  const tabMenu = [
    {
      title: "예약조회",
      content: (
        <>
          {userReservation.length > 0 ? (
            currentPageData.map((item, index) => {
              const formattedDate = moment(item.reservationDate)
              .subtract(1, 'day')
              .format("YYYY-MM-DD");

              const statusToKo =
                item.status === 'wait' ? '승인대기':
                item.status === 'approve' ? '승인완료':
                '승인거절';
              return (
                <div
                  key={index}
                  className="flex items-center my-2 font-light text-center bg-white border-2 border-gray-200 h-[50px] rounded font-table cursor-pointer"
                  onClick = {() => {
                    setidstate(item._id);
                    router.push({
                      pathname: "/admin/[id]",
                      query: {id: item._id}
                    })
                  }}
                >
                  <span className="w-[30%]">
                    {formattedDate} / {item.time}시
                  </span>
                  <span className="w-[20%]">{item.userCnt}</span>
                  <span className="w-[35%] text-left">{item.purpose}</span>
                  <span className={`w-[15%] font-bold ${
                    item.status === 'wait' ? "text-green-600":
                    item.status === 'approve' ? "text-blue-600":
                    "text-red-600"
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
      .post("/api/reservation/allreservation", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          email: session?.user?.email, // session 객체가 null이 아닐 때만 접근
        },
      })
      .then((response) => {
        const reversedData = response.data.data.reverse();
        setuserReservation(reversedData);
      });
  };
  useEffect(() => { //필요없는 코드인거 같은데 일단 더블 체크
    if (session) {
      if (session.user?.email !== 'admin@balland.com') {
        router.replace('/'); 
        return; // 함수 종료
      }

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
            {/* 페이지 네비게이션 추가 */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-3 py-1 rounded-full ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
