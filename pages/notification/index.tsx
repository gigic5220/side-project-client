import React, {FC} from "react";
import styled from "styled-components";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import {useDeleteGroupJoinRequest, useGetMyNotificationList, usePostNotificationRead} from "@/hooks/notification/hooks";
import {GoDotFill} from "react-icons/go";
import {theme} from "@/styles/theme";
import CircledUserPhotoComponent from "@/components/common/CircledUserPhotoComponent";
import {MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp} from "react-icons/md";
import {IoMdClose} from "react-icons/io";
import {FaRegCircle} from "react-icons/fa";

const BodyDiv = styled.div`
`

const NotificationDiv = styled.div`
  border-radius: 12px;
  border: 2px solid ${({theme}) => theme.colors.primary};
  gap: 8px;
  padding: 8px 12px 8px 12px;
  margin-bottom: 12px;
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.3);
`

const NotificationContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NotificationMessageDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 400;
`

const NotificationMessageNickNameSpan = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({theme}) => theme.fontColors.primary};
`

const NotificationMessageSpan = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.fontColors.primary};
`

const NotificationMessageGroupNameSpan = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({theme}) => theme.fontColors.primary};
`

const NotificationAccordionDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 12px;
`

const NotificationRequestActionDiv = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;
`

const NotificationRequestActionButtonDiv = styled.div`
  border-radius: 12px;
  border: 2px solid ${({theme}) => theme.colors.primary};
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.3);
`

const NotificationPage: FC = () => {

    const {
        myNotificationList,
        myNotificationListLoading,
        refetchMyNotificationList
    } = useGetMyNotificationList()

    const [openAccordionId, setOpenAccordionId] = React.useState<number | null>(null)

    const {
        postNotificationRead,
        postNotificationReadLoading
    } = usePostNotificationRead(() => {
        refetchMyNotificationList()
    })

    const {
        deleteGroupJoinRequest,
        deleteGroupJoinRequestLoading
    } = useDeleteGroupJoinRequest(() => {
    })

    const disagreeGroupJoinRequest = (notificationId: number, groupJoinRequestId: number) => {
        postNotificationRead(notificationId);
        deleteGroupJoinRequest(groupJoinRequestId);
    }


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
                                {
                                    notification.type === 'groupJoinRequest' && (
                                        <>
                                            <NotificationContentDiv
                                                onClick={() => {
                                                    if (openAccordionId === notification.parameterId) {
                                                        setOpenAccordionId(null)
                                                    } else {
                                                        setOpenAccordionId(notification.parameterId)
                                                    }
                                                }}
                                            >
                                                <NotificationMessageDiv>
                                                    <GoDotFill
                                                        size={24}
                                                        color={theme.colors.secondary}
                                                    />
                                                    <CircledUserPhotoComponent imageUrl={notification.parameterImageList[0]}/>
                                                    <NotificationMessageNickNameSpan>
                                                        {notification.parameterTextList[0]}
                                                    </NotificationMessageNickNameSpan>
                                                    님의 가입신청

                                                </NotificationMessageDiv>
                                                {
                                                    openAccordionId !== notification.parameterId ?
                                                        <MdOutlineKeyboardDoubleArrowDown
                                                            color={theme.colors.primary}
                                                            size={20}
                                                        /> : <MdOutlineKeyboardDoubleArrowUp
                                                            color={theme.colors.primary}
                                                            size={20}
                                                        />
                                                }
                                                {/*<IoMdClose
                                                    size={24}
                                                    color={theme.colors.black}
                                                />*/}
                                            </NotificationContentDiv>

                                            {
                                                openAccordionId === notification.parameterId &&
                                                <>
                                                    <NotificationAccordionDiv>
                                                        <NotificationMessageSpan>
                                                            <NotificationMessageGroupNameSpan>
                                                                &apos;{notification.parameterTextList[1]}&apos;&nbsp;
                                                            </NotificationMessageGroupNameSpan>
                                                            그룹에 가입신청을 했어요.<br/>
                                                            수락할까요?
                                                        </NotificationMessageSpan>
                                                        <SpacerComponent height={12}/>
                                                        <NotificationRequestActionDiv>
                                                            <NotificationRequestActionButtonDiv>
                                                                <FaRegCircle
                                                                    size={24}
                                                                    color={theme.colors.green}
                                                                />
                                                            </NotificationRequestActionButtonDiv>
                                                            <NotificationRequestActionButtonDiv
                                                                onClick={() => disagreeGroupJoinRequest(notification.id, notification.parameterId)}
                                                            >
                                                                <IoMdClose
                                                                    size={28}
                                                                    color={theme.colors.red}
                                                                />
                                                            </NotificationRequestActionButtonDiv>
                                                        </NotificationRequestActionDiv>
                                                    </NotificationAccordionDiv>
                                                </>
                                            }
                                        </>
                                    )
                                }
                            </NotificationDiv>
                        )
                    })
                }
            </BodyDiv>
        </AppLayoutComponent>
    );
};

export default NotificationPage;


