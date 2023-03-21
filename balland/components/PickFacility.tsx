import { Icon } from '@iconify/react';

export interface PickFacilityProps {
    facilityname: string;
    picture : string;
    date: string;
    time: string;
  }

const PickFacility = (props: PickFacilityProps) => {
    return (
      <div className = "w-96 h-3/5 rounded border-2 bg-white">
          <div className = "mt-5 ml-5 mr-5 left-9 top-5">
                    <h2 className = "font-mono text-left text-2xl">선택한 운동장</h2>
                    <img className="mt-8 rounded-xl" src={props.picture} width="100%"></img>
                    <h2 className = "mt-4 font-mono text-left text-3xl font-bold">{props.facilityname}</h2>
                    <div className = "mt-6">
                        <div className = "flex flex-row">
                            <Icon icon="material-symbols:calendar-today" width="25" />
                            <h2 className = "ml-2 font-mono text-left text-base">{props.date}</h2>
                        </div>
                        <div className = "flex flex-row mt-2">
                        <Icon icon="material-symbols:nest-clock-farsight-analog-outline" width="25" />
                            <h2 className = "ml-2 font-mono text-left text-base">{props.time}</h2>
                        </div>
                    </div>
          </div>
      </div>
    )
}
export default PickFacility;