import { ArrowRightIcon } from "@heroicons/react/outline";
import Link from "next/link";

export interface infoCardProps {
    imageSrc: string;
    title: string;
    desc: string;
    link: string;
  }

const FacilityCard = (props: infoCardProps) => {
    return (
      <div className = "flex justify-center p-10 border-4 border-gray-400 rounded-md mt-40 ml-20 mr-20">
        <div>
       <img
            className="lg:h-72 md:h-48 w-full object-cover object-center"
            src={props.imageSrc}
            alt="blog"
          />
          <div>
            <h1 className="text-2xl font-semibold mb-3">{props.title}</h1>
            <p className="leading-relaxed mb-3">{props.desc}</p>
          </div>
        </div>
        
        

      </div>
      // <div className="flex justify-center p-10 sm:w-1/2 lg:w-1/3 ">
      //   <div className="rounded-br-4xl rounded-bl-2xl content-center">
      //     <img
      //       className="lg:h-72 md:h-48 w-full object-cover object-center"
      //       src={props.imageSrc}
      //       alt="blog"
      //     />
      //     <div className="p-6 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in">
      //       <h1 className="text-2xl font-semibold mb-3">{props.title}</h1>
      //       <p className="leading-relaxed mb-3">{props.desc}</p>
      //       <div className="flex items-center flex-wrap ">
      //         <Link href={props.link} className="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0">
      //           이동하기
      //           <ArrowRightIcon className="w-4 h-4 ml-2" />
      //         </Link>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  };
  
  export default FacilityCard;