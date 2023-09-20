import AppLayout from "@/components/layout/AppLayout";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import styled from "styled-components";
import {callGetFile, useAddFile, useUploadFileToS3} from "@/query/fileQueryFn";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ProfileRadioSelectButtonComponent from "@/components/profile/ProfileRadioSelectButtonComponent";
import {moveElementAnimation} from "@/styles/animations";
import {useAlert} from "@/hooks/useAlert";
import {callGetCurrentUser, useUpdateUser} from "@/query/userQueryFn";
import {useQuery} from "react-query";
import {useVerifyPhone} from "@/hooks/useVerifyPhone";
import {REGEX} from "@/util/regex";

const ProfileBox = styled.div`
  position: relative;
`

const ProfileInfoAnnounceParagraph = styled.p`
  color: #FED674;
`

const ProfileImageBox = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  top: -90px;
`

const ImageOuterBox = styled.div`
  position: relative;
  width: 170px;
  height: 170px;
  display: flex;
  justify-content: center;

  img {
    border: 3px solid #6728FF;
    border-radius: 8px;
  }
`

const EmptyImageBox = styled.div`
  width: 150px;
  height: 150px;
  border: 3px solid #6728FF;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
`

const ProfileInfoBox = styled.div`
  position: relative;
  margin-top: 60px;
  padding: 96px 24px 44px 24px;
`

const GenderSelectAreaBox = styled.div`

`

const GenderSelectTitleBox = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`


const GenderSelectButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background-color: #262626;
  height: 60px;
  border-radius: 12px;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`

const AgeSelectAreaBox = styled.div`

`

const AgeSelectButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  background-color: #262626;
  height: 60px;
  border-radius: 12px;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`

const ProfileSubmitButtonBox = styled.div`
  width: 90%;
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${moveElementAnimation('translateX(-50%) translateY(-70%)', 'translateX(-50%) translateY(0%)', '1s')};
  z-index: 1;
`

const ProfileSubmitButton = styled.button`
  position: relative;
  width: 100%;
  height: 52px;
  background-color: #6728FF;
  color: #FFFFFF;
  border: 3px solid transparent;
  font-size: 20px;
  font-weight: 500;
  border-radius: 8px;
`

const ProfileInfoItemBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  gap: 32px;
`

const ProfileInfoTitleParagraph = styled.p`
  color: #F4F5FC;
  font-size: 20px;
  font-weight: 700;
`

const ProfileInfoValueParagraph = styled.p`
  color: #6728FF;
  font-size: 20px;
  font-weight: 700;
  justify-self: end;
`

const OpenDialogButtonBox = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  gap: 20px;
`

const OpenDialogButton = styled.button`
  position: relative;
  width: 100%;
  height: 52px;
  background-color: #6728FF;
  color: #FFFFFF;
  border: 3px solid transparent;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
`

type UserInfoType = {
    id: number;
    userId: string;
    phone: string;
    age: string;
    gender: string;
    password: string;
    isActive: boolean;
}

