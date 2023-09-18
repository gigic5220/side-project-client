import {useSetRecoilState} from "recoil";
import {alertAtom, AlertType} from "@/atom/commonAtom";


export const useAlert = () => {
    const setAlertInfoAtom = useSetRecoilState(alertAtom)
    const openAlert = (alert: AlertType) => {
        setAlertInfoAtom(alert)
    }

    const closeAlert = () => {
        setAlertInfoAtom({
            type: 'alert',
            message: '',
            onClickClose: undefined,
            onClickConfirm: undefined
        })
    }

    return {openAlert, closeAlert}
}