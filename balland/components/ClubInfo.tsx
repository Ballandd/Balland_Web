export interface CardProps {
    clubimage: string
    clubname: string
    captain: string
    people: string
    phonenumber: string
    history: string
}

const ClubInfo = (props:CardProps) => {
    return (
        <div className="flex w-10/12 h-60 md:h-96 xl:h-[450px] mb-10 bg-white">
          <img
            className="basis-2/5 h-full object-contain"
            src={props.clubimage}
          />
          <div className="basis-3/5 flex flex-col pt-10 px-10">
            <div className="text-[40px] border-b-[3px] border-black mb-4">{props.clubname}</div>
            <div>회장: {props.captain}</div>
            <div>임원: {props.people}</div>
            <div>전화번호: {props.phonenumber}</div>
            <div>연혁: {props.history}</div>  
          </div>
        </div>
    )
}

export default ClubInfo