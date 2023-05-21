export interface CardProps {
    clubimage: string
    clubname: string
    captain: string
    people: string
    phonenumber: string
    history: any[]
}

const ClubInfo = (props:CardProps) => {
  const historylist = props.history
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 w-10/12 mb-10 bg-white">
        <img
        className="w-full s:h-[350px] sm:h-[250px] lg:h-[350px] xl:h-[450px] object-cover"
        src={props.clubimage}
        />
        <div className="flex flex-col pt-2 sm:pt-4 lg:pt-3 px-1 s:px-2 sm:px-4 lg:px-5">
          <div className="text-[20px] s:text-[30px] md:text-[40px] border-b-[3px] border-black mb-2 sm:mb-4">{props.clubname}</div>
          <div className="text-[10px] xs:text-xs s:text-sm sm:text-sm md:text-[14px] lg:text-lg xl:text-xl mb-4 sm:mb-1">
            <div>회장: {props.captain}</div>
            <div>임원: {props.people}</div>
            <div>전화번호: {props.phonenumber}</div>
              <div className="flex flex-row">
                <span className="mr-1">연혁: </span>
                <div className="flex flex-col">
                  <span>{props.history}</span>
                </div>
              </div> 
            </div>
          </div>
      </div>
    )
}

export default ClubInfo