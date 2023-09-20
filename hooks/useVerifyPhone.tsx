import {useEffect, useRef, useState} from "react";
import {useQuery} from "react-query";
import {callCheckVerifyNumber, callGetPhoneDuplication, callGetVerifyNumber} from "@/query/userQueryFn";

type useVerifyPhoneType = {
    phoneInitValue: string;
}
export const useVerifyPhone = (props: useVerifyPhoneType) => {
    const {phoneInitValue} = props;
    const phoneInitValueRef = useRef<string | undefined>()
    const [phone, setPhone] = useState<string>(phoneInitValue)
    const [phoneVerifyNumber, setPhoneVerifyNumber] = useState<string>('')
    const [isPhoneDuplicated, setIsPhoneDuplicated] = useState<boolean | null>(null)
    const [isPhoneValidate, setIsPhoneValidate] = useState<boolean | null>(false)
    const [isShowPhoneVerifyNumberInput, setIsShowPhoneVerifyNumberInput] = useState<boolean>(false)
    const [isPhoneVerifyNumberSent, setIsPhoneVerifyNumberSent] = useState<boolean>(false)
    const [isPhoneVerified, setIsPhoneVerified] = useState<boolean | null>(null)

    useEffect(() => {
        setPhone(phoneInitValue)
        if (!!phoneInitValue) {
            phoneInitValueRef.current = phoneInitValue
        }
    }, [phoneInitValue])

    const handleClickGetVerifyNumberButton = async () => {
        if (!isPhoneValidate) return
        setIsPhoneVerifyNumberSent(false)
        const phoneDuplication = await getPhoneDuplication()
        setIsPhoneDuplicated(phoneDuplication === true)
        if (phoneDuplication !== false) return
        const status = await sendVerifyNumberAndGetStatus()
        const isSentSuccessful = status === 'pending'
        setIsPhoneVerifyNumberSent(isSentSuccessful)
        if (isSentSuccessful && !isShowPhoneVerifyNumberInput) {
            setIsShowPhoneVerifyNumberInput(true)
        }
    }

    const changePhone = (value: string) => {
        setPhone(value)
    }

    const changePhoneVerifyNumber = (value: string) => {
        setPhoneVerifyNumber(value)
    }

    const {
        refetch: fetchCheckVerifyNumber,
        isLoading: isCheckVerifyNumberLoading
    } = useQuery(
        ['checkVerifyNumber', phone, phoneVerifyNumber],
        () => callCheckVerifyNumber(phone, phoneVerifyNumber),
        {
            enabled: false
        }
    )

    const {
        refetch: fetchGetPhoneDuplication,
        isLoading: isGetPhoneDuplicationLoading
    } = useQuery(
        ['getPhoneDuplication', phone],
        () => callGetPhoneDuplication(phone),
        {
            enabled: false
        }
    )

    const {
        refetch: fetchSendVerifyNumber,
        isLoading: isSendVerifyNumberLoading
    } = useQuery(
        ['getVerifyNumber', phone],
        () => callGetVerifyNumber(phone),
        {
            enabled: false
        }
    )

    const getPhoneDuplication = async () => {
        const {data: axiosResponse} = await fetchGetPhoneDuplication()
        return axiosResponse?.data.isDuplicated
    }

    const sendVerifyNumberAndGetStatus = async () => {
        const {data: axiosResponse} = await fetchSendVerifyNumber()
        return axiosResponse?.data?.status
    }

    const checkVerifyNumberAndGetStatus = async () => {
        const {data: axiosResponse} = await fetchCheckVerifyNumber()
        return axiosResponse?.data?.status
    }

    return {
        phone,
        phoneInitValueRef,
        changePhone,
        phoneVerifyNumber,
        changePhoneVerifyNumber,
        isPhoneDuplicated,
        setIsPhoneDuplicated,
        isPhoneValidate,
        setIsPhoneValidate,
        isPhoneVerified,
        setIsPhoneVerified,
        isPhoneVerifyNumberSent,
        isSendVerifyNumberLoading,
        isGetPhoneDuplicationLoading,
        isShowPhoneVerifyNumberInput,
        isCheckVerifyNumberLoading,
        handleClickGetVerifyNumberButton,
        checkVerifyNumberAndGetStatus
    }
}