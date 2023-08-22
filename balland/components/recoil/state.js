import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const idState = atom({
  key: 'idState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
const reservationState = atom({
  key: 'reservationState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
export { idState };
export {reservationState};