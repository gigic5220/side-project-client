import styled from "styled-components";
import React from "react";
import {GoDotFill} from "react-icons/go";
import {theme} from "@/styles/theme";
import CircledUserPhotoComponent from "@/components/common/CircledUserPhotoComponent";
import {MdOutlineClear, MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp} from "react-icons/md";
import SpacerComponent from "@/components/common/SpacerComponent";
import {LoadingSpinnerComponent} from "@/components/common/LoadingSpinnerComponent";
import {FaRegCircle} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";

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
  align-items: center;
`

const NotificationMessageDotDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const NotificationMessageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`

const NotificationRemoveIconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`


const NotificationMessageEmphasizeSpan = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({theme}) => theme.fontColors.primary};
`

const NotificationMessageSpan = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.fontColors.primary};
  text-align: center;
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

type NotificationComponentProps = {
    type: string;
    id: number;
    parameterId: number;
    parameterImage: string;
    parameterTextList: string[];
    handleClickNotification: (type: string, id?: number) => void;
    handleClickAcceptGroupJoinRequest: (notificationId: number, groupId: number) => void;
    acceptGroupJoinRequestLoading: boolean;
    handleClickRejectGroupJoinRequest: (notificationId: number, groupId: number) => void;
    rejectGroupJoinRequestLoading: boolean;
    handleClickRemoveNotification: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => void;
    openAccordionId: number | null;
}

const NotificationComponent = (props: NotificationComponentProps) => {

    const {
        type
    } = props

    return (
        <NotificationDiv>
            {
                type === 'groupJoinRequest' &&
                <GroupJoinRequestNotificationComponent
                    {...props}
                />
            }
            {
                type === 'favor' &&
                <FavorNotificationComponent
                    {...props}
                />
            }
        </NotificationDiv>
    )
}

export default NotificationComponent

const GroupJoinRequestNotificationComponent = (props: NotificationComponentProps) => {

    const {
        type,
        id,
        parameterId,
        parameterImage,
        parameterTextList,
        handleClickNotification,
        handleClickAcceptGroupJoinRequest,
        acceptGroupJoinRequestLoading,
        handleClickRejectGroupJoinRequest,
        rejectGroupJoinRequestLoading,
        openAccordionId
    } = props

    return (
        <>
            <NotificationContentDiv
                onClick={() => handleClickNotification(type, id)}
            >
                <NotificationMessageDotDiv>
                    <GoDotFill
                        size={24}
                        color={theme.colors.secondary}
                    />
                </NotificationMessageDotDiv>
                <NotificationMessageDiv>
                    <CircledUserPhotoComponent imageUrl={parameterImage}/>
                    <NotificationMessageEmphasizeSpan>
                        {parameterTextList[0]}
                    </NotificationMessageEmphasizeSpan>
                    <NotificationMessageSpan>
                        님의 가입신청
                    </NotificationMessageSpan>
                </NotificationMessageDiv>
                {
                    openAccordionId !== id ?
                        <MdOutlineKeyboardDoubleArrowDown
                            color={theme.colors.primary}
                            size={20}
                        /> : <MdOutlineKeyboardDoubleArrowUp
                            color={theme.colors.primary}
                            size={20}
                        />
                }
            </NotificationContentDiv>
            {
                openAccordionId === id &&
                <>
                    <NotificationAccordionDiv>
                        <NotificationMessageSpan>
                            <NotificationMessageGroupNameSpan>
                                &apos;{parameterTextList[1]}&apos;&nbsp;
                            </NotificationMessageGroupNameSpan>
                            그룹에<br/>가입신청을 했어요.<br/>
                            수락할까요?
                        </NotificationMessageSpan>
                        <SpacerComponent height={12}/>
                        <NotificationRequestActionDiv>
                            <NotificationRequestActionButtonDiv
                                onClick={() => handleClickAcceptGroupJoinRequest(id, parameterId)}
                            >
                                {
                                    acceptGroupJoinRequestLoading ?
                                        <LoadingSpinnerComponent/> :
                                        <FaRegCircle
                                            size={24}
                                            color={theme.colors.green}
                                        />
                                }
                            </NotificationRequestActionButtonDiv>
                            <NotificationRequestActionButtonDiv
                                onClick={() => handleClickRejectGroupJoinRequest(id, parameterId)}
                            >
                                {
                                    rejectGroupJoinRequestLoading ?
                                        <LoadingSpinnerComponent/> :
                                        <IoMdClose
                                            size={28}
                                            color={theme.colors.red}
                                        />
                                }
                            </NotificationRequestActionButtonDiv>
                        </NotificationRequestActionDiv>
                    </NotificationAccordionDiv>
                </>
            }
        </>
    )
}

const FavorNotificationComponent = (props: NotificationComponentProps) => {

    const {
        type,
        id,
        parameterTextList,
        handleClickNotification,
        handleClickRemoveNotification
    } = props

    return (
        <>
            <NotificationContentDiv
                onClick={() => handleClickNotification(type)}
            >
                <NotificationMessageDotDiv>
                    <GoDotFill
                        size={24}
                        color={theme.colors.secondary}
                    />
                </NotificationMessageDotDiv>
                <NotificationMessageDiv>
                    <NotificationMessageSpan>
                        <NotificationMessageEmphasizeSpan>
                            &apos;{parameterTextList[0]}&apos;&nbsp;
                        </NotificationMessageEmphasizeSpan>
                        그룹의<br/>FAVOR가 추가되었어요.
                    </NotificationMessageSpan>
                </NotificationMessageDiv>
                <NotificationRemoveIconDiv
                    onClick={(event) => handleClickRemoveNotification(event, id)}
                >
                    <MdOutlineClear
                        size={24}
                        color={theme.colors.red}
                    />
                </NotificationRemoveIconDiv>
            </NotificationContentDiv>
        </>
    )
}