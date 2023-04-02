import React from "react"
import { useRouter } from "next/router"

const CompetitionDetail = () => {
  const router = useRouter()
  const { id } = router.query

  return <div>대회 번호 : {id}</div>
}
export default CompetitionDetail
