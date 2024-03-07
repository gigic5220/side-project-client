import React, {FC} from "react";
import styled from "styled-components";
import {useAlert} from "@/hooks/useAlert";
import {useRouter} from "next/router";
import {useMutation} from "@tanstack/react-query";
import {usePhoneVerify} from "@/hooks/usePhoneVerify";
import {callApi} from "@/api/CustomedAxios";
import PhoneVerifyComponent from "@/components/join/PhoneVerifyComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import BottomFloatingButtonComponent from "@/components/common/BottomFloatingButtonComponent";

const BodyDiv = styled.div`
`

const JoinItemTitleP = styled.p`
  margin-top: 60px;
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.theme.fontColors.primary};
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
        <AppLayoutComponent
            isShowHeader
            isShowNavigationBar={false}
        >
            <BodyDiv>
                <PageTitleComponent
                    title={'회원가입을 진행할게요'}
                    subTitle={'간단한 휴대폰본인인증이 진행됩니다'}
                />
                <SpacerComponent height={40}/>
                <PhoneVerifyComponent
                    {...userPhoneVerifyStates}
                />
                <BottomFloatingButtonComponent
                    disabled={!userPhoneVerifyStates.postCheckVerifyNumberSuccess}
                    onClicked={postJoin}
                    isLoading={postJoinLoading}
                    content={'가입하기'}
                />
            </BodyDiv>
        </AppLayoutComponent>
    );
};

export default JoinPage;


