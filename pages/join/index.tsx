import React, {FC} from "react";
import PhoneVerifyComponent from "@/components/join/PhoneVerifyComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import BottomFloatingButtonComponent from "@/components/common/BottomFloatingButtonComponent";
import {useJoinPage} from "@/hooks/join/hooks";

const JoinPage: FC = () => {

    const {
        userPhoneVerifyStates,
        postUserLoading,
        handleClickJoinButton
    } = useJoinPage()

    return (
        <AppLayoutComponent
            isShowHeader
            isShowNavigationBar={false}
        >
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
                onClicked={handleClickJoinButton}
                isLoading={postUserLoading}
                content={'가입하기'}
            />
        </AppLayoutComponent>
    );
};

export default JoinPage;


