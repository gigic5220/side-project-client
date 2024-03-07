import {copyTextToClipboard} from "@/util/common";
import {useSnackbar} from "@/hooks/useSnackbar";


export const useCopyToClipboard = () => {

    const {openSnackbar} = useSnackbar()

    const copyToClipboard = async (text: string) => {
        copyTextToClipboard(text).then(() => {
            openSnackbar('클립보드에 복사되었어요')
        })
    }

    return {
        copyToClipboard
    }
}