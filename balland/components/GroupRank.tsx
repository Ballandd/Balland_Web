export interface infoRankProps {
    group: string;
    teamOne: string;
    teamTwo: string;
    teamThree: string;
  }

  const GroupRank = (props: infoRankProps) => {
    return (
        <div className="w-[220px] h-[190px] bg-white">
            <div className="border-b-[1px] border-[#DDDDDD] py-2">
                <h1 className="font-bold text-lg text-center">{props.group}</h1>
            </div>
            <div className="py-4 pl-5">
                <div className="mb-[18px]">
                    <div className="w-9 inline-block">
                        <span className="font-bold text-lg text-[#57667E]">1</span>
                        <span className="font-semibold text-sm text-[#57667E]">st</span>
                    </div>
                    <span className="font-bold text-lg">{props.teamOne}</span>
                </div>
                <div className="mb-[18px]">
                    <div className="w-9 inline-block">
                        <span className="font-bold text-lg text-[#57667E]">2</span>
                        <span className="font-semibold text-sm text-[#57667E]">nd</span>
                    </div>
                    <span className="font-bold text-lg">{props.teamTwo}</span>
                </div>
                <div>
                    <div className="w-9 inline-block">
                        <span className="font-bold text-lg text-[#57667E]">3</span>
                        <span className="font-semibold text-sm text-[#57667E]">rd</span>
                    </div>
                    <span className="font-bold text-lg">{props.teamThree}</span>
                </div>
            </div>
        </div>
        // <div className="w-64 h-48 border bg-white block">
        //     <div className ="divide-y-2 divide-solid divide-slate-300">
        //         <div>
        //             <h1 className="text-xl text-center">{props.group}</h1>
        //         </div>
        //         <div className=" h-32 flex flex-row text-center">
        //             <div className="flex flex-col">
        //                 <h1 className="h-12">1st</h1>
        //                 <h1 className="h-12">2nd</h1>
        //                 <h1 className="h-12">3rd</h1>
        //             </div>
        //             <div className="ml-3 flex flex-col text-center">
        //                 <h1 className="h-12">{props.teamOne}</h1>
        //                 <h1 className="h-12">{props.teamTwo}</h1>
        //                 <h1 className="h-12">{props.teamThree}</h1>
        //             </div>
        //         </div>
                
        //         {/* <div className="flex">
        //             <h1 className="flex-none text-slate-500 text-xl">1st</h1>
        //             <h1 className="flex-initial text-xl ml-2">{props.teamOne}</h1>
        //         </div>
        //         <div className="flex flex-row">
        //             <h1 className="flex-none text-slate-500 text-xl">2nd</h1>
        //             <h1 className="flex-initial text-xl ml-2">{props.teamTwo}</h1>
        //         </div>
        //         <div className="flex flex-row">
        //             <h1 className="flex-none text-slate-500 text-xl">3rd</h1>
        //             <h1 className="flex-initial text-xl ml-2">{props.teamThree}</h1>
        //         </div> */}
        //     </div>
        // </div>
    );
  }

  export default GroupRank