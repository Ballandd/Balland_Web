import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { idState } from "../../components/recoil/state";
import axios from "axios";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

interface Notice {
  _id: string;
  title: string;
  writer: string;
  Date: string;
}

interface InformationProps {
  data: {
    data: Notice[];
  };
}

export default function Information(props: InformationProps) {
  const [id, setidstate] = useRecoilState(idState)
  const router = useRouter();
  const { data: session, status } = useSession();
  const firstinformation = props.data.data;
  const information = [...firstinformation].sort(
    (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const noticesPerPage: number = 10;
  const totalPages: number = Math.ceil(information.length / noticesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastNotice: number = currentPage * noticesPerPage;
  const indexOfFirstNotice: number = indexOfLastNotice - noticesPerPage;
  const currentNotices: Notice[] = information.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );

  return (
    <div className = "h-screen">
      <Head>
        <title>공지 사항</title>
        <link rel="icon" href="/AU.png" />
      </Head>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="relative overflow-x-a w-1/2 sm:w-full text-[10px] sm:text-xs lg:text-base text-center text-gray-500 dark:text-gray-400">
  <thead className="text-xxs sm:text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="sm:py-2 md:py-3">
        번호
      </th>
      <th scope="col" className="px-2 sm:px-6 sm:py-3">
        제목
      </th>
      <th scope="col" className="px-6 py-3">
        작성자
      </th>
      <th scope="col" className="px-6 py-3">
        날짜
      </th>
    </tr>
  </thead>
  <tbody>
    {currentNotices.map((notice, index) => (
      <tr
        key={notice._id}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="w-4 p-4">
          {information.length - indexOfFirstNotice - index}
        </td>
        <th
          scope="row"
          className="px-2 sm:px-6 py-2 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          onClick = {() => {
            setidstate(notice._id);
            router.push({
              pathname: "/information/[id]",
              query: {id: notice._id}
            })
          }}
        >
          <a>{notice.title}</a>
        </th>
        <td className="px-6 py-4">{notice.writer}</td>
        <td className="px-6 py-4">{notice.Date.slice(0, 10)}</td>
      </tr>
    ))}
  </tbody>
</table>
  <div className="flex items-center justify-center mt-2 mb-2 ">
    <button
      className="px-2 py-1 mx-2 rounded bg-gray-300 text-gray-700"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      {"<"}
    </button>
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (page) => (
        <button
          key={page}
          className={`px-2 py-1 mx-2 rounded ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      )
    )}
    <button
      className="px-2 py-1 mx-2 rounded bg-gray-300 text-gray-700"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      {">"}
    </button>
  </div>
</div>
</div>
  );
}

export async function getStaticProps(context: any) {
  const res = await fetch(`${process.env.API_URL}/information/readall`);
  const data: { data: Notice[] } = await res.json();
  return {
    props: {
      data,
    },
  };
}