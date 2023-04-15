import { Icon } from "@iconify/react"

export interface GamedateProps {
  date: string
  isSelected : boolean
  handleClick : (value: number) => void
  elementIndex : number
}

const Gamedate = (props: GamedateProps) => {
  return (
    <button
    onClick={() => props.handleClick(props.elementIndex)}
    > 
    <div className={`w-[120px] h-[60px] rounded border-2 ${props.isSelected ? "bg-blue-600 text-white" : "bg-white"}`}>
        <p className = "w-[120px] mt-[13px] text-[24px] text-center">{props.date.substr(5,2) + " / " + props.date.substr(8,2)}</p>
    </div>
    </button>

  )
}
export default Gamedate
