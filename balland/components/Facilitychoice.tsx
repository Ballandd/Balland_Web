import Router from 'next/router';

export interface FacilityProps {
  Facility: string
  Image : string
}

const FacilityChoice = (props: FacilityProps) => {
  return (
    <div className="bg-gray-100 flex items-center mt-[30px] mr-[30px]">
  <div className="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
    <img className="rounded-xl w-[310px] h-[220px]" src={props.Image} alt="" />
    <div className="flex justify-between items-center">
      <div>
        <h1 className="mt-[20px] xxs:text-[12px] xs:text-[15px] s:text-[20px] sm:text-[24px] font-semibold">{props.Facility}</h1>
      </div>
      <div>
        <button 
            onClick =  {() => Router.push("/reservation/bigground")}
            className="text-white mt-[20px] xxs:text-[12px] xs:text-[15px] s:text-[18px] font-semibold bg-blue-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 ">예약 하기</button>
      </div>
    </div>
  </div>
</div>
  )
}
export default FacilityChoice
