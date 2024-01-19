import styled from "styled-components";
import React from "react";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";

const FloatingButtonDiv = styled.div`
  position: fixed;
  bottom: 40px;
  left: 24px;
  right: 24px;
`

const PhoneInputGridDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 20px;
`

const PhoneVerifyInputGridDiv = styled(PhoneInputGridDiv)`
  margin-top: 20px;
`

type PhoneVerifyComponent = {
    phone: string;
    changePhone: (value: string) => void;
    phoneVerifyCode: string;
    changePhoneVerifyCode: (value: string) => void;
    postSendVerifyNumberLoading: boolean;
    postSendVerifyNumberSuccess: boolean;
    postSendVerifyNumberError: boolean;
    postCheckVerifyNumberLoading: boolean;
    postCheckVerifyNumberSuccess: boolean;
    postCheckVerifyNumberError: boolean;
    postSendVerifyNumber: () => void;
    postCheckVerifyNumber: () => void;
}

const PhoneVerifyComponent = (props: PhoneVerifyComponent) => {

    const {
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
    } = props;

    return (
        <>
            <PhoneInputGridDiv>
                <CommonInputComponent
                    disabled={postCheckVerifyNumberSuccess}
                    value={phone}
                    onChange={changePhone}
                    maxLength={11}
                    placeholder={'01012341234'}
                />
                <CommonButtonComponent
                    text={postSendVerifyNumberSuccess ? '재전송' : '인증번호 전송'}
                    borderRadius={'14px'}
                    fontSize={'15px'}
                    disabled={phone.length < 10 || postCheckVerifyNumberSuccess}
                    isLoading={postSendVerifyNumberLoading}
                    onClicked={postSendVerifyNumber}
                />
            </PhoneInputGridDiv>
            <PhoneVerifyInputGridDiv>
                <CommonInputComponent
                    disabled={!postSendVerifyNumberSuccess || postCheckVerifyNumberSuccess}
                    value={phoneVerifyCode}
                    onChange={changePhoneVerifyCode}
                    maxLength={11}
                    placeholder={'6자리 인증번호'}
                />
                <CommonButtonComponent
                    text={'인증'}
                    borderRadius={'14px'}
                    disabled={!postSendVerifyNumberSuccess || postCheckVerifyNumberSuccess}
                    isLoading={postCheckVerifyNumberLoading}
                    onClicked={postCheckVerifyNumber}
                />
            </PhoneVerifyInputGridDiv>
        </>
    )
}

export default PhoneVerifyComponent