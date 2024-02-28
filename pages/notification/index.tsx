import React, {FC} from "react";
import styled from "styled-components";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import {useGetMyNotificationList} from "@/hooks/notification/hooks";
import {GoDotFill} from "react-icons/go";
import {theme} from "@/styles/theme";

const BodyDiv = styled.div`
`

const NotificationDiv = styled.div`
  border-radius: 12px;
  border: 2px solid ${({theme}) => theme.colors.primary};
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px;
  margin-bottom: 12px;
`

const NotificationMessageSpan = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.fontColors.primary};
`

const NotificationPage: FC = () => {

    const {
        myNotificationList,
        myNotificationListLoading
    } = useGetMyNotificationList()

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
                        return (
                            <NotificationDiv key={index}>
                                <GoDotFill
                                    size={24}
                                    color={theme.fontColors.primary}
                                />
                                <NotificationMessageSpan>
                                    {notification.message}
                                </NotificationMessageSpan>
                            </NotificationDiv>
                        )
                    })
                }
                <NotificationDiv>
                    <GoDotFill/>
                    <NotificationMessageSpan>

                    </NotificationMessageSpan>
                </NotificationDiv>
            </BodyDiv>
        </AppLayoutComponent>
    );
};

export default NotificationPage;


