import { Icon } from '@iconify/react';

export interface infoCardProps {
    time: string;
    status: boolean;
  }

const ReserveTime = (props: infoCardProps) => {
    const isStatus = props.status;

    return (
      <button disabled={props.status == true ? false : true}>
      <div className="w-[135px] h-[70px] rounded-lg border bg-white mt-[20px]">
        <div className="flex flex-col">
          <div className="flex flex-row mt-2 justify-items-center">
            <Icon icon="ic:baseline-access-time" width={24} />
            <h2 className="ml-1 text-[15px] text-center">{props.time}</h2>
          </div>
          <div className='mt-2'>
            {isStatus ? <h2 className="text-blue-600 text-center text-sm">예약가능</h2> : <h2 className="text-red-600 text-center text-sm">예약불가</h2>}
          </div>
        </div>
      </div>
      </button>
    );
}

export default ReserveTime
