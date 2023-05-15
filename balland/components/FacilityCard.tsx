import { Icon } from "@iconify/react"

export interface FacilityProps {
  picture: string
}

const Facility = (props: FacilityProps) => {
  return (
    <div className="flex justify-center">
      <img className="xxs:w-[232px] xs:w-[290px] s:w-[337px] sm:w-[450px] md:w-[342px] lg:w-[456px] xl:w-[570px] xxs:h-[140px] xs:h-[174px] s:h-[200px] sm:h-[270px] md:h-[228px] lg:h-[304px] xl:h-[380px] " src={props.picture} />
    </div>
  )
}
export default Facility
