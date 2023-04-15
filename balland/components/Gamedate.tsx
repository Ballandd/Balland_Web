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
    <div className={`xxs:w-[40px] xxs:h-[30px] xs:w-[60px] xs:h-[40px] s:w-[90px] s:h-[45px] sm:w-[90px] sm:h-[45px] md:w-[90px] md:h-[45px] lg:w-[100px] lg:h-[50px] xl:w-[120px] xl:h-[60px] rounded border-2 ${props.isSelected ? "bg-blue-600 text-white" : "bg-white"}`}>
        <p className = " mt-3 text-base text-center">{props.date.substr(5,2) + " / " + props.date.substr(8,2)}</p>
    </div>
    </button>

  )
}
export default Gamedate
