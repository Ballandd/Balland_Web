import Head from "next/head";
import { useSession } from "next-auth/react";
import Router from "next/router";
export default function Reservation() {
  const {session, data, status } = useSession()
  console.log(session, data, status)
  if (status == "unauthenticated"){
    Router.replace("/auth/signin")
  }
  return (
    <div>
      <Head>
        <title>Tailwind Navbar Tutorial</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* content goes here */}
      <div className="py-32 text-center">
        <div className="text-4xl font-extrabold">reservation page </div>
      </div>
    </div>
  );
}