export interface infoResultProps {
  Round: string
  Time: string
  facility: string
  status: boolean
  teamA: String
  teamB: String
  scoreA: number
  scoreB: number
}

const CompetitionResult = (props: infoResultProps) => {
  const isStatus = props.status
  return (
    <div className="w-[940px] h-[160px] mt-[10px] flex items-center bg-white">
      <h1 className="text-[24px] font-extrabold basis-[30%] justify-center flex">
        {props.teamA}
      </h1>
      <h1 className="text-6xl font-extrabold text-[#FF0000] basis-[10%] justify-center flex">
        {props.scoreA}
      </h1>
      <div className="flex flex-col justify-center items-center text-center basis-[20%] ">
        <h2 className="text-[18px] font-semibold text-[#555555]">
          {props.Round}
        </h2>
        <h2 className="font-bold text-[24px] text-[#22222]">{props.Time}</h2>
        <h2 className="font-semibold text-[18px] text-[#1570FF] leading-7">
          {props.facility}
        </h2>
        {isStatus ? (
          <div className="w-[120px] h-[30px] py-[5px] text-[13px] font-semibold text-[#555555] bg-[#F2F5F7] mt-2">
            종료
          </div>
        ) : (
          <div className="w-[120px] h-[30px] py-[5px] text-[13px] font-semibold text-[#1570FF] bg-[#D8E7FF] mt-2">
            진행예정
          </div>
        )}
      </div>
      <h1 className="text-6xl font-extrabold text-[#FF0000] basis-[10%] justify-center flex">
        {props.scoreB}
      </h1>
      <h1 className="text-[24px] font-extrabold basis-[30%] justify-center flex">
        {props.teamB}
      </h1>
    </div>
  )
}

export default CompetitionResult
