import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import PickFacility from "../../../components/PickFacility";
import useModal from "../../../components/Modal/useModal";
import Modal from "../../../components/Modal";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";

interface ReservationFormData {
  username: string;
  phonenumber: string;
  email: string;
  studentid: string;
  totalnumber: number;
  purpose: string;
  content: string;
  etc: FileList;
}

const Reservationtime = (props: any) => {
  const { data: session, status } = useSession();
  const [reservationTime, setReservationTime] = useState("");
  const router = useRouter();
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null);
  const [reservestate, setReservestate] = useState(false);
  const [reservedate, setReservedate] = useState<ReservationFormData | undefined>(undefined);
  let { viewtime, date } = router.query as { viewtime: string, date: string[] };
  const [viewyear, setviewYear] = useState<string>("");
  const [viewmonth, setviewMonth] = useState<string>("");
  const [viewdate, setviewDate] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<ReservationFormData>();

  const reservationInfoRegister = async (data: ReservationFormData | undefined) => {
    date = Array.isArray(date) ? date : [date];
    if (data != undefined){
    if (data.etc[0] != null) {
      const files = new FormData();
      files.append("files", data.etc[0]);
      axios.post(`${process.env.API_URL}/uploadfile`, files).then((res) => {
        for (let i = 0; i < date.length; i++) {
          const reservetime = parseInt(date[i].slice(11, 13));
          const clone = new Date(date[i].slice(0, 10));
          const year = clone.getFullYear();
          const month = ("0" + (clone.getMonth() + 1)).slice(-2);
          const day = ("0" + clone.getDate()).slice(-2);
          const dateString = new Date(`${year}-${month}-${day}T15:00:00.000Z`);
          clone.setDate(clone.getDate() + 1);
          axios.post(`${process.env.API_URL}/reservation/createReservation`, {
            method: "POST",
            Headers: { "Content-Type": "application/json" },
            body: {
              name: data.username,
              contact: data.phonenumber,
              email: data.email,
              studentId: data.studentid,
              userCnt: data.totalnumber,
              purpose: data.purpose,
              eventContent: data.content,
              file: res.data.data,
              time: reservetime,
              reservationDate: dateString.toISOString(),
              userId: session?.user?.email,
            },
          });
        }
      });
      alert("예약완료");
      router.push("/");
    } else {
      for (let i = 0; i < date.length; i++) {
        const reservetime = parseInt(date[i].slice(11, 13));
        const clone = new Date(date[i].slice(0, 10));
        const year = clone.getFullYear();
        const month = ("0" + (clone.getMonth() + 1)).slice(-2);
        const day = ("0" + clone.getDate()).slice(-2);
        const dateString = new Date(`${year}-${month}-${day}T15:00:00.000Z`);
        clone.setDate(clone.getDate() + 1);
        await axios.post(`${process.env.API_URL}/reservation/createReservation`, {
          method: "POST",
          Headers: { "Content-Type": "application/json" },
          body: {
            name: data.username,
            contact: data.phonenumber,
            email: data.email,
            studentId: data.studentid,
            userCnt: data.totalnumber,
            purpose: data.purpose,
            eventContent: data.content,
            file: "",
            time: reservetime,
            reservationDate: dateString.toISOString(),
            userId: session?.user?.email,
          },
        });
      }
      alert("예약완료");
      router.push("/");
    }
  };
  }
  const { openModal } = useModal(dialog);

  const openModalfunction = async (data: ReservationFormData | undefined) => {
    openModal();
    setReservedate(data);
  };

  const modalState = () => {
    setReservestate(true);
  };

  useEffect(() => {
    if (date.length > 10) {
      date = [date[0]];
    }
    const maxtime = Number(viewtime) + 2;
    setReservationTime(`${viewtime}:00 ~ ${maxtime}:00`);
    const viewdate = new Date(date[0]);
    setviewYear(viewdate.getFullYear().toString());
    setviewMonth((viewdate.getMonth() + 1).toString().padStart(2, "0"));
    setviewDate(viewdate.getDate().toString().padStart(2, "0"));
  }, []);

  useEffect(() => {
    setDialog(document.querySelector("dialog"));
  }, []);

  useEffect(() => {
    if (reservestate) {
      reservationInfoRegister(reservedate);
      setReservestate(false);
    }
  }, [reservestate]);

  return (
    <div className="h-full">
      <Head>
        <title>Balland</title>
        <link rel="icon" href="/AU.png" />
      </Head>
      <div className="grid justify-items-center">
        <Modal
          title="예약을 진행하시겠습니까?"
          date={`${viewyear}년 ${viewmonth}월 ${viewdate}일`}
          time={reservationTime}
          name={session?.user?.email}
          selected={() => modalState()}
        />
        <div className="lg:hidden">
          <PickFacility facilityname="대운동장" picture="/groud.jpeg" dates={date} />
        </div>
      <form onSubmit={handleSubmit(openModalfunction)} className="flex mt-[13px] s:mt-[16px] sm:mt-[20px] lg:mt-0">
        <div className="grid grid-row">
          <div className="w-[250px] xs:w-[280px] s:w-[342px] sm:w-[456px] md:w-[570px] lg:w-[456px] xl:w-[570px] h-[240px] xs:h-[270px] s:h-[250px] sm:h-[264px] md:h-[330px] lg:h-[264px] xl:h-[330px] bg-white">
            <div className="divide-y-2 divide-solid divide-black">
              <h2 className="xxs:mt-[10px] xxs:ml-[8px] xxs:mr-[8px] s:mt-[10px] s:ml-[8px] s:mr-[8px] sm:mt-[16px] sm:ml-[28px] sm:mr-[28px] md:mt-[20px] md:ml-[35px] md:mr-[35px] lg:mt-[16px] lg:ml-[28px] lg:mr-[28px] xl:mt-[20px] xl:ml-[35px] xl:mr-[35px] left-9 top-5 font-mono text-left s:text-[13px] sm:text-[16px] md:text-[20px] lg:text-[16px] xl:text-[20px] font-bold">
                예약하기
              </h2>
              <div className="mt-[9px] ml-[7px] :mr-[7px] xs:mt-[10px] xs:ml-[8px] xs:mr-[8px] s:mt-[10px] s:ml-[8px] s:mr-[8px] sm:mt-[16px] sm:ml-[28px] sm:mr-[28px] md:mt-[20px] md:ml-[35px] md:mr-[35px] lg:mt-[16px] lg:ml-[28px] lg:mr-[28px] xl:mt-[20px] xl:ml-[35px] xl:mr-[35px]">

                <div className="flex flex-row xxs:mt-[5px] s:mt-[6px] sm:mt-[8px] md:mt-[10px] lg:mt-[8px] xl:mt-[10px]">
                  <div className="xxs:w-[40px] s:w-[40px] sm:w-[45px] md:w-[53px] lg:w-[45px] xl:w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[10px] sm:text-[11px] md:text-[13px] lg:text-[11px] xl:text-[13px] font-bold"
                      htmlFor="username"
                    >
                      신청자명
                    </label>
                  </div>
                  <div className="ml-[20px] h-[40px] xs:ml-[25px] xs:h-[45px] s:ml-[35px] s:h-[43px] sm:ml-[39px] sm:h-[40px] md:ml-[47px] md:h-[50px] lg:ml-[39px] lg:h-[40px] xl:ml-[47px] xl:h-[50px]">
                    <input
                      {...register("username", {
                        required: "신청자명은 필수 입력사항입니다.",
                      })}
                      className="shadow appearance-none border rounded w-[180px] h-[25px] xs:w-[190px] xs:h-[27px] s:w-[250px] s:h-[27px] sm:w-[300px] sm:h-[27px] md:w-[400px] md:h-[34px] lg:w-[300px] xl:w-[400px] lg:h-[27px] xl:h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px] "
                      id="username"
                      type="text"
                      placeholder="신청자명 입력"
                    />
                    <div className="text-red-600 px-2">
                      {errors.username && (
                        <small role="alert" className= "text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]">{errors.username.message}</small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row xxs:mt-[5px] s:mt-[6px] sm:mt-[8px] md:mt-[10px] lg:mt-[8px] xl:mt-[10px]">
                  <div className="xxs:w-[40px] s:w-[40px] sm:w-[45px] md:w-[53px] lg:w-[45px] xl:w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[10px] sm:text-[11px] md:text-[13px] lg:text-[11px] xl:text-[13px] font-bold"
                      htmlFor="phonenumber"
                    >
                      연락처
                    </label>
                  </div>
                  <div className="ml-[20px] h-[40px] xs:ml-[25px] xs:h-[45px] s:ml-[35px] s:h-[43px] sm:ml-[39px] sm:h-[40px] md:ml-[47px] md:h-[50px] lg:ml-[39px] lg:h-[40px] xl:ml-[47px] xl:h-[50px]">
                    <input
                      {...register("phonenumber", {
                        required: "전화번호는 필수 입력사항입니다.",
                        pattern: {
                          value: /\d{3}-\d{4}-\d{4}/,
                          message: "전화번호 형식에 맞지 않습니다.",
                        },
                      })}
                      className="shadow appearance-none border rounded w-[180px] h-[25px] xs:w-[190px] xs:h-[27px] s:w-[250px] s:h-[27px] sm:w-[300px] sm:h-[27px] md:w-[400px] md:h-[34px] lg:w-[300px] xl:w-[400px] lg:h-[27px] xl:h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px] "
                      id="phonenumber"
                      type="text"
                      placeholder="연락처 입력 (010-1234-5678)"
                    />
                    <div className="text-red-600 px-2">
                      {errors.phonenumber && (
                        <small role="alert" className= "text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]">{errors.phonenumber.message}</small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row xxs:mt-[5px] s:mt-[6px] sm:mt-[8px] md:mt-[10px] lg:mt-[8px] xl:mt-[10px]">
                  <div className="xxs:w-[40px] s:w-[40px] sm:w-[45px] md:w-[53px] lg:w-[45px] xl:w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[10px] sm:text-[11px] md:text-[13px] lg:text-[11px] xl:text-[13px] font-bold"
                      htmlFor="email"
                    >
                      이메일
                    </label>
                  </div>
                  <div className="ml-[20px] h-[40px] xs:ml-[25px] xs:h-[45px] s:ml-[35px] s:h-[43px] sm:ml-[39px] sm:h-[40px] md:ml-[47px] md:h-[50px] lg:ml-[39px] lg:h-[40px] xl:ml-[47px] xl:h-[50px]">
                    <input
                      {...register("email", {
                        required: "이메일은 필수 입력사항입니다.",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "이메일 형식에 맞지 않습니다.",
                        },
                      })}
                      className="shadow appearance-none border rounded w-[180px] h-[25px] xs:w-[190px] xs:h-[27px] s:w-[250px] s:h-[27px] sm:w-[300px] sm:h-[27px] md:w-[400px] md:h-[34px] lg:w-[300px] xl:w-[400px] lg:h-[27px] xl:h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]"
                      id="email"
                      type="text"
                      placeholder="이메일 입력"
                    />
                    <div className="text-red-600 px-2">
                      {errors.email && (
                        <small role="alert" className= "text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]">{errors.email.message}</small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row xxs:mt-[5px] s:mt-[6px] sm:mt-[8px] md:mt-[10px] lg:mt-[8px] xl:mt-[10px]">
                  <div className="xxs:w-[40px] s:w-[40px] sm:w-[45px] md:w-[53px] lg:w-[45px] xl:w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[10px] sm:text-[11px] md:text-[13px] lg:text-[11px] xl:text-[13px] font-bold"
                      htmlFor="studentid"
                    >
                      학번
                    </label>
                  </div>
                  <div className="ml-[20px] h-[40px] xs:ml-[25px] xs:h-[45px] s:ml-[35px] s:h-[43px] sm:ml-[39px] sm:h-[40px] md:ml-[47px] md:h-[50px] lg:ml-[39px] lg:h-[40px] xl:ml-[47px] xl:h-[50px]">
                    <input
                      {...register("studentid", {
                        required: "학번은 필수 입력사항입니다.",
                        pattern: {
                          value: /\d{9}/,
                          message: "학번 형식에 맞지 않습니다.",
                        },
                      })}
                      className="shadow appearance-none border rounded w-[180px] h-[25px] xs:w-[190px] xs:h-[27px] s:w-[250px] s:h-[27px] sm:w-[300px] sm:h-[27px] md:w-[400px] md:h-[34px] lg:w-[300px] xl:w-[400px] lg:h-[27px] xl:h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]"
                      id="studentid"
                      type="text"
                      placeholder="학번 입력"
                    />
                    <div className="text-red-600 px-2">
                      {errors.studentid && (
                        <small role="alert" className= "text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]">{errors.studentid.message}</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-[250px] xs:w-[280px] s:w-[342px] sm:w-[456px] md:w-[570px] lg:w-[456px] xl:w-[570px] h-[240px] xs:h-[240px] s:h-[250px] sm:h-[264px] md:h-[330px] lg:h-[264px] xl:h-[330px] bg-white mt-[10px] sm:mt-[16px]">
            <div className="divide-y-2 divide-solid divide-black">
              <h2 className="xxs:mt-[10px] xxs:ml-[8px] xxs:mr-[8px] s:mt-[10px] s:ml-[8px] s:mr-[8px] sm:mt-[16px] sm:ml-[28px] sm:mr-[28px] md:mt-[20px] md:ml-[35px] md:mr-[35px] lg:mt-[16px] lg:ml-[28px] lg:mr-[28px] xl:mt-[20px] xl:ml-[35px] xl:mr-[35px] left-9 top-5 font-mono text-left s:text-[13px] sm:text-[16px] md:text-[20px] lg:text-[16px] xl:text-[20px] font-bold">
                사용목적
              </h2>
              <div className="mt-[9px] ml-[7px] :mr-[7px] xs:mt-[10px] xs:ml-[8px] xs:mr-[8px] s:mt-[10px] s:ml-[8px] s:mr-[8px] sm:mt-[16px] sm:ml-[28px] sm:mr-[28px] md:mt-[20px] md:ml-[35px] md:mr-[35px] lg:mt-[16px] lg:ml-[28px] lg:mr-[28px] xl:mt-[20px] xl:ml-[35px] xl:mr-[35px]">

                <div className="flex flex-row xxs:mt-[5px] s:mt-[6px] sm:mt-[8px] md:mt-[10px] lg:mt-[8px] xl:mt-[10px]">
                  <div className="xxs:w-[40px] s:w-[40px] sm:w-[45px] md:w-[53px] lg:w-[45px] xl:w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[10px] sm:text-[11px] md:text-[13px] lg:text-[11px] xl:text-[13px] font-bold"
                      htmlFor="totalnumber"
                    >
                      인원
                    </label>
                  </div>
                  <div className="ml-[20px] h-[40px] xs:ml-[25px] xs:h-[45px] s:ml-[35px] s:h-[43px] sm:ml-[39px] sm:h-[40px] md:ml-[47px] md:h-[50px] lg:ml-[39px] lg:h-[40px] xl:ml-[47px] xl:h-[50px]">
                    <input
                      {...register("totalnumber", {
                        required: "사용 인원은 필수 입력사항입니다.",
                      })}
                      className="shadow appearance-none border rounded w-[180px] h-[25px] xs:w-[190px] xs:h-[27px] s:w-[250px] s:h-[27px] sm:w-[300px] sm:h-[27px] md:w-[400px] md:h-[34px] lg:w-[300px] xl:w-[400px] lg:h-[27px] xl:h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]"
                      id="totalnumber"
                      type="text"
                      placeholder="총 사용 인원 수 입력"
                    />
                    <div className="text-red-600 px-2">
                      {errors.totalnumber && (
                        <small role="alert" className= "text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]">{errors.totalnumber.message}</small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row xxs:mt-[5px] s:mt-[6px] sm:mt-[8px] md:mt-[10px] lg:mt-[8px] xl:mt-[10px]">
                  <div className="xxs:w-[40px] s:w-[40px] sm:w-[45px] md:w-[53px] lg:w-[45px] xl:w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[10px] sm:text-[11px] md:text-[13px] lg:text-[11px] xl:text-[13px] font-bold"
                      htmlFor="purpose"
                    >
                      사용목적
                    </label>
                  </div>
                  <div className="ml-[20px] h-[40px] xs:ml-[25px] xs:h-[45px] s:ml-[35px] s:h-[43px] sm:ml-[39px] sm:h-[40px] md:ml-[47px] md:h-[50px] lg:ml-[39px] lg:h-[40px] xl:ml-[47px] xl:h-[50px]">
                    <input
                      {...register("purpose", {
                        required: "사용 목적은 필수 입력사항입니다.",
                      })}
                      className="shadow appearance-none border rounded w-[180px] h-[25px] xs:w-[190px] xs:h-[27px] s:w-[250px] s:h-[27px] sm:w-[300px] sm:h-[27px] md:w-[400px] md:h-[34px] lg:w-[300px] xl:w-[400px] lg:h-[27px] xl:h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]"
                      id="purpose"
                      type="text"
                      placeholder="사용 목적 입력 "
                    />
                    <div className="text-red-600 px-2">
                      {errors.purpose && (
                        <small role="alert" className= "text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]">{errors.purpose.message}</small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row xxs:mt-[5px] s:mt-[6px] sm:mt-[8px] md:mt-[10px] lg:mt-[8px] xl:mt-[10px]">
                  <div className="xxs:w-[40px] s:w-[40px] sm:w-[45px] md:w-[53px] lg:w-[45px] xl:w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[10px] sm:text-[11px] md:text-[13px] lg:text-[11px] xl:text-[13px] font-bold"
                      htmlFor="content"
                    >
                      행사내용
                    </label>
                  </div>
                  <div className="ml-[20px] h-[40px] xs:ml-[25px] xs:h-[45px] s:ml-[35px] s:h-[43px] sm:ml-[39px] sm:h-[40px] md:ml-[47px] md:h-[50px] lg:ml-[39px] lg:h-[40px] xl:ml-[47px] xl:h-[50px]">
                    <input
                      {...register("content", {
                        required: "행사 내용은 필수 입력사항입니다.",
                      })}
                      className="shadow appearance-none border rounded w-[180px] h-[25px] xs:w-[190px] xs:h-[27px] s:w-[250px] s:h-[27px] sm:w-[300px] sm:h-[27px] md:w-[400px] md:h-[34px] lg:w-[300px] xl:w-[400px] lg:h-[27px] xl:h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]"
                      id="content"
                      type="text"
                      placeholder="행사 내용 입력"
                    />
                    <div className="text-red-600 px-2">
                      {errors.content && (
                        <small role="alert" className= "text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]">{errors.content.message}</small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row xxs:mt-[5px] s:mt-[6px] sm:mt-[8px] md:mt-[10px] lg:mt-[8px] xl:mt-[10px]">
                  <div className="xxs:w-[40px] s:w-[40px] sm:w-[45px] md:w-[53px] lg:w-[45px] xl:w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[10px] sm:text-[11px] md:text-[13px] lg:text-[11px] xl:text-[13px] font-bold"
                      htmlFor="etc"
                    >
                      행사파일
                    </label>
                  </div>
                  <div className="ml-[20px] h-[40px] xs:ml-[25px] xs:h-[45px] s:ml-[35px] s:h-[43px] sm:ml-[39px] sm:h-[40px] md:ml-[47px] md:h-[50px] lg:ml-[39px] lg:h-[40px] xl:ml-[47px] xl:h-[50px]">
                    <input
                      {...register("etc")}
                      className="shadow appearance-none w-[180px] h-[25px] xs:w-[190px] xs:h-[27px] s:w-[250px] s:h-[27px] sm:w-[300px] sm:h-[27px] md:w-[400px] md:h-[34px] lg:w-[300px] xl:w-[400px] lg:h-[27px] xl:h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[10px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px]"
                      id="fileUpload"
                      type="file"
                      multiple = {true}
                      placeholder="행사파일 제출(pdf)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden">
          <button
              type="submit"
              className="w-[250px] xs:w-[280px] s:w-[342px] sm:w-[450px] md:w-[570px] h-[30px] s:h-[35px] sm:h-[40px] md:h-[46px] mt-[13px] s:mt-[16px] sm:mt-[20px] bg-blue-600 rounded-lg text-white text-[12px] s:text-[13px] sm:text-[15px] lg:text-[16px] xl:text-[20px]"
            >
              예약 하기
            </button>
            <Link
              href="/reservation/bigground"
            >
              <p className="w-[250px] xs:w-[280px]  s:w-[342px] sm:w-[450px] md:w-[570px] h-[30px] s:h-[35px] sm:h-[40px] md:h-[46px] mt-[13px] s:mt-[16px] sm:mt-[20px] bg-slate-600 rounded-lg text-white text-[12px] s:text-[13px] sm:text-[15px] lg:text-[16px] xl:text-[20px] flex items-center justify-center text-center">취소 하기</p>
            </Link>
        </div>
        </div>
        <div className="grid grid-row hidden lg:block">
          <PickFacility
            facilityname="대운동장"
            picture="/groud.jpeg"
            dates={date}
          />
          <button
            type="submit"
            className="lg:w-[280px] xl:w-[350px] lg:h-[46px] xl:h-[60px] lg:mt-[20px] xl:mt-[24px] ml-[20px] bg-blue-600 rounded-lg text-white lg:text-[16px] xl:text-[20px]"
          >
            예약 하기
          </button>
          <Link
            href="/reservation/bigground"
          >
            <p className="lg:w-[280px] xl:w-[350px] lg:h-[46px] xl:h-[60px] lg:mt-[20px] xl:mt-[24px] ml-[20px] bg-slate-600 rounded-lg text-white lg:text-[16px] xl:text-[20px] flex items-center justify-center text-center">취소 하기</p>
          </Link>
        </div>
        
      </form>
    </div>
    </div>
  )
}
export default Reservationtime
