import { ArrowRightIcon } from "@heroicons/react/outline"
import Link from "next/link"

export interface CardProps {
  imageSrc: string
  title: string
  desc: string
  link: string
}

const Card = (props: CardProps) => {
  return (
    <div className="p-4 sm:w-1/2 lg:w-1/3">
      <div className="h-full overflow-hidden border-2 border-gray-200 rounded-lg border-opacity-60">
        <div className="bg-gray-300">
          <img
            className="object-contain object-center w-full lg:h-72 md:h-48"
            src={props.imageSrc}
            alt="blog"
          />
        </div>
        <div className="p-6 transition duration-300 ease-in hover:bg-indigo-600 hover:text-white">
          <h1 className="mb-3 text-2xl font-semibold">{props.title}</h1>
          <p className="mb-3 leading-relaxed">{props.desc}</p>
          <div className="flex flex-wrap items-center ">
            <Link
              href={props.link}
              className="inline-flex items-center text-indigo-300 md:mb-2 lg:mb-0"
            >
              이동하기
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
