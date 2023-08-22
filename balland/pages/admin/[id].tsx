import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { reservationState } from "../../components/recoil/state";
import { useRecoilState } from 'recoil';
import { useRouter } from "next/router";

export default function InformationDetail() {
  const [id, setIdState] = useRecoilState(reservationState);
  const [date, setDate] = useState<string | undefined>();
  const [content, setContent] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [writer, setWriter] = useState<string | undefined>();
  const [file, setFile] = useState<string | undefined>();
  const [contact, setContact] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const [studentId, setStudentId] = useState<string | undefined>();
  const [time, setTime] = useState<string>();
  const [isSSR, setIsSSR] = useState(true);
  const [reservestate, setReservestate] = useState(false);
  const router = useRouter();
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null);
  const [ment, setMent] = useState<string | undefined>();

  const reservationdetail = async () => {
    await axios
      .post("/api/reservation/reservationdetail", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          id: id,
        },
      })
      .then((response) => {
        setDate((response.data.data[0].reservationDate).slice(0, 10));
        setContent(response.data.data[0].eventContent);
        setTitle(response.data.data[0].purpose);
        setWriter(response.data.data[0].email);
        setFile(response.data.data[0].file);
        setContact(response.data.data[0].contact);
        setStatus(response.data.data[0].status);
        setStudentId(response.data.data[0].studentId);
        setTime(response.data.data[0].time)
      });
  }; 
  const handleApprove = async () => {
    // 승인 수락 로직 구현
    try {
      await axios.post("/api/reservation/approve", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          id: id,
        },
      });
      // 승인 처리 후 필요한 작업 수행
    } catch (error) {
      console.error("승인 처리 중 오류:", error);
    }
    router.back()
  };

  const handleReject = async () => {
    // 승인 거절 로직 구현
    try {
      await axios.post("/api/reservation/refuse", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          id: id,
        },
      });
      // 거절 처리 후 필요한 작업 수행
    } catch (error) {
      console.error("거절 처리 중 오류:", error);
    }
    router.back()
  };
  
  const onApprove = () => {
      if (window.confirm('해당 예약을 승인하시겠습니까?')){
          handleApprove()
      }
  }
  const onRefuse = () => {
    if (window.confirm('해당 예약을 거부하시겠습니까?')){
        handleReject()
    }
}
  useEffect(() =>{
    if(reservestate){
        if (ment == '승인'){
            handleApprove()
        }
        else if (ment == '거부'){
            handleReject()
        }
    }
  },[reservestate])
  useEffect(() => {
    setIsSSR(false);
    reservationdetail();
    setDialog(document.querySelector("dialog"));
  }, []);

if (!isSSR) {
  return (
    <div className = "h-full">
      <Head>
        <title>세부사항</title>
        <link rel="icon" href="/AU.png" />
      </Head>
      <div className="h-screen">
        <div className="flex flex-col h-max  bg-white">
          <div className="border-slate-300 border-t-2 border-b bg-slate-200 w-full py-2 pl-4 sm:pl-6 font-semibold">
            <h1>제목: {title}</h1>
          </div>
          <div className="inline-flex mt-4 w-full pl-4 sm:pl-6 text-sm">
            <p className="mr-2">작성자: {writer}</p>
            <div className="border-slate-300 border-l-2 mr-2"></div>
            <p className="">작성 날짜: {date}</p>
          </div>
          <div className="flex flex-col mt-8 mr-2 ml-10">
            <div className="text-left">내용: {content}</div>
            <div className="text-left">연락처: {contact}</div>
            <div className="text-left">학번: {studentId}</div>
            <div className="text-left">시간: {time}시 ~ {parseInt(time!) + 2} 시</div>
            <div className="text-left">승인상태: {status}</div>
            <div className="text-left overflow-y-auto">
                {file ? (
                    <>
                    파일 :
                    <button onClick={() => window.open(file)}>{content}.pdf</button>
                    </>
                ) : null}
            </div>
        </div>
            <div className="flex justify-center mt-4 space-x-4 mb-4">
                <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={onApprove}
                >
                승인 수락
                </button>
                <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={onRefuse}
                >
                승인 거절
                </button>
            </div>
            </div>
        </div>
      </div>
  );
}
}