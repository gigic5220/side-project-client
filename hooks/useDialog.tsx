import {useSetRecoilState} from "recoil";
import {dialogAtom, DialogType} from "@/atom/commonAtom";


export const useDialog = () => {
    const setDialogAtom = useSetRecoilState(dialogAtom)
    const openDialog = (dialog: DialogType) => {
        setDialogAtom(dialog)
    }

    const closeDialog = () => {
        setDialogAtom({
            children: null,
            onClickClose: undefined
        })
    }

    return {openDialog, closeDialog}
}