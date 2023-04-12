import Head from "next/head"
import axios from "axios"
import CompetitionInformation from "../../components/CompetitionInformation.tsx"
import Link from "next/link"

export default function Competition(props) {
  const producs = props.data.data
  return (
    <div>
      <Head>
        <title>대회 정보</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="grid gap-4 grid-flow-row grid-cols-2">
          {producs.map((compete,index) => ( 
            <div
              key = {index}
              className={`${
                index % 2 == 1
                  ? "grid justify-items-start"
                  : "grid justify-items-end"
              }`}
            >
              <Link href={`/competition/${compete._id}`}>
                <CompetitionInformation
                  picture={compete.picture}
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
              </Link>
            </div>
          ))}
        </div>
      </div>
  )
}
export async function getStaticProps(context) {
  const res = await fetch("http://localhost:5001/competition/getall")
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}
