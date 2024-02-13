import React, {FC, useEffect, useRef, useState} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {useAlert} from "@/hooks/useAlert";
import {useRouter} from "next/router";
import {useGetMyGroup, usePutGroup, useUploadFile} from "@/hooks/group/hooks";
import SpacerComponent from "@/components/common/SpacerComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import CircledUserPhotoListComponent from "@/components/group/CircledUserPhotoListComponent";
import {MdContentCopy} from "react-icons/md";
import {theme} from "@/styles/theme";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import Image from "next/image";
import DefaultProfileImage from "@/public/default_profile_image.png";
import {IoMdAdd} from "react-icons/io";
import BottomFloatingButtonComponent from "@/components/common/BottomFloatingButtonComponent";
import styled from "styled-components";
import {copyTextToClipboard} from "@/util/common";
import {useSnackbar} from "@/hooks/useSnackbar";
import {useUser} from "@/hooks/useUser";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";

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

const GroupDetailPage: FC = () => {
    const router = useRouter()
    const user = useUser();
    const {id} = router.query
    const groupId: string | null = typeof id === 'string' ? id : null

    const isUpdatePage = !!groupId

    const [groupName, setGroupName] = useState('')
    const [nickName, setNickName] = useState('')
    const [fileUrl, setFileUrl] = useState<string | null>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    const [isGroupDetailLoaded, setIsGroupDetailLoaded] = useState(false);

    const prevGroupName = useRef(groupName);
    const prevNickName = useRef(nickName);
    const prevFileUrl = useRef(fileUrl);

    const [isEdited, setIsEdited] = useState(false);

    const {openAlert} = useAlert()
    const {openSnackbar} = useSnackbar()

    const {
        uiGroup,
        myGroupLoading
    } = useGetMyGroup(
        groupId as string,
        !!groupId,
        (group: Group) => {
            return {
                ...group,
                groupUserAssociations: group?.groupUserAssociations.filter((groupUserAssociation) => {
                    return groupUserAssociation.userId.toString() !== user?.id.toString()
                }) ?? [],
                me: group?.groupUserAssociations.find((groupUserAssociation) => {
                    return groupUserAssociation.userId.toString() === user?.id.toString()
                })
            }
        }
    )

    /*const {
        postGroup,
        postGroupLoading
    } = usePostGroup(
        () => {
            openAlert({
                type: 'alert',
                message: '그룹을 만들었어요. 그룹초대코드가 생성되었어요.',
                onClickClose: () => router.push('/')
            })
        }
    )
    const createGroup = async () => {
        if (postGroupLoading || !groupName || !nickName || !fileUrl) return;
        const response = await postGroup({
            groupName,
            nickName,
            fileUrl
        });
        if (response?.status === 201) {
            openAlert({
                type: 'alert',
                message: '그룹을 만들었어요. 그룹초대코드가 생성되었어요.',
                onClickClose: () => router.push('/')
            })
        }
    }*/

    const {
        putGroup,
        putGroupLoading
    } = usePutGroup(
        () => {
            openAlert({
                type: 'alert',
                message: '그룹을 만들었어요. 그룹초대코드가 생성되었어요.',
                onClickClose: () => router.push('/')
            })
        }
    )
    const updateGroup = async () => {
        if (postGroupLoading || !groupId || !groupName || !nickName || !fileUrl) return;
        const response = await putGroup({
            groupId,
            groupName,
            nickName,
            fileUrl
        });
        if (response?.status === 201) {
            openAlert({
                type: 'alert',
                message: '그룹을 만들었어요. 그룹초대코드가 생성되었어요.',
                onClickClose: () => router.push('/')
            })
        }
    }

    const {
        postFile,
        postFileLoading
    } = useUploadFile()

    const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : ''
        const formData = new FormData();
        formData.append('file', file);
        const uploadResponse = await postFile(formData)
        if (uploadResponse?.status === 201) {
            setFileUrl(uploadResponse.data.url);
        }
    };

    const handleClickProfileImage = () => {
        fileRef.current?.click()
    }


    const showInviteCodeCopyCompleteSnackbar = () => {
        openSnackbar('초대코드가 복사되었어요')
    }


    useEffect(() => {
        if (uiGroup && !isGroupDetailLoaded) {
            setGroupName(uiGroup.name)
            prevGroupName.current = uiGroup.name
            setNickName(uiGroup.me?.nickName ?? '')
            prevNickName.current = uiGroup.me?.nickName ?? ''
            setFileUrl(uiGroup.me?.fileUrl ?? null)
            prevFileUrl.current = uiGroup.me?.fileUrl ?? null
            setIsGroupDetailLoaded(true)
        }
    }, [uiGroup])

    useEffect(() => {
        if (groupName !== prevGroupName.current || nickName !== prevNickName.current || fileUrl !== prevFileUrl.current) {
            setIsEdited(true);
        } else {
            setIsEdited(false);
        }
    }, [groupName, nickName, fileUrl]);

    return (
        <AppLayoutComponent
            isShowHeader
        >
            {
                myGroupLoading ?
                    <LoadingSpinnerComponent
                        isFullScreen
                    /> :
                    <>
                        <SpacerComponent height={24}/>
                        <PageTitleComponent
                            title={`나의 그룹`}
                        />
                        <SpacerComponent height={20}/>
                        <GroupDetailFormItemTitleP>
                            그룹 멤버
                        </GroupDetailFormItemTitleP>
                        {
                            uiGroup?.groupUserAssociations && uiGroup.groupUserAssociations.length > 0 ?
                                <CircledUserPhotoListComponent
                                    userList={uiGroup.groupUserAssociations}
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
                                        초대코드: {uiGroup?.code}
                                        <MdContentCopy
                                            onClick={() =>
                                                copyTextToClipboard(
                                                    uiGroup?.code ?? '',
                                                    showInviteCodeCopyCompleteSnackbar
                                                )
                                            }
                                            size={24}
                                            color={theme.colors.primary}
                                        />
                                    </InviteCodeDiv>
                                </NoMemberDiv>
                        }
                        <SpacerComponent height={20}/>
                        <CommonInputComponent
                            title={'그룹 이름'}
                            isRequired
                            value={groupName}
                            onChange={(value) => setGroupName(value)}
                            maxLength={10}
                            placeholder={'그룹 이름'}
                        />
                        <SpacerComponent height={40}/>
                        <CommonInputComponent
                            title={'이 그룹에서 사용할 닉네임'}
                            isRequired
                            value={nickName}
                            onChange={(value) => setNickName(value)}
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
                                onClick={handleClickProfileImage}
                                $border={fileUrl ? `1px solid ${theme.colors.primary}` : 'none'}
                            >
                                <Image
                                    src={fileUrl ?? DefaultProfileImage.src}
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
                                onChange={uploadFile}
                            />
                            <SpacerComponent height={12}/>
                            <ProfileImageDescribeSpan>
                                프로필 이미지를 등록하지 않으면,<br/>
                                기본 이미지로 적용됩니다.
                            </ProfileImageDescribeSpan>
                        </ProfileImageUploadDiv>
                        <BottomFloatingButtonComponent
                            disabled={!groupName || !nickName || !isEdited}
                            $borderRadius={'none'}
                            content={`그룹 ${isUpdatePage ? '수정하기' : '만들기'}`}
                            //onClicked={createGroup}
                            onClicked={updateGroup}
                            isLoading={postGroupLoading}
                        />
                    </>
            }

        </AppLayoutComponent>
    );
};

export default GroupDetailPage;


