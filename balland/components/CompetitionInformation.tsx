import { Icon } from "@iconify/react"

export interface CompetitionInformationProps {
  picture: string
  name: string
  period: string
  part: string
  prize: string
  status: number
}

const CompetitionInformation = (props: CompetitionInformationProps) => {
  const isStatus = props.status
  const prize_unit = props.prize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return (
    <div className="sticky xs:w-[300px] s:w-[350px] h-[140px] xxs:h-[140px] xs:h-[150px] s:h-[190px] rounded border-2 bg-white">
      <div className="mt-5 ml-5 mr-5">
        <div className="flex flex-row">
          <div className="w-32 flex flex-col">
            <img className="h-20 w-20 xs:h-20 xs:w-20 s:h-28 s:w-28 m-auto" src={`${process.env.IMAGE_URL}/Logo/${props.picture}.png`} />
            {isStatus === 2 ? (
              <div className="xxs:mt-1 xs:mt-3 border rounded border-sky-600">
                <h2 className="text-center text-sky-700 text-[10px] xxs:text-xs xs:text-base s:text-lg">진행중</h2>
              </div>
            ) : isStatus === 3 ? (
              <div className="xxs:mt-1 xs:mt-3 border rounded border-red-600">
                <h2 className="text-center text-red-600 text-[10px] xxs:text-xs xs:text-base s:text-lg">진행완료</h2>
              </div>
            ) : (
              <div className="xxs:mt-1 xs:mt-3 border rounded border-green-600">
                <h2 className="text-center text-green-600 text-[10px] xxs:text-xs xs:text-base s:text-lg">진행예정</h2>
              </div>
            )}
          </div>
          <div>
            <div className="divide-y-2 divide-solid divide-black">
              <h2 className=" ml-5 left-9 top-5 font-mono text-left text-xs xxs:text-sm xs:text-base s:text-lg font-bold">
                {props.name}
              </h2>
              <div className="h-full flex flex-col mt-1 ml-5 ">
                <div className="flex flex-row mt-1 xxs:mt-2 s:mt-3 left-9 top-5 ">
                  <Icon icon="material-symbols:calendar-today" width="15" />
                  <h2 className="ml-2 font-mono text-left text-[4px] xxs:text-[6px] xs:text-[6px] s:text-xs">
                    {props.period.slice(5,7)+"/"+props.period.slice(8,10)+" ~ "+props.period.slice(18,20)+"/"+props.period.slice(21,23)}
                  </h2>
                </div>
                <div className="flex flex-row mt-1 xxs:mt-2 s:mt-3 left-9 top-5 ">
                  <Icon
                    icon="material-symbols:flag-outline-rounded"
                    width="15"
                  />
                  <h2 className="ml-2 font-mono text-left text-[4px] xxs:text-[8px] xs:text-[10px] s:text-xs">
                    {props.part}
                  </h2>
                </div>
                <div className="flex flex-row mt-1 xxs:mt-2 s:mt-3 left-9 top-5 ">
                  <Icon icon="material-symbols:attach-money" width="15" />
                  <h2 className="ml-2 font-mono text-left text-[4px] xxs:text-[6px] xs:text-[8px] s:text-xs">
                    {prize_unit}원
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CompetitionInformation
