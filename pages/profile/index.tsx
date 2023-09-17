import AppLayout from "@/components/layout/AppLayout";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import styled from "styled-components";
import {useAddFile, useGetFile, useUploadFileToS3} from "@/query/fileHooks";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ProfileImageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ImageOuterBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;

  img {
    border: 3px solid #534747;
    border-radius: 8px;
  }
`

const EmptyImageBox = styled.div`
  width: 150px;
  height: 150px;
  border: 3px solid #534747;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Profile = () => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [profileImageUrl, setProfileImageUrl] = useState<string>('')
    const uploadProfileImage = async (file: string | Blob) => {
        const formData = new FormData();
        formData.append('file', file);
        const s3UploadResponse = await uploadFileToS3Mutation(formData)
        if (s3UploadResponse?.status === 201) {
            const s3FileUrl = s3UploadResponse.data.data.url
            const addFileResponse = await addFileMutation({type: 'profileImage', url: s3FileUrl})
            if (addFileResponse?.status === 201) {
                fetchGetFile()
            }
        }

    };

    const {
        mutateAsync: uploadFileToS3Mutation
    } = useUploadFileToS3()

    const {
        mutateAsync: addFileMutation
    } = useAddFile()

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
        if (!!getFileResponseData) {
            setProfileImageUrl(getFileResponseData?.data?.data?.url)
        }
    }, [getFileResponseData])

    const handleClickProfileImage = () => {
        fileRef.current?.click()
    }

    return (
        <AppLayout
            isShowHeader={true}
        >
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
                                        opacity: 0.5,
                                        bottom: '10px',
                                        right: '10px'
                                    }}
                                    color={'#534747'}
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
                                    color={'#534747'}
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
        </AppLayout>
    )
}

export default Profile