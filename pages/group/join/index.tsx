import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {useGroupJoinPage} from "@/hooks/group/hooks";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import {LoadingSpinnerComponent} from "@/components/common/LoadingSpinnerComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import {theme} from "@/styles/theme";
import BottomFloatingButtonComponent from "@/components/common/BottomFloatingButtonComponent";
import styled from "styled-components";
import {GroupDetailProfileImageComponent} from "@/pages/group/[id]";

const JoinGroupDiv = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({theme}) => theme.colors.primary};
  height: 30px;
  border-radius: 24px;
  gap: 12px;
  padding: 24px;
`

const JoinGroupTitleSpan = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.fontColors.primary};
`

const JoinGroupNameDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const JoinGroupNameSpan = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${theme.fontColors.secondary};
`

const JoinGroupNotFoundSpan = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${theme.fontColors.secondary};
  text-align: center;
`

const ProfileImageUploadDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const GroupDetailFormItemTitleP = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: ${({theme}) => theme.fontColors.primary};
  align-self: start;
`

const GroupJoinPage: FC = () => {

    const {
        isGroupListLoading,
        isGroupListFetched,
        isFileUploadLoading,
        fileUrlInputValue,
        joinTargetGroup,
        inviteCodeInputValue,
        onChangeInviteCodeInputValue,
        nickNameInputValue,
        onChangeNickNameInputValue,
        fileRef,
        handleClickUploadButton,
        handleFileInputOnChangeFile,
        handleClickJoinButton,
        checkUpdateFormValid
    } = useGroupJoinPage();

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <SpacerComponent height={20}/>
            <PageTitleComponent
                title={'그룹 가입하기'}
            />
            <SpacerComponent height={20}/>
            <CommonInputComponent
                title={'그룹 초대코드'}
                isRequired
                value={inviteCodeInputValue}
                onChange={onChangeInviteCodeInputValue}
                maxLength={6}
                placeholder={'그룹 초대코드 (6자리 영문, 숫자)'}
            />
            <SpacerComponent height={30}/>
            <JoinGroupDiv>
                <JoinGroupTitleSpan>
                    가입할 그룹:
                </JoinGroupTitleSpan>
                <JoinGroupNameDiv>
                    {
                        isGroupListLoading ? (
                            <LoadingSpinnerComponent/>
                        ) : (
                            isGroupListFetched ? (
                                    !!joinTargetGroup ?
                                        <JoinGroupNameSpan>
                                            {joinTargetGroup.name}
                                        </JoinGroupNameSpan> :
                                        <JoinGroupNotFoundSpan>
                                            입력하신 초대코드에<br/>해당하는 그룹이 없어요!
                                        </JoinGroupNotFoundSpan>
                                ) :
                                <JoinGroupNotFoundSpan>
                                    초대코드를 입력해 주세요!
                                </JoinGroupNotFoundSpan>
                        )
                    }
                </JoinGroupNameDiv>
            </JoinGroupDiv>
            <SpacerComponent height={30}/>
            <CommonInputComponent
                title={'이 그룹에서 사용할 닉네임'}
                isRequired
                value={nickNameInputValue}
                onChange={onChangeNickNameInputValue}
                maxLength={10}
                placeholder={'닉네임'}
            />
            <SpacerComponent height={40}/>
            <GroupDetailProfileImageComponent
                handleClickUploadButton={handleClickUploadButton}
                isFileUploadLoading={isFileUploadLoading}
                fileRef={fileRef}
                fileUrlInputValue={fileUrlInputValue}
                handleFileInputOnChangeFile={handleFileInputOnChangeFile}
            />
            <BottomFloatingButtonComponent
                borderRadius={''}
                disabled={!checkUpdateFormValid()}
                content={'가입하기'}
                onClicked={handleClickJoinButton}
            />
        </AppLayoutComponent>
    );
};

export default GroupJoinPage;


