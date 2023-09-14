import {recoilPersist} from 'recoil-persist'
import {atom} from "recoil";

const {persistAtom} = recoilPersist()

export const accessTokenAtom = atom({
    key: 'accessToken',
    default: ''
})

export const refreshTokenAtom = atom({
    key: 'refreshToken',
    default: ''
})
