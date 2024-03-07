import {useSetRecoilState} from "recoil";
import {isShowFullScreenLoadingSpinnerAtom} from "@/atom/commonAtom";
import {useEffect} from "react";


export const useFullScreenLoadingSpinner = (deps: boolean[]) => {
    const setIsShowFullScreenLoadingSpinner = useSetRecoilState(isShowFullScreenLoadingSpinnerAtom);

    useEffect(() => {
        const isShow = deps.some((dep: boolean) => dep);
        setIsShowFullScreenLoadingSpinner(isShow);
    }, deps)
}