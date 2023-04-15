import NavBar from "./Navbar.js"
import React, { useEffect, useState } from "react"
interface Props {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
 
  return (
    <>
      <NavBar />
      <div className="xxs:mx-7 xs:mx-8 s:mx-20 sm:mx-32 md:mx-36 w-100% h-100% mt-12 left-1/2 top-1/2">
        {children}
      </div>
    </>
  )
}
