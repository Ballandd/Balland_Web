export interface infoRankProps {
  group: string
  teamOne: string
  teamTwo: string
  teamThree: string
}

const GroupRank = (props: infoRankProps) => {
  return (
    <div className="w-[220px] h-[190px] bg-white">
      <div className="border-b-[1px] border-[#DDDDDD] py-2">
        <h1 className="font-bold text-lg text-center">{props.group}</h1>
      </div>
      <div className="py-4 pl-5">
        <div className="mb-[18px]">
          <div className="w-9 inline-block">
            <span className="font-bold text-lg text-[#57667E]">1</span>
            <span className="font-semibold text-sm text-[#57667E]">st</span>
          </div>
          <span className="font-bold text-lg">{props.teamOne}</span>
        </div>
        <div className="mb-[18px]">
          <div className="w-9 inline-block">
            <span className="font-bold text-lg text-[#57667E]">2</span>
            <span className="font-semibold text-sm text-[#57667E]">nd</span>
          </div>
          <span className="font-bold text-lg">{props.teamTwo}</span>
        </div>
        <div>
          <div className="w-9 inline-block">
            <span className="font-bold text-lg text-[#57667E]">3</span>
            <span className="font-semibold text-sm text-[#57667E]">rd</span>
          </div>
          <span className="font-bold text-lg">{props.teamThree}</span>
        </div>
      </div>
    </div>
  )
}

export default GroupRank
