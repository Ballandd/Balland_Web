import { Icon } from "@iconify/react"
import { useState } from "react"

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
        className={`w-[135px] h-[70px] rounded-lg border mt-[20px] ${
          props.isSelected ? "border-blue-600" : null
        }`}
      >
        <div className="flex flex-col">
          <div className="flex flex-row mt-2 justify-items-center">
            <Icon icon="ic:baseline-access-time" width={24} />
            <h2 className="ml-1 text-[15px] text-center">{props.time}</h2>
          </div>
          <div className="mt-2">
            {isStatus ? (
              <h2 className="text-blue-600 text-center text-sm">예약가능</h2>
            ) : (
              <h2 className="text-red-600 text-center text-sm">예약불가</h2>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

export default ReserveTime
