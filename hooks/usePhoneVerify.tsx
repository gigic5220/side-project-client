import {useState} from "react";


export const usePhoneVerify = () => {
    const [isPhoneDuplicated, setIsPhoneDuplicated] = useState<boolean | null>(null)
    const [isPhoneVerifyNumberSent, setIsPhoneVerifyNumberSent] = useState<boolean>(false)
    const [isPhoneVerified, setIsPhoneVerified] = useState<boolean | null>(null)

    return {
        isPhoneDuplicated, setIsPhoneDuplicated,
        isPhoneVerifyNumberSent, setIsPhoneVerifyNumberSent,
        isPhoneVerified, setIsPhoneVerified
    }
}