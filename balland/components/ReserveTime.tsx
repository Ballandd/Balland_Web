import { Icon } from "@iconify/react"

export interface infoCardProps {
  time: string
  status: boolean
  isSelected: boolean
  handleClick: (value: number) => void
  elementIndex: number
}

const ReserveTime = (props: infoCardProps) => {
  const isStatus = props.status
  return (
    <button
      onClick={() => props.handleClick(props.elementIndex)}
      disabled={isStatus == true ? false : true}
    >
      <div
        className={`xxs:mt-2 xs:mt-4 xxs:mr-1 xxs:ml-1 md:mt-2 lg:mt-4 md:w-[130px] lg:w-[100px] xl:w-[135px] md:h-[42px] lg:h-[56px] xl:h-[70px] rounded-lg border ${
          props.isSelected ? "border-blue-600" : null
        }`}
      >
        <div className="flex flex-col">
          <div className="flex flex-row mt-1 lg:mt-2 justify-center text-center">
            <Icon icon="ic:baseline-access-time" className="sm:w-[16px] md:w-[13px] lg:w-[16px] xl:w-[25px] sm:h-[16px] md:h-[13px] lg:h-[16px] xl:h-[25px] "/>
            <h2 className="lg:ml-1 text-[10px] s:text-[12px] sm:text-[14px] md:text-[10px] lg:text-[11px] xl:text-[15px] text-center">{props.time}</h2>
          </div>
          <div className="mt-1 lg:mt-2">
            {isStatus ? (
              <h2 className="text-blue-600 text-[10px] s:text-[12px] sm:text-[14px] md:text-[10px] lg:text-[11px] xl:text-[14px] text-center">예약가능</h2>
            ) : (
              <h2 className="text-red-600 text-[10px] s:text-[12px] sm:text-[14px] md:text-[10px] lg:text-[11px] xl:text-[14px] text-center">예약불가</h2>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

export default ReserveTime
