import {atom} from "recoil";

export type AlertType = {
    type: string;
    message: string;
    onClickConfirm?: (() => void) | undefined;
    onClickClose?: (() => void) | undefined;
}
export const alertAtom = atom<AlertType>({
    key: 'alert',
    default: {
        type: 'alert',
        message: '',
        onClickClose: undefined,
        onClickConfirm: undefined
    }
})
