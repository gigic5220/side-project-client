import React, {FC, useRef, useState} from "react";
import styled from "styled-components";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import {useMutation} from "@tanstack/react-query";
import {callApi} from "@/api/CustomedAxios";
import {useAlert} from "@/hooks/useAlert";
import {useRouter} from "next/router";
import SpacerComponent from "@/components/common/SpacerComponent";
import Image from "next/image";
import DefaultProfileImage from "@/public/default_profile_image.png";
import {IoMdAdd} from "react-icons/io";
import {theme} from "@/styles/theme";

const BodyDiv = styled.div`
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

const ProfileImageItemTitleP = styled.p`
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

const GroupCreatePage: FC = () => {
    const router = useRouter()

    const [groupName, setGroupName] = useState('');
    const [nickName, setNickName] = useState('');
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null)

    const {openAlert} = useAlert()

    const {
        mutateAsync: postGroup,
        isPending: postGroupLoading
    } = useMutation({
        mutationFn: () => callApi('post', '/group', {
            'name': groupName,
            'fileUrl': fileUrl,
            'nickName': nickName
        }),
        onSuccess: () => {
            openAlert({
                type: 'alert',
                message: '그룹을 만들었어요. 그룹초대코드가 생성되었어요.',
                onClickClose: () => router.push('/')
            })
        }
    });

    const {
        mutateAsync: postFile,
        isPending: postFileLoading
    } = useMutation({
        mutationFn: (formData: FormData) => callApi('post', '/upload', formData),
        onSuccess: (result) => {
            console.log(result);
        }
    });

    const uploadFile = async (file: string | Blob) => {
        const formData = new FormData();
        formData.append('file', file);
        const uploadResponse = await postFile(formData)
        if (uploadResponse?.status === 201) {
            const fileUrl = uploadResponse.data.url;
            setFileUrl(fileUrl);
        }
    };

    const handleClickProfileImage = () => {
        fileRef.current?.click()
    }

    return (
        <AppLayoutComponent
            isShowHeader
            bottomFloatingButtonComponent={
                <CommonButtonComponent
                    borderRadius={'none'}
                    content={'그룹 만들기'}
                    onClicked={postGroup}
                    isLoading={postGroupLoading}
                />
            }
        >
            <BodyDiv>
                <PageTitleComponent
                    title={'그룹 만들기'}
                    subTitle={'아래 정보들을 입력해 주세요'}
                />
                <SpacerComponent height={20}/>
                <CommonInputComponent
                    title={'그룹 이름'}
                    isRequired
                    value={groupName}
                    onChange={(value: string) => setGroupName(value)}
                    maxLength={10}
                    placeholder={'그룹 이름'}
                />
                <SpacerComponent height={40}/>
                <CommonInputComponent
                    title={'이 그룹에서 사용할 닉네임'}
                    isRequired
                    value={nickName}
                    onChange={(value: string) => setNickName(value)}
                    maxLength={10}
                    placeholder={'닉네임'}
                />
                <SpacerComponent height={40}/>
                <ProfileImageUploadDiv>
                    <ProfileImageItemTitleP>
                        이 그룹에서 사용할 프로필 이미지
                    </ProfileImageItemTitleP>
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
                    </DefaultProfileImageDiv>
                    <input
                        style={{display: 'none'}}
                        ref={fileRef}
                        type="file"
                        onChange={(e) => uploadFile(e.target.files ? e.target.files[0] : '')}
                    />
                    <SpacerComponent height={12}/>
                    <ProfileImageDescribeSpan>
                        프로필 이미지를 등록하지 않으면,<br/>
                        위 기본 이미지로 적용됩니다.
                    </ProfileImageDescribeSpan>
                </ProfileImageUploadDiv>
                <SpacerComponent height={150}/>
            </BodyDiv>
        </AppLayoutComponent>
    );
};

export default GroupCreatePage;


