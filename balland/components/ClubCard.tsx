import { ArrowRightIcon} from "@heroicons/react/outline"
import Link from "next/link"

export interface CardProps {
    status: Boolean
    imageBack: string
    imageAmbler: string
    name: string
    info: string
    link: string
}

const ClubCard = (props: CardProps) => {
    const isStatus = props.status
    return (
        <div>
            {isStatus ? (
                // 여기가 true가 온 480보다 큰 것
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
                        <h2 className="mt-1 lg:mt-0 text-[8px] lg:text-[10px] xl:text-base font-semibold inline-flex items-center">
                            자세히보기
                            <ArrowRightIcon className="w-3 lg:w-4 h-3 lg:h-4 ml-1"/>
                        </h2>
                    </div>
                </div>
            ) : (
                // 여기가 false가 온 480보다 작은 것
                <div className="relative flex flex-row w-[80vw] h-10 bg-white">
                    <img
                        className="w-10 object-contain rounded-full mr-2 bg-gray-300"
                        src={props.imageAmbler}
                    />
                    <div className="flex flex-col mt-0.5">
                        <h1 className="text-sm font-bold">{props.name}</h1>
                        <h2 className="text-xs font-medium">{props.info}</h2>
                    </div>
                    <ArrowRightIcon className="absolute right-2 inset-y-1/3 w-4 h-4"/>
                </div>        
            )}
        </div>
    )
}
export default ClubCard