import axios from "axios"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import classNames from "classnames"
import WaitingService from "../../components/WaitingService.tsx"
import Head from "next/head"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [errormessage, setErrormessage] = useState("")
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm()
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onClick = async (data) => {
    await axios
      .post("/api/auth/signup", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          email: data.email,
          password: data.password,
          username: data.username,
        },
      })
      .then((response) => {
        setError(response.data.result)
        setErrormessage(response.data.message)
      })
  }
  useEffect(() => {
    if (errormessage == "이미 가입된 계정이에요!") {
      alert("이미 가입된 계정이에요!")
      setErrormessage("")
    } else if (errormessage == "User created") {
      alert("회원가입이 완료 되었습니다. 로그인을 진행 해 주세요")
      router.push("/auth/signin")
      setErrormessage("")
    }
  }, [errormessage])

  return (
    <div className = "h-screen">
      <Head>
       <title>Balland</title>
        <link rel="icon" href="/AU.png" />
      </Head>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <a className="flex items-center text-4xl font-semibold">
            <img 
              className="w-8 h-8 mr-2"
              src="../../AU2.png"
            ></img>
            Balland
          </a>
        </div>
        <form onSubmit={handleSubmit(onClick)}>
          <div className="w-[800px] bg-white rounded-lg shadow dark:border">
            <div className="p-6 space-y-4">
              <h1 className="text-xl font-bold text-center leading-tight tracking-tight md:text-2xl text-black">
                회원가입
              </h1>
              <div className="space-y-4">
                <label 
                  htmlFor="username" 
                  className="block text-s font-medium text-black">
                  이름
                </label>
                <input
                  {...register("username", {
                    required: "이름은 필수 입력사항입니다.",
                  })}
                  type="text" 
                  id="username"
                  placeholder="김아주"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-50 dark:placeholder-gray-400 dark:text-black" 
                />
                <label className="text-red-600 font-semibold">
                  {errors.username && (
                    <small role="alert">{errors.username.message}</small>
                  )}
                </label>
              </div>
              <div className="space-y-4">
                <label 
                  htmlFor="email" 
                  className="block text-s font-medium text-black">
                  이메일
                </label>
                <input
                  {...register("email", {
                    required: "이메일은 필수 입력사항입니다.",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "이메일 형식에 맞지 않습니다.",
                    },
                  })}
                  type="email" 
                  id="email" 
                  placeholder="email@email.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-50 dark:placeholder-gray-400 dark:text-black"  
                />
                <label className="text-red-600 font-semibold">
                  {errors.email && (
                    <small role="alert">{errors.email.message}</small>
                  )}
                </label>
              </div>
              <div className="space-y-4">
                <label 
                  htmlFor="password" 
                  className="block text-s font-medium text-black">
                  비밀번호
                </label>
                <input 
                  {...register("password", {
                    required: "비밀번호는 필수 입력사항입니다.",
                  })}
                  type="password" 
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-50 dark:placeholder-gray-400 dark:text-black" 
                />
                <label className="text-red-600 font-semibold">
                  {errors.password && (
                    <small role="alert">{errors.password.message}</small>
                  )}
                </label>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span className="ml-2 text-sm font-semibold text-blueGray-600">
                    I agree with the{" "}
                    <a href="#pablo"
                      className="text-lightBlue-500"
                      onClick={(e) => e.preventDefault()}>
                        Privacy Policy
                    </a>
                  </span>
                </label>
              </div>
              <button   
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-s px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
      </div>
    
  )
}
