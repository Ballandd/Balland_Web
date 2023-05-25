import Head from "next/head"
import axios from "axios"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function InformationDetail(props) {
    const router = useRouter();
    const [date, setDate] = useState()
    const [content, setContent] = useState()
    const [title, setTitle] = useState()
    const [writer, setWriter] = useState()

    console.log(router.query.id)
    const noticeId  = router.query.id;
    const competitiondetail = async () =>{
        await axios
          .post("/api/information/detail", {
            method: "POST",
            Headers: { "Content-Type": "application/json" },
            body: {
              id: noticeId,
            },
          })
          .then((response) => {
            console.log(response)
            setDate(response.data.data.Date)
            setContent(response.data.data.content)
            setTitle(response.data.data.writer)
            setWriter(response.data.data.writer)
          })
      }
      useEffect(() => {
        if(noticeId != null){
            competitiondetail()
        }
      },[noticeId])
    return (
    <div>
        <Head>
        <title>공지 사항</title>
        <link rel="icon" href="/AU.png" />
      </Head>
      <div>
      <h1>Notice Details</h1>
      <p>Notice Date: {date}</p>
      <p>Notice content: {content}</p>
      <p>Notice title: {title}</p>
      <p>Notice writer: {writer}</p>
    </div>
    </div>
    )
}
