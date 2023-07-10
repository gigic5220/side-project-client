import {alertInfoAtom} from '../atom/commonAtom'
import {useSetRecoilState} from "recoil";
import {AlertInfo} from "@/type/common";


export const useAlert = () => {
    const setAlertInfoAtom = useSetRecoilState(alertInfoAtom)
    const openAlert = (alertInfo: AlertInfo) => {
        setAlertInfoAtom(alertInfo)
    }

    const closeAlert = () => {
        setAlertInfoAtom({})
    }

    return {openAlert, closeAlert}
}