import Head from "next/head"
import Link from "next/link"
import WaitingService from "../../components/WaitingService.tsx"
import { useState } from "react"

export default function Reservation() {
  const [currentTab, setCurrentTab] = useState(0)

  const tabMenu = [
    { title: "tab1", content: <div>tab1</div> },
    { title: "tab2", content: <div>tab2</div> },
    { title: "tab3", content: <div>tab3</div> },
  ]
  return (
    <div>
      <Head>
        <title>Reservation Main</title>
        <link rel="icon" href="/AU.png" />
      </Head>
      <div className="h-screen">
        <div className="divide-y-2 divide-black divide-solid">
          {tabMenu.map((item, index) => {
            return (
              <button
                key={index}
                className={`${
                  currentTab === index ? "text-red-900" : ""
                } mr-10`}
                onClick={() => {
                  setCurrentTab(index)
                }}
              >
                {item.title}
              </button>
            )
          })}
        </div>
        <div>{tabMenu[currentTab].content}</div>
      </div>
    </div>
  )
}

//
