import AppLayout from "@/components/layout/AppLayout";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import styled from "styled-components";
import {useAddFile, useGetFile, useUploadFileToS3} from "@/query/fileHooks";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ProfileRadioSelectButtonComponent from "@/components/profile/ProfileRadioSelectButtonComponent";
import {moveElementAnimation} from "@/styles/animations";
import {useAlert} from "@/hooks/useAlert";
import {useGetCurrentUser, useUpdateUser} from "@/query/userHooks";

const ProfileBox = styled.div`
  position: relative;
`

const ProfileInfoAnnounceParagraph = styled.p`
  color: #00DAFD;
`

const ProfileImageBox = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  top: -120px;
`

const ImageOuterBox = styled.div`
  position: relative;
  width: 200px;
  height: 200px;

  img {
    border: 3px solid #7B4DEE;
    border-radius: 8px;
  }
`

const EmptyImageBox = styled.div`
  width: 150px;
  height: 150px;
  border: 3px solid #7B4DEE;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfileInfoBox = styled.div`
  position: relative;
  margin-top: 96px;
  background-color: #3E314D;
  border-radius: 16px;
  padding: 96px 24px 24px 24px;
  z-index: 2;
`

const GenderSelectAreaBox = styled.div`

`

const GenderSelectTitleBox = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

const GenderSelectTitleParagraph = styled.p`
  color: #F4F5FC;
  font-size: 16px;
  font-weight: 700;
`

const SelectedGenderParagraph = styled.p`
  color: #7B4DEE;
  font-size: 16px;
  font-weight: 700;
`

const GenderSelectButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

const AgeSelectAreaBox = styled.div`

`

const AgeSelectTitleBox = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

const AgeSelectTitleParagraph = styled.p`
  color: #F4F5FC;
  font-size: 16px;
  font-weight: 700;
`

const SelectedAgeParagraph = styled.p`
  color: #7B4DEE;
  font-size: 16px;
  font-weight: 700;
`

const AgeSelectButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`

const ProfileSubmitButtonBox = styled.div`
  position: relative;
  margin-top: 24px;
  animation: ${moveElementAnimation('translateY(-70%)', 'translateY(0%)', '1s')};
  z-index: 1;
`

const ProfileSubmitButton = styled.button`
  position: relative;
  width: 100%;
  height: 52px;
  background-color: #7B4DEE;
  color: #FFFFFF;
  border: 3px solid transparent;
  font-size: 20px;
  font-weight: 500;
  border-radius: 8px;
`

