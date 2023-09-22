import {useState} from "react";


export const useJoinForms = () => {
    const [userId, setUserId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordCheck, setPasswordCheck] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [phoneVerifyNumber, setPhoneVerifyNumber] = useState<string>('')

    return {
        userId, setUserId,
        password, setPassword,
        passwordCheck, setPasswordCheck,
        phone, setPhone,
        phoneVerifyNumber, setPhoneVerifyNumber
    }
}