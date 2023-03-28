import Head from "next/head";
import CompetitionInformation from "../../components/CompetitionInformation.tsx"
import posts from "../competition.json"
import Link from "next/link";
export default function Competition() {
  const producs = posts
  console.log(producs[1].id %2)
  return (
    <div>
      <Head>
        <title>대회 정보</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className = "w-full h-full left-1/2 top-1/2 ">
        <div className = "grid gap-4 grid-flow-row grid-cols-2">
            {producs.map((compete)=>(
              <div className = {`${compete.id % 2 == 0 ?'grid justify-items-start':'grid justify-items-end'}`}>
                <Link href = {`/competition/${compete.id}`}>
              <CompetitionInformation
                picture = {compete.picture}
                name = {compete.name}
                period = {compete.period}
                part = {compete.part}
                prize = {compete.prize}
                />
                </Link>
                </div>
            ))}
      </div>
    </div>
    </div>
  );
}