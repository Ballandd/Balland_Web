import NavBar from "./Navbar.js";
import React from "react";
interface Props {
    children: React.ReactNode;
  }
export default function Layout({children}: Props ) {
  return (
    <>
      <NavBar />
      <div className = "w-100% h-100% mr-36 ml-36 mt-12 left-1/2 top-1/2">
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
            height: 100%;
        }
    `}</style>
    {children}</div>
        
    </>
  );
}