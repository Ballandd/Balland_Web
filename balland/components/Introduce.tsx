import { Icon } from '@iconify/react';

export interface infoCardProps {
    facilityname: string;
    phonenumber: string;
    location: string;
  }

const Introduce = (props: infoCardProps) => {
    return (
      <div className = "w-80 h-96 rounded border-2 bg-white">
          <div className = "divide-y-2 divide-solid divide-black">
            <h2 className = " mt-5 ml-5 left-9 top-5 font-mono text-left text-3xl font-bold">{props.facilityname}</h2>
            <div className = "flex flex-col mt-4 ml-5 mr-5 ">
            <div className = "flex flex-row mt-4 left-9 top-5 ">
                <Icon icon="material-symbols:call" width="25"/>
                <h2 className = "ml-2 font-mono text-left text-base">{props.phonenumber}</h2>
                </div>
                
            <div className = "flex flex-row mt-4 left-9 top-5 ">
                <Icon icon="fluent:sport-soccer-16-filled" width="25" />
                <h2 className = "ml-2 font-mono text-left text-base">{props.facilityname}</h2>
                </div>
            <div className = "flex flex-row mt-4 left-9 top-5 ">
                <Icon icon="material-symbols:location-on" width="25" />
                <h2 className = "ml-2 font-mono text-left text-base">{props.location}</h2>
                </div>
            </div>
            </div>
        
          {/* <div >
              <h2 className = "w-146 h-29 absolute left-35 top-20 font-mono text-left text-2xl tracking-normal">{props.facilityname}</h2>

          </div> */}
      </div>
    )
}
export default Introduce;