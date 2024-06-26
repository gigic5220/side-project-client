import styled from "styled-components";
import React from "react";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import SpacerComponent from "@/components/common/SpacerComponent";

const PhoneInputGridDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 20px;
  align-items: end;
`

const PhoneVerifyInputGridDiv = styled(PhoneInputGridDiv)`
  margin-top: 20px;
`

const ErrorMessageDiv = styled.div`
  margin-top: 20px;
`

const ErrorMessageP = styled.p`
  font-size: 12px;
  color: ${props => props.theme.fontColors.error};
`

type PhoneVerifyComponentProps = {
    phone: string;
    changePhone: (value: string) => void;
    phoneVerifyCode: string;
    changePhoneVerifyCode: (value: string) => void;
    postSendVerifyNumberLoading: boolean;
    postSendVerifyNumberSuccess: boolean;
    postSendVerifyNumberErrorMessage: string;
    postCheckVerifyNumberLoading: boolean;
    postCheckVerifyNumberSuccess: boolean;
    postCheckVerifyNumberErrorMessage: string;
    postSendVerifyNumber: () => void;
    postCheckVerifyNumber: () => void;
    isPhoneValid: (value: string) => boolean;
    isPhoneVerifyCodeValid: (value: string) => boolean;
    verifyButtonContent?: string | React.ReactNode;
    onClickedVerifyButton?: () => void;
}

const PhoneVerifyComponent = (props: PhoneVerifyComponentProps) => {

    const {
        phone, changePhone,
        phoneVerifyCode, changePhoneVerifyCode,
        postSendVerifyNumberLoading,
        postSendVerifyNumberSuccess,
        postSendVerifyNumberErrorMessage,
        postCheckVerifyNumberLoading,
        postCheckVerifyNumberSuccess,
        postCheckVerifyNumberErrorMessage,
        postSendVerifyNumber,
        postCheckVerifyNumber,
        isPhoneValid,
        isPhoneVerifyCodeValid,
        verifyButtonContent = '인증',
        onClickedVerifyButton,
    } = props;

    return (
        <>
            <PhoneInputGridDiv>
                <CommonInputComponent
                    title={'휴대폰번호를 입력해 주세요'}
                    disabled={postCheckVerifyNumberSuccess}
                    value={phone}
                    onChange={changePhone}
                    maxLength={11}
                    placeholder={'01012341234'}
                />
                <CommonButtonComponent
                    content={postSendVerifyNumberSuccess ? '재전송' : '인증번호 전송'}
                    borderRadius={'14px'}
                    fontSize={'15px'}
                    disabled={!isPhoneValid || postCheckVerifyNumberSuccess}
                    isLoading={postSendVerifyNumberLoading}
                    onClicked={postSendVerifyNumber}
                />
            </PhoneInputGridDiv>
            <SpacerComponent height={10}/>
            <PhoneVerifyInputGridDiv>
                {/*<CommonInputComponent
                    title={'인증번호를 입력해 주세요'}
                    disabled={!postSendVerifyNumberSuccess || postCheckVerifyNumberSuccess}
                    value={phoneVerifyCode}
                    onChange={changePhoneVerifyCode}
                    maxLength={11}
                    placeholder={'6자리 인증번호'}
                />
                <CommonButtonComponent
                    content={verifyButtonContent}
                    $borderRadius={'14px'}
                    disabled={!isPhoneVerifyCodeValid || !postSendVerifyNumberSuccess || postCheckVerifyNumberSuccess}
                    isLoading={postCheckVerifyNumberLoading}
                    onClicked={onClickedVerifyButton ?? postCheckVerifyNumber}
                />*/}
                <CommonInputComponent
                    title={'인증번호를 입력해 주세요'}
                    value={phoneVerifyCode}
                    onChange={changePhoneVerifyCode}
                    maxLength={11}
                    placeholder={'6자리 인증번호'}
                />
                <CommonButtonComponent
                    content={verifyButtonContent}
                    borderRadius={'14px'}
                    isLoading={postCheckVerifyNumberLoading}
                    onClicked={onClickedVerifyButton ?? postCheckVerifyNumber}
                />
            </PhoneVerifyInputGridDiv>
            <ErrorMessageDiv>
                <ErrorMessageP>
                    {postSendVerifyNumberErrorMessage || postCheckVerifyNumberErrorMessage}
                </ErrorMessageP>
            </ErrorMessageDiv>
        </>
    )
}

export default PhoneVerifyComponent