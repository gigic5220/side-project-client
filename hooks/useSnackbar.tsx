import React from "react";
import {useSetRecoilState} from "recoil";
import {snackbarAtom} from "@/atom/commonAtom";

export const useSnackbar = () => {
    const setSnackbar = useSetRecoilState(snackbarAtom);
    const openSnackbar = async (
        message: string,
        durationMillisecond?: number
    ) => {
        if (!message) return
        setSnackbar(message)
        setTimeout(() => {
            setSnackbar(null)
        }, durationMillisecond || 2000)

    }

    return {openSnackbar}
}