import {atom} from "recoil";

export const notificationCountAtom = atom<number>({
    key: 'notificationCount',
    default: 0
})
