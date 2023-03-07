import { MongoClient } from "mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from 'bcrypt'
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

if (!process.env.NEXT_PUBLIC_MONGODB_URI) throw new Error('env error');
const uri: string = process.env.NEXT_PUBLIC_MONGODB_URI;
export default NextAuth({
    secret : process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            id:"email-password-credential", //signin 페이지와 연동 위해 id 설정
            name: "Email",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "balland@ajou.ac.kr" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                if (!credentials){
                    throw new Error("잘못된 입력값으로 인한 오류가 발생했습니다.")
                }
                const email = credentials.email
                const password = credentials.password
                const client = await MongoClient.connect(uri)
                const user = await client.db('balland').collection('balland').findOne({
                    email: email,
                })
                if (!user) {
                    throw new Error("존재하지 않는 아이디입니다")
                }
                console.log(password, user.password)
                const result = await bcrypt.compare(password, user.password)
                if(!result){
                    throw new Error("비밀번호가 불일치합니다.")
                }
                return user
                
            }
        })
    ],
    pages:{
        signIn:"/auth/signin"
    },
    
  
})