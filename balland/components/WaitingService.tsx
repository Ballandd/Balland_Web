import { Icon } from "@iconify/react"

export interface WaitingServiceProps {
}

const WaitingService = (props: WaitingServiceProps) => {
    return(
        <div className="flex flex-col items-center">
               <Icon className=
                "mt-2 xs:mt-4 s:mt-6 sm:mt-8 md:mt-10 w-24 xs:w-40 s:w-60 sm:w-70 md:w-76 h-24 xs:h-40 s:h-60 sm:h-70 md:h-76"
               icon="emojione:hourglass-not-done"/>
            <h1 className="mt-1 xs:mt-2 s:mt-4 sm:mt-6 md:mt-8 text-lg xs:text-xl s:text-2xl sm:text-3xl md:text-4xl font-bold">서비스 준비중입니다.</h1>
            <h2 className="mt-0.5 xs:mt-1 s:mt-2 sm:mt-3 md:mt-4 text-[8px] xs:text-[11px] s:text-[15px] sm:text-[18px] md:text-[18px] font-semibold">보다 나은 서비스 제공을 위해 페이지 준비중에 있습니다.</h2>
        </div>
    )
}

export default WaitingService