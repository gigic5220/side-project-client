import {callCheckVerifyNumber, callPostVerifyNumber} from "@/query/userQueryFn";
import {useState} from "react";
import {useAlert} from "@/hooks/useAlert";
import {useMutation} from "@tanstack/react-query";

export const usePhoneVerify = () => {

    const [phone, setPhone] = useState<string>('');
    const [phoneVerifyCode, setPhoneVerifyCode] = useState<string>('');

    const {openAlert} = useAlert();

    const [postSendVerifyNumberErrorMessage, setPostSendVerifyNumberErrorMessage] = useState<string>('');
    const [postCheckVerifyNumberErrorMessage, setPostCheckVerifyNumberErrorMessage] = useState<string>('');

    const {
        mutateAsync: postSendVerifyNumber,
        isPending: postSendVerifyNumberLoading,
        isSuccess: postSendVerifyNumberSuccess
    } = useMutation({
        mutationFn: () => callPostVerifyNumber(phone),
        onError: () => {
            setPostCheckVerifyNumberErrorMessage('');
            setPostSendVerifyNumberErrorMessage('에러발생');
        },
        onSuccess: () => {
            setPostSendVerifyNumberErrorMessage('');
        }
    });

    const {
        mutateAsync: postCheckVerifyNumber,
        isPending: postCheckVerifyNumberLoading,
        isSuccess: postCheckVerifyNumberSuccess,
        isError: postCheckVerifyNumberError
    } = useMutation({
        mutationFn: () => callCheckVerifyNumber(phone, phoneVerifyCode),
        onError: () => {
            setPostSendVerifyNumberErrorMessage('');
            setPostCheckVerifyNumberErrorMessage('에러발생');
        },
        onSuccess: () => {
            setPostCheckVerifyNumberErrorMessage('');
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

    const isPhoneValid = (phoneString: string) => {
        return phoneString.length > 9;
    }

    const isPhoneVerifyCodeValid = (phoneVerifyNumberString: string) => {
        return phoneVerifyNumberString.length > 5;
    }

    return {
        phone, changePhone,
        phoneVerifyCode, changePhoneVerifyCode,
        isPhoneValid,
        isPhoneVerifyCodeValid,
        postSendVerifyNumberLoading,
        postSendVerifyNumberSuccess,
        postSendVerifyNumberErrorMessage,
        postCheckVerifyNumberLoading,
        postCheckVerifyNumberSuccess,
        postCheckVerifyNumberErrorMessage,
        postSendVerifyNumber,
        postCheckVerifyNumber,
    }
}
