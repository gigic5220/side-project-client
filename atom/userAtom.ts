import {recoilPersist} from 'recoil-persist'
import {atom} from "recoil";

const {persistAtom} = recoilPersist()

export const userIdAtom = atom({
    key: 'userId',
    default: null
})
