import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import axios from "axios"
import PickFacility from "../../../components/PickFacility"
import useModal from "../../../components/Modal/useModal"
import Modal from "../../../components/Modal"
import { useSession } from "next-auth/react"
const Reservationtime = () => {
  const {data : session, status } = useSession()
  const [reservationTime, setReservationTime] = useState("")
  const router = useRouter()
  const [dialog, setDialog] = useState(null)
  const [reservestate, setReservestate] = useState(false)
  const [reservedate, setReservedate] = useState("")
  const { time, date } = router.query || []
  const [viewyear, setviewYear] = useState("")
  const [viewmonth, setviewMonth] = useState("")
  const [viewdate, setviewDate] = useState("")
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm()
  const reservationInfoRegister = async (data) => {
    const clone = new Date(date)
    clone.setDate(clone.getDate() + 1)
    await axios
      .post("http://localhost:5001/reservation/createReservation", {
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
          etc: data.etc,
          time: time,
          reservationDate: clone.toISOString(),
          userId: session.user.email,
        },
      })
      .then((response) => {
        alert("예약완료")
        router.push("/")
      })
  }
  const { openModal } = useModal(dialog)
  const openModalfunction = async (data) => {
    openModal()
    setReservedate(data)
  }
  const modalState = () => {
    setReservestate(true)
  }
  useEffect(() => {
    const maxtime = Number(time) + 2
    setReservationTime(`${time}:00 ~ ${maxtime}:00`)
    const viewdate = new Date(date)
    setviewYear(viewdate.getFullYear())
    setviewMonth(viewdate.getMonth()+1)
    setviewDate(viewdate.getDate())
  }, [])
  useEffect(() => {
    setDialog(document.querySelector("dialog"))
  }, [])
  useEffect(() => {
    if (reservestate == true) {
      reservationInfoRegister(reservedate)
      setReservestate(false)
    }
  }, [reservestate])
  return (
    <div className="grid justify-items-center">
      <Modal
        title="예약 정보가 맞나요?"
        date={`${viewyear}년 ${viewmonth}월 ${viewdate}일`}
        time={reservationTime}
        selected={() => modalState()}
      />
      <form onSubmit={handleSubmit(openModalfunction)} className="flex">
        <div className="grid grid-row">
          <div className="w-[570px] h-[330px] bg-white">
            <div className="divide-y-2 divide-solid divide-black">
              <h2 className=" mt-5 ml-[35px] mr-[35px] left-9 top-5 font-mono text-left text-[20px] font-bold">
                예약하기
              </h2>
              <div className="mt-5 ml-[35px] mr-[35px]">
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[13px] font-bold"
                      htmlFor="username"
                    >
                      신청자명
                    </label>
                  </div>
                  <div className="ml-[47px] h-[50px]">
                    <input
                      {...register("username", {
                        required: "신청자명은 필수 입력사항입니다.",
                      })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="username"
                      type="text"
                      placeholder="신청자명 입력"
                    />
                    <div className="text-red-600 px-2">
                      {errors.username && (
                        <small role="alert">{errors.username.message}</small>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[13px] font-bold"
                      htmlFor="phonenumber"
                    >
                      연락처
                    </label>
                  </div>
                  <div className="ml-[47px] h-[50px]">
                    <input
                      {...register("phonenumber", {
                        required: "전화번호는 필수 입력사항입니다.",
                        pattern: {
                          value: /\d{3}-\d{4}-\d{4}/,
                          message: "전화번호 형식에 맞지 않습니다.",
                        },
                      })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="phonenumber"
                      type="text"
                      placeholder="연락처 입력 (010-1234-5678)"
                    />
                    <div className="text-red-600 px-2">
                      {errors.phonenumber && (
                        <small role="alert">{errors.phonenumber.message}</small>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[13px] font-bold"
                      htmlFor="email"
                    >
                      이메일
                    </label>
                  </div>
                  <div className="ml-[47px] h-[50px]">
                    <input
                      {...register("email", {
                        required: "이메일은 필수 입력사항입니다.",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "이메일 형식에 맞지 않습니다.",
                        },
                      })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="email"
                      type="text"
                      placeholder="이메일 입력"
                    />
                    <div className="text-red-600 px-2">
                      {errors.email && (
                        <small role="alert">{errors.email.message}</small>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[13px] font-bold"
                      htmlFor="studentid"
                    >
                      학번
                    </label>
                  </div>
                  <div className="ml-[47px] h-[50px]">
                    <input
                      {...register("studentid", {
                        required: "학번은 필수 입력사항입니다.",
                        pattern: {
                          value: /\d{9}/,
                          message: "학번 형식에 맞지 않습니다.",
                        },
                      })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="studentid"
                      type="text"
                      placeholder="학번 입력"
                    />
                    <div className="text-red-600 px-2">
                      {errors.studentid && (
                        <small role="alert">{errors.studentid.message}</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[570px] h-[373px] bg-white mt-[20px]">
            <div className="divide-y-2 divide-solid divide-black">
              <h2 className=" mt-5 ml-[35px] mr-[35px] left-9 top-5 font-mono text-left text-[20px] font-bold">
                사용목적
              </h2>
              <div className="mt-5 ml-[35px] mr-[35px]">
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[13px] font-bold"
                      htmlFor="totalnumber"
                    >
                      인원
                    </label>
                  </div>
                  <div className="ml-[47px] h-[50px]">
                    <input
                      {...register("totalnumber", {
                        required: "사용 인원은 필수 입력사항입니다.",
                      })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="totalnumber"
                      type="text"
                      placeholder="총 사용 인원 수 입력"
                    />
                    <div className="text-red-600 px-2">
                      {errors.totalnumber && (
                        <small role="alert">{errors.totalnumber.message}</small>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[13px] font-bold"
                      htmlFor="purpose"
                    >
                      사용목적
                    </label>
                  </div>
                  <div className="ml-[47px] h-[50px]">
                    <input
                      {...register("purpose", {
                        required: "사용 목적은 필수 입력사항입니다.",
                      })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="purpose"
                      type="text"
                      placeholder="사용 목적 입력 "
                    />
                    <div className="text-red-600 px-2">
                      {errors.purpose && (
                        <small role="alert">{errors.purpose.message}</small>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[13px] font-bold"
                      htmlFor="content"
                    >
                      행사내용
                    </label>
                  </div>
                  <div className="ml-[47px] h-[50px]">
                    <input
                      {...register("content", {
                        required: "행사 내용은 필수 입력사항입니다.",
                      })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="content"
                      type="text"
                      placeholder="행사 내용 입력"
                    />
                    <div className="text-red-600 px-2">
                      {errors.content && (
                        <small role="alert">{errors.content.message}</small>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px]">
                    <label
                      className="block mt-[8px] text-gray-700 text-[13px] font-bold"
                      htmlFor="etc"
                    >
                      기타사항
                    </label>
                  </div>
                  <div className="ml-[47px]">
                    <input
                      {...register("etc")}
                      className="shadow appearance-none border rounded w-[400px] h-[84px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="etc"
                      type="text"
                      placeholder="기타사항 입력"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-row">
          <PickFacility
            facilityname="대운동장"
            picture="/groud.jpeg"
            date={`${viewyear}년 ${viewmonth}월 ${viewdate}일`}
            time={reservationTime}
          />
          <button
            type="submit"
            className="w-[350px] h-[60px] mt-[24px] ml-[20px] bg-blue-600 rounded-lg text-white text-[20px]"
          >
            예약 하기
          </button>
          <button className="w-[350px] h-[60px] mt-[24px] ml-[20px] bg-slate-600 rounded-lg text-white text-[20px]">
            취소 하기
          </button>
        </div>
      </form>
    </div>
  )
}
export default Reservationtime
