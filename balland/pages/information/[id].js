import Head from "next/head"
import axios from "axios"
import { useRouter } from 'next/router';

export default function InformationDetail(props) {
    const router = useRouter();
    console.log(router.query.id)
    const noticeId  = router.query.id;
    return (
    <div>
        <Head>
        <title>공지 사항</title>
        <link rel="icon" href="/AU.png" />
      </Head>
      <div>
      <h1>Notice Details</h1>
      <p>Notice ID: {noticeId}</p>
    </div>
    </div>
    )
}