const Profile = () => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [hasProfile, setHasProfile] = useState<boolean>(false)
    const [profileImageUrl, setProfileImageUrl] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [age, setAge] = useState<string>('')
    const {openAlert, closeAlert} = useAlert()

    const uploadProfileImage = async (file: string | Blob) => {
        const formData = new FormData();
        formData.append('file', file);
        const s3UploadResponse = await uploadFileToS3Mutation(formData)
        if (s3UploadResponse?.status === 201) {
            const s3FileUrl = s3UploadResponse.data.url
            const addFileResponse = await addFileMutation({type: 'profileImage', url: s3FileUrl})
            if (addFileResponse?.status === 201) {
                fetchGetFile()
            }
        }
    };

    const {
        data: getCurrentUserResponse
    } = useGetCurrentUser(
        {
            enabled: true
        }
    )

    const {
        data: getFileResponseData,
        refetch: fetchGetFile,
    } = useGetFile(
        'profileImage',
        {
            enabled: true
        }
    )

    useEffect(() => {
        const currentUser = getCurrentUserResponse?.data
        setHasProfile(currentUser?.age && currentUser?.gender)
    }, [getCurrentUserResponse])

    useEffect(() => {
        if (!!getFileResponseData) {
            setProfileImageUrl(getFileResponseData?.data?.url)
        }
    }, [getFileResponseData])

    const {
        mutateAsync: uploadFileToS3Mutation
    } = useUploadFileToS3()

    const {
        mutateAsync: addFileMutation
    } = useAddFile()


    const handleClickProfileImage = () => {
        fileRef.current?.click()
    }

    const handleClickProfileSubmitButton = () => {
        openAlert({
            type: 'confirm',
            message: `'${gender === 'male' ? '남자' : gender === 'female' ? '여자' : ''}' 를 선택하셨어요.<br/>성별은 한번 설정하시면 바꿀 수 없어요.<br/>정말 설정하시겠어요?<br/>`,
            onClickClose: closeAlert,
            onClickConfirm: fetchUpdateUserMutation
        })
    }

    const {
        mutateAsync: updateUserMutation,
        isSuccess: isUpdateUserMutationSuccess
    } = useUpdateUser({
        gender: gender,
        age: age
    })

    const fetchUpdateUserMutation = () => {
        updateUserMutation().then()
    }

    return (
        <AppLayout
            isShowHeader={true}
        >
            <ProfileBox>
                <ProfileImageBox>
                    <ImageOuterBox
                        onClick={handleClickProfileImage}
                    >
                        {
                            profileImageUrl ? (
                                <>
                                    <Image
                                        src={profileImageUrl}
                                        alt={'profile image'}
                                        layout={'fill'}
                                        objectFit={'cover'}
                                    />
                                    <FontAwesomeIcon
                                        icon={
                                            icon({name: 'camera'})
                                        }
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            position: 'absolute',
                                            opacity: 0.8,
                                            bottom: '10px',
                                            right: '10px'
                                        }}
                                        color={'#7B4DEE'}
                                    />
                                </>
                            ) : (
                                <EmptyImageBox>
                                    <FontAwesomeIcon
                                        icon={
                                            icon({name: 'camera'})
                                        }
                                        style={{
                                            width: '50px',
                                            height: '50px'
                                        }}
                                        color={'#7B4DEE'}
                                    />
                                </EmptyImageBox>
                            )
                        }
                    </ImageOuterBox>
                </ProfileImageBox>
                <input
                    style={{display: 'none'}}
                    ref={fileRef}
                    type="file"
                    onChange={(e) => uploadProfileImage(e.target.files ? e.target.files[0] : '')}
                />
                <ProfileInfoBox>
                    <ProfileInfoAnnounceParagraph>
                        성별, 연령대만 설정하고 매칭을 시작하세요!
                    </ProfileInfoAnnounceParagraph>
                    <GenderSelectAreaBox>
                        <GenderSelectTitleBox>
                            <GenderSelectTitleParagraph>
                                성별
                            </GenderSelectTitleParagraph>
                            <SelectedGenderParagraph>
                                {
                                    gender === 'male' ? '남' : gender === 'female' ? '여' : ''
                                }
                            </SelectedGenderParagraph>
                        </GenderSelectTitleBox>
                        <GenderSelectButtonBox>
                            <ProfileRadioSelectButtonComponent
                                text={'남'}
                                isSelected={gender === 'male'}
                                onClick={() => setGender('male')}
                            />
                            <ProfileRadioSelectButtonComponent
                                text={'여'}
                                isSelected={gender === 'female'}
                                onClick={() => setGender('female')}
                            />
                        </GenderSelectButtonBox>
                    </GenderSelectAreaBox>
                    <AgeSelectAreaBox>
                        <AgeSelectTitleBox>
                            <AgeSelectTitleParagraph>
                                연령대
                            </AgeSelectTitleParagraph>
                            <SelectedAgeParagraph>
                                {
                                    !!age ? `${age + '대'}` : ''
                                }
                            </SelectedAgeParagraph>
                        </AgeSelectTitleBox>
                        <AgeSelectButtonBox>
                            <ProfileRadioSelectButtonComponent
                                text={'20대'}
                                isSelected={age === '20'}
                                onClick={() => setAge('20')}
                            />
                            <ProfileRadioSelectButtonComponent
                                text={'30대'}
                                isSelected={age === '30'}
                                onClick={() => setAge('30')}
                            />
                            <ProfileRadioSelectButtonComponent
                                text={'40대'}
                                isSelected={age === '40'}
                                onClick={() => setAge('40')}
                            />
                        </AgeSelectButtonBox>
                    </AgeSelectAreaBox>
                </ProfileInfoBox>
                {
                    (!!gender && !!age) &&
                    <ProfileSubmitButtonBox>
                        <ProfileSubmitButton
                            onClick={handleClickProfileSubmitButton}
                        >
                            매칭 프로필 설정하기
                        </ProfileSubmitButton>
                    </ProfileSubmitButtonBox>
                }
            </ProfileBox>
        </AppLayout>
    )
}

export default Profile