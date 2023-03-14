import React, {useEffect, useState} from "react";
import {signIn,useSession, getProviders, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const SignIn = () => {
  const {data:session} = useSession()
  const [errormessage, setErrormessage] = useState('');
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
        setErrormessage(res?.error!)
      });
  }

  useEffect(() => {
    if (errormessage == "잘못된 입력값으로 인한 오류가 발생했습니다.") {
      alert("잘못된 입력값으로 인한 오류가 발생했습니다.");
      setErrormessage('')
    }
    else if (errormessage == "존재하지 않는 아이디입니다") {
      alert("존재하지 않는 아이디입니다");
      router.push("/auth/signin")
      setErrormessage('')
    }
    else if (errormessage == "비밀번호가 불일치합니다.") {
      alert("비밀번호가 불일치합니다.");
      router.push("/auth/signin")
      setErrormessage('')
    }
  }, [errormessage]);

  useEffect(() => {
    if (session){
      alert("로그인 되었습니다. 환영합니다!");
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