import React from 'react';
import { useRouter } from 'next/router'

const Reservationtime = () => {
  const router = useRouter();
  const { time } = router.query;

  return (
    <div>
      대회 번호 : {time}
    </div>
  )
}
export default Reservationtime
