import {callCheckVerifyNumber, callPostVerifyNumber} from "@/query/userQueryFn";
import {useState} from "react";
import {useAlert} from "@/hooks/useAlert";
import {useMutation} from "@tanstack/react-query";

export const usePhoneVerify = () => {

    const [phone, setPhone] = useState<string>('');
    const [phoneVerifyCode, setPhoneVerifyCode] = useState<string>('');

    const {openAlert} = useAlert();

    const {
        mutateAsync: postSendVerifyNumber,
        isPending: postSendVerifyNumberLoading,
        isSuccess: postSendVerifyNumberSuccess,
        isError: postSendVerifyNumberError
    } = useMutation({
        mutationFn: () => callPostVerifyNumber(phone),
    });

    const {
        mutateAsync: postCheckVerifyNumber,
        isPending: postCheckVerifyNumberLoading,
        isSuccess: postCheckVerifyNumberSuccess,
        isError: postCheckVerifyNumberError
    } = useMutation({
        mutationFn: () => callCheckVerifyNumber(phone, phoneVerifyCode),
        onSuccess: () => {
            openAlert({
                type: 'alert',
                message: '휴대폰번호 인증이 완료되었어요'
            })
        }
    });

    const changePhone = (value: string) => {
        setPhone(value);
    }

    const changePhoneVerifyCode = (value: string) => {
        setPhoneVerifyCode(value);
    }

    return {
        phone, changePhone,
        phoneVerifyCode, changePhoneVerifyCode,
        postSendVerifyNumberLoading,
        postSendVerifyNumberSuccess,
        postSendVerifyNumberError,
        postCheckVerifyNumberLoading,
        postCheckVerifyNumberSuccess,
        postCheckVerifyNumberError,
        postSendVerifyNumber,
        postCheckVerifyNumber,
    }
}
