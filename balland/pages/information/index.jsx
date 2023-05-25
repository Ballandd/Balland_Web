import Head from "next/head"
import Link from "next/link"
import WaitingService from "../../components/WaitingService.tsx"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Reservation() {
  const { data: session, status } = useSession()
  {
    return (
      <div>
        <Head>
          <title>Reservation Main</title>
          <link rel="icon" href="/AU.png" />
        </Head>
        <div className="h-screen">
          <p>Hello</p>
        </div>
      </div>
    )
  }
}
