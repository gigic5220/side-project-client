import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {useRouter} from "next/router";
import {UseGroupUpdatePage, useGroupUpdatePage} from "@/hooks/group/hooks";
import CircledUserPhotoListComponent from "@/components/group/CircledUserPhotoListComponent";
import {MdContentCopy} from "react-icons/md";
import {theme} from "@/styles/theme";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import styled from "styled-components";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import Image from "next/image";
import DefaultProfileImage from "@/public/default_profile_image.png";
import {IoMdAdd} from "react-icons/io";
import {LoadingSpinnerComponent} from "@/components/common/LoadingSpinnerComponent";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import {GroupUserAssociation} from "@/type/group/type";

const GroupDetailFormItemTitleP = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: ${({theme}) => theme.fontColors.primary};
  align-self: start;
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

const InviteCodeDiv = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.fontColors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

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

const ProfileImageDescribeSpan = styled.span`
  text-align: center;
  font-size: 14px;
  color: ${({theme}) => theme.fontColors.primary};
`

const BottomFloatingButtonDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
`

const GroupUpdatePage: FC = () => {
    const router = useRouter()
    const groupId: number = Number(router.query.id)

    const {
        myGroupUserAssociationList,
        myGroupInviteCode,
        isFileUploadLoading, isUpdateGroupLoading, isDeleteGroupLoading,
        fileRef,
        groupNameInputValue, onChangeGroupNameInputValue,
        nickNameInputValue, onChangeNickNameInputValue,
        fileUrlInputValue,
        handleFileInputOnChangeFile,
        handleClickUploadButton, handleClickCopyInviteCodeIcon,
        checkUpdateFormValid,
        handleClickUpdateButton, handleClickDeleteButton,
    }: UseGroupUpdatePage = useGroupUpdatePage({
        groupId: groupId
    });

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <SpacerComponent height={20}/>
            <PageTitleComponent
                title={'그룹 수정하기'}
            />
            <SpacerComponent height={20}/>
            <GroupDetailFormItemTitleP>
                그룹 멤버
            </GroupDetailFormItemTitleP>
            <GroupDetailUserListComponent
                myGroupUserAssociationList={myGroupUserAssociationList}
                myGroupInviteCode={myGroupInviteCode}
                handleClickCopyInviteCodeIcon={handleClickCopyInviteCodeIcon}
            />
            <SpacerComponent height={20}/>
            <CommonInputComponent
                title={'그룹 이름'}
                isRequired
                value={groupNameInputValue}
                onChange={onChangeGroupNameInputValue}
                maxLength={10}
                placeholder={'그룹 이름'}
            />
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
            <BottomFloatingButtonDiv>
                <CommonButtonComponent
                    backgroundColor={theme.colors.red}
                    borderRadius={''}
                    content={'삭제하기'}
                    onClicked={handleClickDeleteButton}
                    isLoading={isUpdateGroupLoading}
                />
                <CommonButtonComponent
                    disabled={!checkUpdateFormValid()}
                    borderRadius={''}
                    content={'수정하기'}
                    onClicked={handleClickUpdateButton}
                    isLoading={isDeleteGroupLoading}
                />
            </BottomFloatingButtonDiv>
        </AppLayoutComponent>
    );
};

export default GroupUpdatePage;

type GroupUpdateUserListComponentProps = {
    myGroupUserAssociationList: GroupUserAssociation[] | undefined;
    myGroupInviteCode: string | undefined;
    handleClickCopyInviteCodeIcon: (inviteCode: string) => void;
}

const GroupDetailUserListComponent = (props: GroupUpdateUserListComponentProps) => {
    const {
        myGroupUserAssociationList,
        myGroupInviteCode,
        handleClickCopyInviteCodeIcon
    } = props
    return (
        !!myGroupUserAssociationList && myGroupUserAssociationList.length > 0 ?
            <CircledUserPhotoListComponent
                userList={myGroupUserAssociationList}
                photoWidth={50}
                photoHeight={50}
                isShowNickName
            /> : <NoMemberDiv>
                <NoMemberAnnounceDiv>
                    아직 멤버가 없어요<br/>
                    초대코드를 복사해서 전달해주세요!
                </NoMemberAnnounceDiv>
                <InviteCodeDiv>
                    초대코드: {myGroupInviteCode}
                    <MdContentCopy
                        onClick={() => handleClickCopyInviteCodeIcon?.(myGroupInviteCode ?? '')}
                        size={24}
                        color={theme.colors.primary}
                    />
                </InviteCodeDiv>
            </NoMemberDiv>
    )
}

type GroupDetailProfileImageComponentProps = {
    handleClickUploadButton: () => void;
    isFileUploadLoading: boolean;
    fileRef: React.RefObject<HTMLInputElement>;
    fileUrlInputValue: string | undefined;
    handleFileInputOnChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const GroupDetailProfileImageComponent = (props: GroupDetailProfileImageComponentProps) => {
    const {
        handleClickUploadButton,
        isFileUploadLoading,
        fileRef,
        fileUrlInputValue,
        handleFileInputOnChangeFile
    } = props
    return (
        <ProfileImageUploadDiv>
            <GroupDetailFormItemTitleP>
                이 그룹에서 사용할 프로필 이미지
            </GroupDetailFormItemTitleP>
            <SpacerComponent height={12}/>
            <DefaultProfileImageDiv
                onClick={handleClickUploadButton}
                $border={!!fileUrlInputValue ? `1px solid ${theme.colors.primary}` : 'none'}
            >
                <Image
                    src={!!fileUrlInputValue ? fileUrlInputValue : DefaultProfileImage.src}
                    alt={'default_profile_image'}
                    width={200}
                    height={200}
                />
                {
                    !fileUrlInputValue &&
                    <DefaultProfileImagePlusIconDiv>
                        <IoMdAdd
                            size={24}
                            color={theme.colors.white}
                        />
                    </DefaultProfileImagePlusIconDiv>
                }
                {
                    isFileUploadLoading &&
                    <ProfileImagePostLoadingDiv>
                        <LoadingSpinnerComponent/>
                    </ProfileImagePostLoadingDiv>
                }
            </DefaultProfileImageDiv>
            <input
                style={{display: 'none'}}
                ref={fileRef}
                type="file"
                onChange={handleFileInputOnChangeFile}
            />
            <SpacerComponent height={12}/>
            <ProfileImageDescribeSpan>
                프로필 이미지를 등록하지 않으면,<br/>
                기본 이미지로 적용됩니다.
            </ProfileImageDescribeSpan>
        </ProfileImageUploadDiv>
    )
}

