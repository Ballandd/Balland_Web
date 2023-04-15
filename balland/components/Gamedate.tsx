import { Icon } from "@iconify/react"

export interface GamedateProps {
  date: string
}

const Gamedate = (props: GamedateProps) => {
  return (
    <div className="w-[120px] h-[60px] rounded border-2 bg-white">
        <p className = "w-[120px] mt-[13px] text-[24px] text-center">{props.date.substr(5,2) + " / " + props.date.substr(8,2)}</p>
    </div>
  )
}
export default Gamedate
