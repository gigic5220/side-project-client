import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

export const alertInfoAtom = atom({
    key: 'alertInfo',
    default: {}
})