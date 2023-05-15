import { Icon } from "@iconify/react"

export interface infoCardProps {
  facilityname: string
  phonenumber: string
  location: string
}

const Introduce = (props: infoCardProps) => {
  return (
    <div className="xxs:w-[232px] xs:w-[290px] s:w-[337px] sm:w-[450px] md:w-[210px] lg:w-[280px] xl:w-[350px] xxs:h-[150px] xs:h-[160px] s:h-[170px] sm:h-[200px] md:h-[228px] lg:h-[304px] xl:h-[380px] md:ml-[20px] rounded border-2 bg-white">
      <div className="divide-y-2 divide-solid divide-black">
        <h2 className=" mt-5 ml-[35px] mr-[35px] left-9 top-5 font-mono text-left xs:text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] xl:text-[30px] font-bold">
          {props.facilityname}
        </h2>
        <div className="flex flex-col mt-2 sm:mt-4 ml-[35px] mr-[35px] ">
          <div className="flex flex-row mt-2 sm:mt-4 left-9 top-5 ">
            <Icon icon="material-symbols:call" className = "md:w-[15px] lg:w-[20px] xl:w-[25px] md:h-[15px] xl:h-[25px]" />
            <h2 className="ml-2 font-mono text-left text-[10px] s:text-[12px] sm:text-[14px] md:text-[10px] lg:text-[13px] xl:text-[16px]">
              {props.phonenumber}
            </h2>
          </div>

          <div className="flex flex-row xxs:mt-2 xs:mt-4 left-9 top-5 ">
            <Icon icon="fluent:sport-soccer-16-filled" className = "md:w-[15px] lg:w-[20px] xl:w-[25px] md:h-[15px] lg:h-[20px] xl:h-[25px]"/>
            <h2 className="ml-2 font-mono text-left text-[10px] s:text-[12px] sm:text-[14px] md:text-[10px] lg:text-[13px] xl:text-[16px]">
              {props.facilityname}
            </h2>
          </div>
          <div className="flex flex-row xxs:mt-2 xs:mt-4 left-9 top-5 ">
            <Icon icon="material-symbols:location-on" className = "md:w-[15px] lg:w-[20px] xl:w-[25px] md:h-[15px] lg:h-[20px] xl:h-[25px]"/>
            <h2 className="ml-2 font-mono text-left text-[10px] s:text-[12px] sm:text-[14px] md:text-[10px] lg:text-[13px] xl:text-[16px]">
              {props.location}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Introduce
