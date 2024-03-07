import React from 'react';
import styled from "styled-components";
import {theme} from "@/styles/theme";
import SpacerComponent from "@/components/common/SpacerComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import CircledUserPhotoListComponent from "@/components/group/CircledUserPhotoListComponent";
import {MdContentCopy} from "react-icons/md";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import Image from "next/image";
import DefaultProfileImage from "@/public/default_profile_image.png";
import {IoMdAdd} from "react-icons/io";
import {LoadingSpinnerComponent} from "@/components/common/LoadingSpinnerComponent";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import {Group} from "@/type/group/type";

const ProfileImageUploadDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

type DefaultProfileImageDivProps = {
    $border: string;
}

const DefaultProfileImageDiv = styled.div<DefaultProfileImageDivProps>`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 24px;
  overflow: hidden;
  border: ${({$border}) => $border};
`

const NoMemberDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border: 1px solid ${({theme}) => theme.colors.primary};
  padding: 12px;
  border-radius: 24px;
`

const NoMemberAnnounceDiv = styled.div`
  font-size: 14px;
  color: ${({theme}) => theme.fontColors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const DefaultProfileImagePlusIconDiv = styled.div`
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
  width: 45px;
  height: 45px;
  background-color: ${({theme}) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 36px;
`

const GroupDetailFormItemTitleP = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: ${({theme}) => theme.fontColors.primary};
  align-self: start;
`

const ProfileImageDescribeSpan = styled.span`
  text-align: center;
  font-size: 14px;
  color: ${({theme}) => theme.fontColors.primary};
`

const ProfileImagePostLoadingDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InviteCodeDiv = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.fontColors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

type BottomFloatingButtonDivProps = {
    $isUpdatePage: boolean;
}

const BottomFloatingButtonDiv = styled.div<BottomFloatingButtonDivProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: grid;
  grid-template-columns: ${({$isUpdatePage}) => $isUpdatePage ? '100px 1fr' : '1fr'};
`

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


type GroupFormComponentProps = {
    pageType: string;
    myGroup?: Group | undefined;
    joinGroup?: Group | undefined;
    groupListLoading?: boolean;
    groupListFetched?: boolean;
    postFileLoading: boolean;
    fileRef: React.RefObject<HTMLInputElement>;
    onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inviteCode?: string;
    onChangeInviteCode?: (value: string) => void;
    groupName?: string;
    onChangeGroupName?: (value: string) => void;
    nickName: string;
    onChangeNickName: (value: string) => void;
    fileUrl: string;
    onSubmit: () => void;
    onSubmitLoading: boolean;
    validateForm: () => boolean;
    handleClickProfileImageDiv: () => void;
    handleClickCopyInviteCodeIcon?: (value: string) => void;
    onDelete?: () => void;
    onDeleteLoading?: boolean;
}

const GroupFormComponent = (props: GroupFormComponentProps) => {

    const {
        pageType,
        joinGroup, groupListLoading, groupListFetched,
        myGroup, postFileLoading,
        fileRef, onChangeFile,
        inviteCode,
        onChangeInviteCode,
        groupName,
        onChangeGroupName,
        nickName,
        onChangeNickName,
        fileUrl,
        onSubmit,
        onSubmitLoading,
        validateForm,
        handleClickProfileImageDiv,
        handleClickCopyInviteCodeIcon,
        onDelete,
        onDeleteLoading,
    } = props;

    const getPageTitle = (pageType: string): string => {
        if (pageType === 'create') {
            return '그룹 만들기'
        } else if (pageType === 'update') {
            return '그룹 수정하기'
        } else if (pageType === 'join') {
            return '그룹 가입하기'
        } else {
            return ''
        }
    }


    return (
        <>
            <SpacerComponent height={24}/>
            <PageTitleComponent
                title={getPageTitle(pageType)}
            />
            <SpacerComponent height={20}/>
            {
                myGroup &&
                <>
                    <GroupDetailFormItemTitleP>
                        그룹 멤버
                    </GroupDetailFormItemTitleP>
                    {
                        myGroup.groupUserAssociations && myGroup.groupUserAssociations.length > 0 ?
                            <CircledUserPhotoListComponent
                                userList={myGroup.groupUserAssociations}
                                photoWidth={50}
                                photoHeight={50}
                                isShowNickName
                            /> :
                            <NoMemberDiv>
                                <NoMemberAnnounceDiv>
                                    아직 멤버가 없어요<br/>
                                    초대코드를 복사해서 전달해주세요!
                                </NoMemberAnnounceDiv>
                                <InviteCodeDiv>
                                    초대코드: {myGroup?.code}
                                    <MdContentCopy
                                        onClick={() => handleClickCopyInviteCodeIcon?.(myGroup?.code ?? '')}
                                        size={24}
                                        color={theme.colors.primary}
                                    />
                                </InviteCodeDiv>
                            </NoMemberDiv>
                    }
                </>
            }
            <SpacerComponent height={20}/>
            {
                pageType === 'join' && (
                    <>
                        {
                            inviteCode !== undefined && onChangeInviteCode && (
                                <CommonInputComponent
                                    title={'그룹 초대코드'}
                                    isRequired
                                    value={inviteCode}
                                    onChange={onChangeInviteCode}
                                    maxLength={6}
                                    placeholder={'그룹 초대코드 (6자리 영문, 숫자)'}
                                />
                            )
                        }
                        <SpacerComponent height={30}/>
                        <JoinGroupDiv>
                            <JoinGroupTitleSpan>
                                가입할 그룹:
                            </JoinGroupTitleSpan>
                            <JoinGroupNameDiv>
                                {
                                    groupListLoading ? (
                                        <LoadingSpinnerComponent/>
                                    ) : (
                                        groupListFetched ? (
                                                !!joinGroup ?
                                                    <JoinGroupNameSpan>
                                                        {joinGroup.name}
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
                    </>
                )
            }
            {
                (pageType == 'update' || pageType == 'create') && (groupName != undefined && !!onChangeGroupName) &&
                <CommonInputComponent
                    title={'그룹 이름'}
                    isRequired
                    value={groupName}
                    onChange={onChangeGroupName}
                    maxLength={10}
                    placeholder={'그룹 이름'}
                />
            }
            <SpacerComponent height={30}/>
            <CommonInputComponent
                title={'이 그룹에서 사용할 닉네임'}
                isRequired
                value={nickName}
                onChange={onChangeNickName}
                maxLength={10}
                placeholder={'닉네임'}
            />
            <SpacerComponent height={40}/>
            <ProfileImageUploadDiv>
                <GroupDetailFormItemTitleP>
                    이 그룹에서 사용할 프로필 이미지
                </GroupDetailFormItemTitleP>
                <SpacerComponent height={12}/>
                <DefaultProfileImageDiv
                    onClick={handleClickProfileImageDiv}
                    $border={!!fileUrl ? `1px solid ${theme.colors.primary}` : 'none'}
                >
                    <Image
                        src={!!fileUrl ? fileUrl : DefaultProfileImage.src}
                        alt={'default_profile_image'}
                        width={200}
                        height={200}
                    />
                    {
                        !fileUrl &&
                        <DefaultProfileImagePlusIconDiv>
                            <IoMdAdd
                                size={24}
                                color={theme.colors.white}
                            />
                        </DefaultProfileImagePlusIconDiv>
                    }
                    {
                        postFileLoading &&
                        <ProfileImagePostLoadingDiv>
                            <LoadingSpinnerComponent/>
                        </ProfileImagePostLoadingDiv>
                    }
                </DefaultProfileImageDiv>
                <input
                    style={{display: 'none'}}
                    ref={fileRef}
                    type="file"
                    onChange={onChangeFile}
                />
                <SpacerComponent height={12}/>
                <ProfileImageDescribeSpan>
                    프로필 이미지를 등록하지 않으면,<br/>
                    기본 이미지로 적용됩니다.
                </ProfileImageDescribeSpan>
            </ProfileImageUploadDiv>
            <BottomFloatingButtonDiv
                $isUpdatePage={!!myGroup}
            >
                {
                    myGroup && onDelete &&
                    <CommonButtonComponent
                        $backgroundColor={'#ec6060'}
                        $borderRadius={''}
                        content={'삭제하기'}
                        onClicked={onDelete}
                        isLoading={onDeleteLoading}
                    />
                }
                <CommonButtonComponent
                    disabled={!validateForm()}
                    $borderRadius={''}
                    content={`${getPageTitle(pageType)}`}
                    onClicked={onSubmit}
                    isLoading={onSubmitLoading}
                />
            </BottomFloatingButtonDiv>
        </>
    )

}

export default GroupFormComponent