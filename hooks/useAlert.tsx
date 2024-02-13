import {useRecoilState} from "recoil";
import {alertAtom, AlertType} from "@/atom/commonAtom";


export const useAlert = () => {
    //const setAlertInfoAtom = useSetRecoilState(alertAtom)

    const [alertInfoAtom, setAlertInfoAtom] = useRecoilState(alertAtom)
    const openAlert = (alert: AlertType) => {
        if (alertInfoAtom.title || alertInfoAtom.message) {
            return
        }
        setAlertInfoAtom(alert)
    }

    const closeAlert = () => {
        setAlertInfoAtom({
            type: 'alert',
            title: '',
            message: '',
            onClickClose: undefined,
            onClickConfirm: undefined
        })
    }

    return {openAlert, closeAlert}
}