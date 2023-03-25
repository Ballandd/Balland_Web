import { Icon } from '@iconify/react';

export interface FacilityProps {
    picture : string;
  }

const Facility = (props: FacilityProps) => {
    return (
      <div className = "flex justify-center">
          <img
            className = "w-64 h-1/2 "
            src = {props.picture}
          />
      </div>
    )
}
export default Facility;