import Head from "next/head"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Information(props) {
  const { data: session, status } = useSession()
  const firstinformation = props.data.data
  const information = [...firstinformation].sort((a, b) => new Date(b.Date) - new Date(a.Date));

  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;
  const totalPages = Math.ceil(information.length / noticesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = information.slice(indexOfFirstNotice, indexOfLastNotice);

    return (
    <div>
        <Head>
        <title>공지 사항</title>
        <link rel="icon" href="/AU.png" />
      </Head>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className=" py-3">
                            번호
                        </th>
                        <th scope="col" className="px-6 py-3">
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
                {currentNotices.map((notice,index) => (
                    <tr key={notice._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            {information.length - indexOfFirstNotice - index}
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <a href={`/information/${notice._id}`}>
                            {notice.title}
                            </a>
                        </th>
                        <td className="px-6 py-4">
                            {notice.writer}
                        </td>
                        <td className="px-6 py-4">
                            {notice.Date.slice(0,10)}
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
            <div className="flex items-center justify-center mt-2 mb-2">
            <button
                className="px-2 py-1 mx-2 rounded bg-gray-300 text-gray-700"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                key={page}
                className={`px-2 py-1 mx-2 rounded ${
                    page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => handlePageChange(page)}
                >
                {page}
                </button>
            ))}
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
    )
}

export async function getStaticProps(context) {
    const res = await fetch("http://localhost:3000/api/information")
    const data = await res.json()
    return {
      props: {
        data,
      },
    }
  }
  