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
  const prize_unit = props.prize
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return (
    <div className="sticky xs:w-[300px] s:w-[350px] h-[140px] xxs:h-[140px] xs:h-[150px] s:h-[190px] rounded border-2 bg-white">
      <div className="mt-5 ml-5 mr-5">
        <div className="flex flex-row">
          <div className="flex flex-col w-32">
            <img
              className="w-20 h-20 m-auto xs:h-20 xs:w-20 s:h-28 s:w-28"
              src={`${process.env.IMAGE_URL}/Logo/${props.picture}.png`}
            />
            {isStatus === 2 ? (
              <div className="border rounded xxs:mt-1 xs:mt-3 border-sky-600">
                <h2 className="text-center text-sky-700 text-[10px] xxs:text-xs xs:text-base s:text-lg">
                  진행중
                </h2>
              </div>
            ) : isStatus === 3 ? (
              <div className="border border-red-600 rounded xxs:mt-1 xs:mt-3">
                <h2 className="text-center text-red-600 text-[10px] xxs:text-xs xs:text-base s:text-lg">
                  진행완료
                </h2>
              </div>
            ) : (
              <div className="border border-green-600 rounded xxs:mt-1 xs:mt-3">
                <h2 className="text-center text-green-600 text-[10px] xxs:text-xs xs:text-base s:text-lg">
                  진행예정
                </h2>
              </div>
            )}
          </div>
          <div>
            <div className="divide-y-2 divide-black divide-solid">
              <h2 className="ml-5 font-mono text-xs font-bold text-left left-9 top-5 xxs:text-sm xs:text-base s:text-lg">
                {props.name}
              </h2>
              <div className="flex flex-col h-full mt-1 ml-5 ">
                <div className="flex flex-row mt-1 xxs:mt-2 s:mt-3 left-9 top-5 ">
                  <Icon icon="material-symbols:calendar-today" width="15" />
                  <h2 className="ml-2 font-mono text-left text-[4px] xxs:text-[6px] xs:text-[6px] s:text-xs">
                    {props.period.slice(5, 7) +
                      "/" +
                      props.period.slice(8, 10) +
                      " ~ " +
                      props.period.slice(18, 20) +
                      "/" +
                      props.period.slice(21, 23)}
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
