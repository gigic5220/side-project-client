import {atom} from "recoil";
import React from "react";

export type AlertType = {
    type: 'alert' | 'confirm'
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

export type DialogType = {
    children: React.ReactNode | null;
    onClickClose?: (() => void) | undefined;
}
export const dialogAtom = atom<DialogType>({
    key: 'dialog',
    default: {
        children: null,
        onClickClose: undefined
    }
})
