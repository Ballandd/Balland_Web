export interface infoRankProps {
  group: string
  teamOne: string
  teamTwo: string
  teamThree: string
}

const GroupRank = (props: infoRankProps) => {
  return (
    <div className="flex flex-col w-[120px] h-[160px] xs:w-[140px] xs:h-[160px] s:w-[160px] s:h-[170px] sm:w-[180px] sm:h-[170px] md:w-[200px] md:h-[180px] lg:w-[224px] lg:h-[192px] bg-white">
      <div className="basis-[25%] border-b-[1px] border-[#DDDDDD] py-1 sm:py-2">
        <h1 className="font-bold text-lg text-center">{props.group}조</h1>
      </div>
      <div className="basis-[75%] flex flex-col py-2 pl-3 s:py-4 s:pl-5">
        <div className="basis-[33%]">
          <div className="w-9 inline-block">
            <span className="font-bold text-[12px] xs:text-sm s:text-base md:text-lg text-[#57667E]">1</span>
            <span className="font-semibold text-[8px] sm:text-sm text-[#57667E]">st</span>
          </div>
          <span className="font-bold text-[10px] xs:text-xs s:text-[14px] md:text-lg">{props.teamOne}</span>
        </div>
        <div className="basis-[33%]">
          <div className="w-9 inline-block">
            <span className="font-bold text-[12px] xs:text-sm s:text-base md:text-lg text-[#57667E]">2</span>
            <span className="font-semibold text-[8px] sm:text-sm text-[#57667E]">nd</span>
          </div>
          <span className="font-bold text-[10px] xs:text-xs s:text-[14px] md:text-lg">{props.teamTwo}</span>
        </div>
        <div className="basis-[33%]">
          <div className="w-9 inline-block">
            <span className="font-bold text-[12px] xs:text-sm s:text-base md:text-lg text-[#57667E]">3</span>
            <span className="font-semibold text-[8px] sm:text-sm text-[#57667E]">rd</span>
          </div>
          <span className="font-bold text-[10px] xs:text-xs s:text-[14px] md:text-lg">{props.teamThree}</span>
        </div>
      </div>    
    </div>
  )
}

export default GroupRank