import {atom} from "recoil";
import React from "react";

export type AlertType = {
    type: 'alert' | 'confirm';
    title?: string | React.ReactNode;
    message: string | React.ReactNode;
    onClickConfirm?: (() => void) | undefined;
    onClickClose?: (() => void) | undefined;
}
export const alertAtom = atom<AlertType>({
    key: 'alert',
    default: {
        type: 'alert',
        title: '',
        message: '',
        onClickClose: undefined,
        onClickConfirm: undefined
    }
})

export const isShowFullScreenLoadingSpinnerAtom = atom<boolean>({
    key: 'isShowFullScreenLoadingSpinner',
    default: false
})

export const snackbarAtom = atom<string | null>({
    key: 'snackbar',
    default: null
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