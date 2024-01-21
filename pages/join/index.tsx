import React, {FC} from "react";
import styled from "styled-components";
import {useAlert} from "@/hooks/useAlert";
import {useRouter} from "next/router";
import {useMutation} from "@tanstack/react-query";
import {usePhoneVerify} from "@/hooks/usePhoneVerify";
import {callApi} from "@/api/CustomedAxios";
import PhoneVerifyComponent from "@/components/join/PhoneVerifyComponent";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";

const BodyDiv = styled.div`
  padding: 24px;
`

const PageTitleP = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.theme.fontColors.primary};
`

const PageSubTitleP = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: ${props => props.theme.fontColors.secondary};
`

const JoinItemTitleP = styled.p`
  margin-top: 60px;
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.theme.fontColors.primary};
`

const FloatingButtonDiv = styled.div`
  position: fixed;
  bottom: 40px;
  left: 24px;
  right: 24px;
`

const JoinPage: FC = () => {

    const router = useRouter()

    const {openAlert} = useAlert();

    const userPhoneVerifyStates = usePhoneVerify();

    const {
        mutateAsync: postJoin,
        isPending: postJoinLoading
    } = useMutation({
        mutationFn: () => callApi('post', '/user', {'phone': userPhoneVerifyStates.phone}),
        onSuccess: () => {
            openAlert({
                type: 'alert',
                message: '회원가입이 완료되었어요',
                onClickClose: () => router.push('/')
            })
        }
    });

    return (
        <BodyDiv>
            <PageTitleP>
                회원가입을 진행할게요
            </PageTitleP>
            <PageSubTitleP>
                간단한 휴대폰본인인증이 진행됩니다
            </PageSubTitleP>
            <JoinItemTitleP>
                휴대폰번호를 입력해 주세요
            </JoinItemTitleP>

            <PhoneVerifyComponent
                {...userPhoneVerifyStates}
            />

            <FloatingButtonDiv>
                <CommonButtonComponent
                    disabled={!userPhoneVerifyStates.postCheckVerifyNumberSuccess}
                    onClicked={postJoin}
                    isLoading={postJoinLoading}
                    text={'가입하기'}
                />
            </FloatingButtonDiv>
        </BodyDiv>
    );
};

export default JoinPage;


