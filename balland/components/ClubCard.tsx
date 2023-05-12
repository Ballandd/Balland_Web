import { ArrowRightIcon} from "@heroicons/react/outline"
import Link from "next/link"

export interface CardProps {
    imageBack: string
    imageAmbler: string
    name: string
    info: string
    link: string
}

const ClubCard = (props: CardProps) => {
    return (
        <div className="relative w-40 lg:w-44 xl:w-52 h-40 lg:h-44 xl:h-52 border-2 bg-white items-center">
            <img
                className="w-full h-1/2 object-none z-0"
                src={props.imageBack}
            />
            <img 
                className="absolute top-8 lg:top-10 xl:top-12 inset-x-1/3 w-1/3 h-1/3 rounded-full z-20 object-contain bg-gray-300"
                src={props.imageAmbler}
            />
            <div className="w-full h-1/2 z-10 flex flex-col items-center bg-red-400">
                <h1 className="mt-4 lg:mt-[18px] text-xs lg:text-base xl:text-xl font-bold">{props.name}</h1>
                <h2 className="text-[10px] lg:text-sm xl:text-base font-medium">{props.info}</h2>
                <h2 className="mt-1 lg:mt-0 text-[12px] lg:text-base xl:text-xl font-semibold inline-flex items-center">
                    자세히 보기
                    <ArrowRightIcon className="w-4 h-4 ml-1"/>
                </h2>
            </div>
        </div>
    )
}
export default ClubCard