const Profile = () => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [userInfo, setUserInfo] = useState<UserInfoType>({
        id: 0,
        userId: '',
        phone: '',
        age: '',
        gender: '',
        password: '',
        isActive: false
    })
    const [originPhone, setOriginPhone] = useState<string>('')
    const [profileImageUrl, setProfileImageUrl] = useState<string>('')
    const {openAlert, closeAlert} = useAlert()

    const uploadProfileImage = async (file: string | Blob) => {
        const formData = new FormData();
        formData.append('file', file);
        const s3UploadResponse = await uploadFileToS3Mutation(formData)
        if (s3UploadResponse?.status === 201) {
            const s3FileUrl = s3UploadResponse.data.url
            const addFileResponse = await addFileMutation({type: 'profileImage', url: s3FileUrl})
            if (addFileResponse?.status === 201) {
                setProfileImageUrl(s3FileUrl)
            }
        }
    };

    const {
        refetch: fetchGetCurrentUser,
    } = useQuery(
        ['getCurrentUser'],
        callGetCurrentUser,
        {
            enabled: false
        }
    )

    const getCurrentUser = async () => {
        const {data: axiosResponse} = await fetchGetCurrentUser()
        if (axiosResponse?.status !== 200) return null
        return axiosResponse.data
    }

    const {
        refetch: fetchGetFile,
    } = useQuery(
        ['getCurrentUser'],
        () => callGetFile('profileImage'),
        {
            enabled: false
        }
    )

    const getProfileImage = async () => {
        const {data: axiosResponse} = await fetchGetFile()
        if (axiosResponse?.status !== 200) return null
        return axiosResponse.data
    }

    const setUserProfile = async () => {
        const user = await getCurrentUser()
        setOriginPhone(user.phone)
        setUserInfo(user)
        const profileImage = await getProfileImage()
        setProfileImageUrl(profileImage?.url)
    }

    useEffect(() => {
        setUserProfile()
    }, [])


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
            message: `'${getGenderText()}' 를 선택하셨어요.<br/>성별은 한번 설정하시면 바꿀 수 없어요.<br/>정말 설정하시겠어요?<br/>`,
            onClickClose: closeAlert,
            onClickConfirm: async () => {
                await updateUser()
                closeAlert()
                await setUserProfile()
            }
        })
    }

    const {
        mutateAsync: updateUserMutation,
    } = useUpdateUser(
        userInfo?.id,
        {
            phone: userInfo?.phone,
            gender: userInfo?.gender,
            age: userInfo?.age,
            password: userInfo?.password
        })

    const updateUser = async () => {
        const response = await updateUserMutation()
        return response
    }

    const getGenderText = () => {
        return userInfo?.gender === 'male' ? '남자' : userInfo?.gender === 'female' ? '여자' : ''
    }

    const getAgeText = () => {
        return !!userInfo?.age ? userInfo.age + '대' : ''
    }

    interface ProfileInfoItemComponentProps {
        title: string;
        value: string;
    }

    const ProfileInfoItemComponent = (props: ProfileInfoItemComponentProps) => {
        const {title, value} = props
        return (
            <ProfileInfoItemBox>
                <ProfileInfoTitleParagraph>
                    {title}
                </ProfileInfoTitleParagraph>
                <ProfileInfoValueParagraph>
                    {value}
                </ProfileInfoValueParagraph>
            </ProfileInfoItemBox>
        )
    }

    const {
        phone,
        phoneInitValueRef,
        changePhone,
        phoneVerifyNumber,
        changePhoneVerifyNumber,
        isPhoneDuplicated,
        setIsPhoneDuplicated,
        isPhoneValidate,
        setIsPhoneValidate,
        isPhoneVerified,
        setIsPhoneVerified,
        isPhoneVerifyNumberSent,
        isSendVerifyNumberLoading,
        isGetPhoneDuplicationLoading,
        isShowPhoneVerifyNumberInput,
        isCheckVerifyNumberLoading,
        handleClickGetVerifyNumberButton,
        checkVerifyNumberAndGetStatus
    } = useVerifyPhone({
        phoneInitValue: userInfo?.phone
    })

    useEffect(() => {
        setIsPhoneDuplicated(null)
        setIsPhoneValidate(!!phone ? REGEX.PHONE.test(phone) : null)
    }, [phone])

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
                                        color={'#6728FF'}
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
                                        color={'#6728FF'}
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
                    {
                        !userInfo.isActive &&
                        <ProfileInfoAnnounceParagraph>
                            사진, 성별, 연령대만 설정하시면 매칭 시작!
                        </ProfileInfoAnnounceParagraph>
                    }

                    {
                        userInfo.isActive ? (
                            <ProfileInfoItemComponent
                                title={'성별'}
                                value={getGenderText()}
                            />
                        ) : (
                            <GenderSelectAreaBox>
                                <GenderSelectTitleBox>
                                    <ProfileInfoTitleParagraph>
                                        성별
                                    </ProfileInfoTitleParagraph>
                                    <ProfileInfoValueParagraph>
                                        {getGenderText()}
                                    </ProfileInfoValueParagraph>
                                </GenderSelectTitleBox>
                                <GenderSelectButtonBox>
                                    <ProfileRadioSelectButtonComponent
                                        text={'남자'}
                                        isSelected={userInfo?.gender === 'male'}
                                        onClick={() => setUserInfo({...userInfo, gender: 'male'})}
                                    />
                                    <ProfileRadioSelectButtonComponent
                                        text={'여자'}
                                        isSelected={userInfo?.gender === 'female'}
                                        onClick={() => setUserInfo({...userInfo, gender: 'female'})}
                                    />
                                </GenderSelectButtonBox>
                            </GenderSelectAreaBox>
                        )
                    }
                    <AgeSelectAreaBox>
                        <ProfileInfoItemComponent
                            title={'연령대'}
                            value={getAgeText()}
                        />
                        <AgeSelectButtonBox>
                            <ProfileRadioSelectButtonComponent
                                text={'20대'}
                                isSelected={userInfo?.age === '20'}
                                onClick={() => setUserInfo({...userInfo, age: '20'})}
                            />
                            <ProfileRadioSelectButtonComponent
                                text={'30대'}
                                isSelected={userInfo?.age === '30'}
                                onClick={() => setUserInfo({...userInfo, age: '30'})}
                            />
                            <ProfileRadioSelectButtonComponent
                                text={'40대'}
                                isSelected={userInfo?.age === '40'}
                                onClick={() => setUserInfo({...userInfo, age: '40'})}
                            />
                        </AgeSelectButtonBox>
                    </AgeSelectAreaBox>
                    <OpenDialogButtonBox>
                        <OpenDialogButton
                            onClick={handleClickProfileSubmitButton}
                        >
                            휴대폰번호 변경
                        </OpenDialogButton>
                        <OpenDialogButton
                            onClick={handleClickProfileSubmitButton}
                        >
                            비밀번호 변경
                        </OpenDialogButton>
                    </OpenDialogButtonBox>
                    {/*{
                        userInfo?.isActive &&
                        <PhoneInputAreaBox>
                            <ProfileInfoItemComponent
                                title={'휴대폰번호'}
                                value={'인증완료'}
                            />
                            <JoinStepThreeComponent
                                phone={phone}
                                originPhoneValue={phoneInitValueRef.current}
                                phoneVerifyNumber={phoneVerifyNumber}
                                onChangePhone={changePhone}
                                onChangePhoneVerifyNumber={changePhoneVerifyNumber}
                                onClickGetVerifyNumberButton={handleClickGetVerifyNumberButton}
                                isPhoneDuplicated={isPhoneDuplicated}
                                isPhoneValidate={isPhoneValidate}
                                isPhoneVerifyNumberSent={isPhoneVerifyNumberSent}
                                isShowLoadingSpinnerOnPhoneInputButton={isSendVerifyNumberLoading || isGetPhoneDuplicationLoading}
                                isShowPhoneVerifyNumberInput={isShowPhoneVerifyNumberInput}
                                isCheckVerifyNumberLoading={isCheckVerifyNumberLoading}
                                isPhoneVerified={isPhoneVerified}
                            />
                        </PhoneInputAreaBox>
                    }*/}
                </ProfileInfoBox>
                {
                    (!userInfo?.isActive && userInfo?.gender && userInfo.age && !!profileImageUrl) || (userInfo?.isActive) &&
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