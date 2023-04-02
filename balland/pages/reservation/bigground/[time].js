import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import PickFacility from "../../../components/PickFacility"
const Reservationtime = () => {
  const [reservationTime, setReservationTime] = useState("")
  const router = useRouter()
  const { time } = router.query
  const { register } = useForm()
  useEffect(() => {
    const maxtime = Number(time) + 2
    setReservationTime(`${time}:00 ~ ${maxtime}:00`)
  }, [])
  return (
    <div className="grid justify-items-center">
      <div className="flex">
        <div className="grid grid-row">
          <form className="w-[570px] h-[283px] bg-white">
            <div className="divide-y-2 divide-solid divide-black">
              <h2 className=" mt-5 ml-[35px] mr-[35px] left-9 top-5 font-mono text-left text-[20px] font-bold">
                예약하기
              </h2>
              <div className="mt-5 ml-[35px] mr-[35px]">
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px] self-center">
                    <label
                      className="block text-gray-700 text-[13px] font-bold"
                      for="username"
                    >
                      신청자명
                    </label>
                  </div>
                  <div className="ml-[47px]">
                    <input
                      {...register("username", { required: true })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="username"
                      type="text"
                      placeholder="신청자명 입력"
                    />
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px] self-center">
                    <label
                      className="block text-gray-700 text-[13px] font-bold"
                      for="phonenumber"
                    >
                      연락처
                    </label>
                  </div>
                  <div className="ml-[47px]">
                    <input
                      {...register("phonenumber", { required: true })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="phonenumber"
                      type="text"
                      placeholder="연락처 입력 (010-1234-5678)"
                    />
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px] self-center">
                    <label
                      className="block text-gray-700 text-[13px] font-bold"
                      for="email"
                    >
                      이메일
                    </label>
                  </div>
                  <div className="ml-[47px]">
                    <input
                      {...register("email", { required: true })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="email"
                      type="text"
                      placeholder="이메일 입력"
                    />
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px] self-center">
                    <label
                      className="block text-gray-700 text-[13px] font-bold"
                      for="studentid"
                    >
                      학번
                    </label>
                  </div>
                  <div className="ml-[47px]">
                    <input
                      {...register("studentid", { required: true })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="studentid"
                      type="text"
                      placeholder="학번 입력"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form className="w-[570px] h-[333px] bg-white mt-[20px]">
            <div className="divide-y-2 divide-solid divide-black">
              <h2 className=" mt-5 ml-[35px] mr-[35px] left-9 top-5 font-mono text-left text-[20px] font-bold">
                사용목적
              </h2>
              <div className="mt-5 ml-[35px] mr-[35px]">
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px] self-center">
                    <label
                      className="block text-gray-700 text-[13px] font-bold"
                      for="totalnumber"
                    >
                      인원
                    </label>
                  </div>
                  <div className="ml-[47px]">
                    <input
                      {...register("totalnumber", { required: true })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="totalnumber"
                      type="text"
                      placeholder="총 사용 인원 수 입력"
                    />
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px] self-center">
                    <label
                      className="block text-gray-700 text-[13px] font-bold"
                      for="purpose"
                    >
                      사용목적
                    </label>
                  </div>
                  <div className="ml-[47px]">
                    <input
                      {...register("purpose", { required: true })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="purpose"
                      type="text"
                      placeholder="사용 목적 입력 "
                    />
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px] self-center">
                    <label
                      className="block text-gray-700 text-[13px] font-bold"
                      for="content"
                    >
                      행사내용
                    </label>
                  </div>
                  <div className="ml-[47px]">
                    <input
                      {...register("content", { required: true })}
                      className="shadow appearance-none border rounded w-[400px] h-[34px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="content"
                      type="text"
                      placeholder="행사 내용 입력"
                    />
                  </div>
                </div>
                <div className="flex flex-row mt-[10px]">
                  <div className="w-[53px]">
                    <label
                      className="block text-gray-700 text-[13px] font-bold"
                      for="etc"
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
          </form>
        </div>
        <div className="grid grid-row">
          <PickFacility
            facilityname="대운동장"
            picture="/groud.jpeg"
            date="2023-04-13"
            time={reservationTime}
          />
          <button className="w-[350px] h-[60px] ml-[20px] bg-blue-600 rounded-lg text-white text-[20px]">
            예약 하기
          </button>
          <button className="w-[350px] h-[60px] ml-[20px] bg-slate-600 rounded-lg text-white text-[20px]">
            취소 하기
          </button>
        </div>
      </div>
    </div>
  )
}
export default Reservationtime
