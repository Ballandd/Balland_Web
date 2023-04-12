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
  return (
    <div className="w-96 h-48 rounded border-2 bg-white">
      <div className="mt-5 ml-5 mr-5 left-9 top-5">
        <div className="flex flex-row">
          <div className="w-40 flex flex-col">
            <img className="h-28" src={props.picture} />
            {
            isStatus === 2 ? (
              <div className="mt-3 border rounded border-sky-600">
                <h2 className="text-center text-sky-700"> 진행중</h2>
              </div>
            ) : ( isStatus === 3?
              <div className="mt-3 border rounded border-red-600">
                <h2 className="text-center text-red-600"> 진행완료</h2>
              </div>
              :
              <div className="mt-3 border rounded border-green-600">
                <h2 className="text-center text-green-600"> 진행예정</h2>
              </div>
            )
            }
          </div>
          <div>
            <div className="divide-y-2 divide-solid divide-black">
              <h2 className=" ml-5 left-9 top-5 font-mono text-left text-[20px] font-bold">
                {props.name}
              </h2>
              <div className="flex flex-col mt-4 ml-5 mr-5 ">
                <div className="flex flex-row mt-3 left-9 top-5 ">
                  <Icon icon="material-symbols:calendar-today" width="15" />
                  <h2 className="ml-2 font-mono text-left text-[12px]">
                    {props.period}
                  </h2>
                </div>
                <div className="flex flex-row mt-3 left-9 top-5 ">
                  <Icon
                    icon="material-symbols:flag-outline-rounded"
                    width="15"
                  />
                  <h2 className="ml-2 font-mono text-left text-[12px]">
                    {props.part}
                  </h2>
                </div>
                <div className="flex flex-row mt-3 left-9 top-5 ">
                  <Icon icon="material-symbols:location-on" width="15" />
                  <h2 className="ml-2 font-mono text-left text-[12px]">
                    {props.prize}
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
