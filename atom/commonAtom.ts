import {recoilPersist} from 'recoil-persist'
import {atom} from "recoil";

const {persistAtom} = recoilPersist()

export const alertInfoAtom = atom({
    key: 'alertInfo',
    default: {}
})
