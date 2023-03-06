import React, {useEffect, useState} from "react";
import {signIn,useSession, getProviders, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const SignIn = () => {
  const {data:session} = useSession()
  const router = useRouter()
  const login = async (e: any) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const response = await signIn("email-password-credential", {  //id 지정 필요
          email,
          password,
          redirect: false
      }).then(res => {
        console.log(res)
      })
      ;
  }
  useEffect(() => {
    if (session){
      router.push("/")
    }
  }, [session])

  return (
      <form onSubmit={login}>
          <label>
              이메일 :
              <input type="email" name="email" placeholder="test@test.com" />
          </label>
          <label>
              비밀번호 :
              <input type="password" name="password" />
          </label>
          <button type="submit">로그인</button>
      </form>
  )
}

export default SignIn;