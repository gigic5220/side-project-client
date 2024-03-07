import React, {FC} from "react";
import styled from "styled-components";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import {useNotificationPage} from "@/hooks/notification/hooks";
import NotificationComponent from "@/components/notification/NotificationComponent";

const BodyDiv = styled.div`
`


const NotificationPage: FC = () => {

    const {
        openAccordionId,
        myNotificationList,
        postAcceptGroupJoinRequestLoading,
        deleteGroupJoinRequestLoading,
        handleClickAcceptGroupJoinRequest,
        handleClickRejectGroupJoinRequest,
        handleClickNotification,
        handleClickRemoveNotification
    } = useNotificationPage()

    return (
        <AppLayoutComponent
            isShowHeader
            isShowNavigationBar={false}
        >
            <BodyDiv>
                <SpacerComponent height={24}/>
                <PageTitleComponent
                    title={'알림'}
                    subTitle={'알림을 확인해 주세요'}
                />
                <SpacerComponent height={24}/>
                {
                    !!myNotificationList && myNotificationList.map((notification, index) => {
                        return <NotificationComponent
                            key={notification.type + index}
                            type={notification.type}
                            id={notification.id}
                            parameterId={notification.parameterId}
                            parameterImage={notification.parameterImage}
                            parameterTextList={notification.parameterTextList}
                            handleClickNotification={handleClickNotification}
                            handleClickAcceptGroupJoinRequest={handleClickAcceptGroupJoinRequest}
                            acceptGroupJoinRequestLoading={postAcceptGroupJoinRequestLoading}
                            handleClickRejectGroupJoinRequest={handleClickRejectGroupJoinRequest}
                            rejectGroupJoinRequestLoading={deleteGroupJoinRequestLoading}
                            handleClickRemoveNotification={handleClickRemoveNotification}
                            openAccordionId={openAccordionId}
                        />
                    })
                }
            </BodyDiv>
        </AppLayoutComponent>
    );
};

export default NotificationPage;


