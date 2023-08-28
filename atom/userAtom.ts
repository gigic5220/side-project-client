import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

export const accessTokenAtom = atom({
    key: 'accessToken',
    default: ''
})

export const refreshTokenAtom = atom({
    key: 'refreshToken',
    default: ''
})