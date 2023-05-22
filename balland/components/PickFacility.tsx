import { Icon } from "@iconify/react"

export interface PickFacilityProps {
  facilityname: string
  picture: string
  dates: string[]
}

const PickFacility = (props: PickFacilityProps) => {
  let updatedDates: string[] = props.dates;

  if (props.dates.length >= 22) {
    updatedDates = String(props.dates).split(',');
  }
  updatedDates = updatedDates.sort()
  return (
    <div className="w-[250px] xs:w-[280px] s:w-[342px] sm:w-[456px] md:w-[570px] lg:w-[280px] xl:w-[350px] h-[110px] s:h-[130px] sm:h-[140px] md:h-[170px] lg:h-[440px] xl:h-[550px] rounded border-2 bg-white lg:ml-[20px] overflow-auto">
      <div className="mt-[20px] ml-[20px] mr-[20px] left-9 top-5">
        <h2 className="hidden lg:block font-mono text-left lg:text-[20px] xl:text-[24px]">선택한 운동장</h2>
        <img className="mt-[32px] rounded-xl hidden lg:block" src={props.picture} width="100%"></img>
        <h2 className="mt-[16px] font-mono text-center lg:text-left text-[16px] s:text-[20px] sm:text-[24px] md:text-[30px] lg:text-[24px] xl:text-[30px] font-bold">
          {props.facilityname}
        </h2>
        <div className="mt-[15px] s:mt-[24px]">
          {updatedDates.map((date, index) => (
            <div key={index} className="flex flex-row items-center justify-center lg:justify-start">
              <Icon 
                icon="material-symbols:calendar-today"  
                className="md:w-[15px] lg:w-[20px] xl:w-[25px] md:h-[15px] xl:h-[25px]" />
              <h2 className="ml-[8px] font-mono text-center lg:text-left text-[10px] s:text-[12px] sm:text-[13px] md:text-[16px] lg:text-[13px] xl:text-[16px]">
                {date}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default PickFacility
