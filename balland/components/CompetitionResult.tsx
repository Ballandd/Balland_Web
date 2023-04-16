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
    <div className="w-[250px] h-[65px] xxs:w-[300px] xxs:h-[65px] xs:w-[330px] xs:h-[69px] s:w-[420px] s:h-[70px] sm:w-[520px] sm:h-[90px] md:w-[550px] md:h-[93px] lg:w-[665px] lg:h-[113px] xl:w-[832px] xl:h-[141px] 2xl:w-[940px] 2xl:h-[160px]  mt-[10px] flex justify-items-center items-center bg-white">
      <h1 className="text-[12px] xxs:text-[14px] xs:text-[14px] s:text-[17px] sm:text-[19px] md:text-[17px] lg:text-[17px] xl:text-[24px] font-extrabold basis-[30%] justify-center flex">
        {props.teamA}
      </h1>
      <h1 className="text-[13px] xxs:text-[21px] xs:text-[25px] s:text-[29px] sm:text-[35px] md:text-[33px] lg:text-[43px] xl:text-[60px] font-extrabold text-[#FF0000] basis-[10%] justify-center flex">
        {props.scoreA}
      </h1>
      <h1 className="text-[4px] xs:text-[5px] s:text-[7px] sm:text-[10px] md:text-[11px] lg:text-[14px] xl:text-[20px] font-bold text-black basis-[1%] justify-center flex">
        {""}
      </h1>
      <div className="flex flex-col justify-center items-center text-center basis-[20%] ">
        <h2 className="text-[6px] xs:text-[3px] s:text-[6px] sm:text-[8px] md:text-[10px] lg:text-[13px] xl:text-[18px] font-semibold text-[#555555]">
          {props.Round}
        </h2>
        <h2 className="font-bold text-[6px] s:text-[9px] sm:text-[11px] md:text-[13px] lg:text-[17px] xl:text-[24px] text-[#22222]">{props.Time}</h2>
        <h2 className="font-semibold text-[6px] xs:text-[5px] s:text-[6px] sm:text-[8px] md:text-[10px] lg:text-[13px] xl:text-[18px] text-[#1570FF] leading-0 md:leading-5 lg:leading-7">
          {"대운동장"}
        </h2>
        {isStatus ? (
          <div className="w-[73%] h-[15%] s:h-[20%] py-0 s:py-[3px] sm:py-[4px] md:py-[5px] text-[3px] s:text-[5px] sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-[13px] font-semibold text-[#555555] bg-[#F2F5F7] mt-0 md:mt-1 lg:mt-2">
            종료
          </div>
        ) : (
          <div className="w-[73%] h-[15%] s:h-[20%] py-0 s:py-[3px] sm:py-[4px] md:py-[5px] text-[3px] s:text-[5px] sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-[13px] font-semibold text-[#1570FF] bg-[#D8E7FF] mt-0 md:mt-1 lg:mt-2">
            진행예정
          </div>
        )}
      </div>
      <h1 className="text-[4px] xs:text-[5px] s:text-[10px] sm:text-[9px] md:text-[11px] lg:text-[14px] xl:text-[20px] font-bold text-black basis-[1%] justify-center flex">
        {""}
      </h1>
      <h1 className="text-[13px] xxs:text-[21px] xs:text-[25px] s:text-[29px] sm:text-[35px] md:text-[33px] lg:text-[43px] xl:text-[60px] font-extrabold text-[#FF0000] basis-[10%] justify-center flex">
        {props.scoreB}
      </h1>
      <h1 className="text-[12px] xxs:text-[14px] xs:text-[14px] s:text-[17px] sm:text-[19px] md:text-[17px] lg:text-[17px] xl:text-[24px] font-extrabold basis-[30%] justify-center flex">
        {props.teamB}
      </h1>
    </div>
  )
}

export default CompetitionResult
