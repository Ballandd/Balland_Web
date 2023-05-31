import Head from "next/head";
import axios from "axios";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function InformationDetail() {
  const router = useRouter();
  const [date, setDate] = useState<string | undefined>();
  const [content, setContent] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [writer, setWriter] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>();

  console.log(router.query.id);
  const noticeId: string | string[] | undefined = router.query.id?.toString();

  const competitiondetail = async () => {
    await axios
      .post("/api/information/detail", {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: {
          id: noticeId,
        },
      })
      .then((response) => {
        console.log(response);
        setDate((response.data.data.Date).slice(0, 10));
        setContent(response.data.data.content);
        setTitle(response.data.data.title);
        setWriter(response.data.data.writer);
        // db에 data.data.image 만들고
        // 여기에 response.data.data.image 넣으면 됨
        // 현재는 볼랜드 로고 넣어 놓음
        setImage('../../BallandLogo.png');
      });
  };

  useEffect(() => {
    if (noticeId != null) {
      competitiondetail();
    }
  }, [noticeId]);

  return (
    <div>
      <Head>
        <title>공지 사항</title>
        <link rel="icon" href="/AU.png" />
      </Head>
      <div className="h-screen">
        <div className="flex flex-col h-max items-center bg-white">
          <div className="border-slate-300 border-t-2 border-b bg-slate-200 w-full py-2 pl-4 sm:pl-6 font-semibold">
            <h1>Notice title: {title}</h1>
          </div>
          <div className="inline-flex mt-4 w-full pl-4 sm:pl-6 text-sm">
            <p className="mr-2">Notice writer: {writer}</p>
            <div className="border-slate-300 border-l-2 mr-2"></div>
            <p className="">Notice Date: {date}</p>
          </div>
          <div className="mt-8">Notice content: {content}</div>
          <img
            className="w-8/12 lg:w-7/12 xl:w-5/12 object-cover mt-5 mb-10"
            src={image}
          />
        </div>
      </div>
    </div>
  );
}