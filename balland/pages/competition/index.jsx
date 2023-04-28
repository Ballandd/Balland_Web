import Head from "next/head"
import axios from "axios"
import CompetitionInformation from "../../components/CompetitionInformation.tsx"
import Link from "next/link"
import { idState } from "../recoil/state.js"
import { useRecoilState } from 'recoil';
import { useRouter } from "next/router"
export default function Competition(props) {
  const router = useRouter()
  const producs = props.data.data
  const [id, setidState] = useRecoilState(idState);
  return (
    <div className = "h-screen">
      <Head>
        <title>대회 정보</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className = "h-inherit bg-slate-100">
      <div className = "w-[100%] grid justify-items-center ">
        <div className=" grid grid-cols-1  lg:grid-cols-2 gap-4">
          {producs.map((compete,index) => ( 
            <div
              key = {index}
              className={`grid justify-items-center md:${
                index % 2 == 1
                  ? "grid justify-items-start"
                  : "grid justify-items-end"
              }`}
            >
              <button
                onClick = {() =>{
                  setidState(compete._id)
                  router.push({
                    pathname : "/competition/[id]",
                    query : {id : compete._id,viewid : compete._id}
                  })
                }} 
                
              >
                <CompetitionInformation
                  picture={compete._id}
                  name={compete.title}
                  period={
                    `${String(compete.startdate).substring(0, 10)}` +
                    " ~ " +
                    `${String(compete.enddate).substring(0, 10)}`
                  }
                  part={compete.host}
                  prize={compete.prize}
                  status={compete.condition}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
  )
}
export async function getStaticProps(context) {
  const res = await fetch(`${process.env.API_URL}/competition/getall`)
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}
