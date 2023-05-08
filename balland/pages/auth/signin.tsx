import React, { useEffect, useState } from "react"
import { signIn, useSession, getProviders, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import WaitingService from "../../components/WaitingService"
import Head from "next/head"
const SignIn = () =>  {
  const { data: session } = useSession()
  const [errormessage, setErrormessage] = useState("")
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const login = async (e: any) => {
    const email = e.email
    const password = e.password
    const response = await signIn("email-password-credential", {
      //id 지정 필요
      email,
      password,
      redirect: false,
    }).then((res) => {
      setErrormessage(res?.error!)
    })
  }

  useEffect(() => {
    if (errormessage == "존재하지 않는 아이디입니다") {
      alert("존재하지 않는 아이디입니다")
      router.push("/auth/signin")
      setErrormessage("")
    } else if (errormessage == "비밀번호가 불일치합니다.") {
      alert("비밀번호가 불일치합니다.")
      router.push("/auth/signin")
      setErrormessage("")
    }
  }, [errormessage])

  useEffect(() => {
    if (session) {
      alert("로그인 되었습니다. 환영합니다!")
      router.push("/")
    }
  }, [session])

  return (
    <div className = "h-screen">
      <Head>
       <title>Balland</title>
        <link rel="icon" href="/AU.png" />
      </Head>
    <form onSubmit={handleSubmit(login)}>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <a className="flex items-center text-4xl font-semibold">
            <img className="w-8 h-8 mr-2 src="></img>
            Balland
          </a>
        </div>
        <div className="w-[800px] bg-white rounded-lg shadow dark:border">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight md:text-2xl text-black">
              로그인
            </h1>
            <div className="space-y-4">
              <label 
                htmlFor="email" 
                className="block mb-1 text-s font-medium text-black">
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
                    <small role="alert">{errors.email.message?.toString()}</small>
                  )}
              </label>
            </div>
            <div className="space-y-4">
              <label 
                htmlFor="password" 
                className="block mb-1 text-s font-medium text-black">
                비밀번호
              </label>
              <input
                {...register("password", {
                  required: "비밀번호는 필수 입력사항입니다.",
                })}
                type="password" 
                name="password" 
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-50 dark:placeholder-gray-400 dark:text-black" 
              />
              <label className="text-red-600 font-semibold">
                {errors.password && (
                  <small role="alert">{errors.password.message?.toString()}</small>
                )}
              </label>
            </div>
            <button   
              type="submit" 
              className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-s px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              로그인
            </button>
          </div>
        </div>
      </div>
    </form>
    </div>
  )
}

export default SignIn
