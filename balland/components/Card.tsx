import { ArrowRightIcon, EyeIcon, ChatIcon } from "@heroicons/react/outline"
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
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-72 md:h-48 w-full object-cover object-center"
          src={props.imageSrc}
          alt="blog"
        />
        <div className="p-6 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in">
          <h1 className="text-2xl font-semibold mb-3">{props.title}</h1>
          <p className="leading-relaxed mb-3">{props.desc}</p>
          <div className="flex items-center flex-wrap ">
            <Link
              href={props.link}
              className="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0"
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
