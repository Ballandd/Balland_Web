import Head from "next/head"
import CompetitionResult from "../../components/CompetitionResult.tsx"
export default function Club() {
  return (
    <div>
      <Head>
        <title>Tailwind Navbar Tutorial</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CompetitionResult
        Round="A조 예선"
        Time="18:00"
        facility="대운동장"
        status={1}
        teamA="한국외국어대학교"
        teamB="경희대학교"
        scoreA={2}
        scoreB={0}
      />
    </div>
  )
}
