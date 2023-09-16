import AppLayout from "@/components/layout/AppLayout";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import styled from "styled-components";
import {useAddFile, useGetFile, useUploadFileToS3} from "@/query/fileHooks";

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
    border: 3px solid #FF0000;
    border-radius: 8px;
  }
`

const Profile = () => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [profileImageUrl, setProfileImageUrl] = useState<string>('')
    const uploadProfileImage = async (file: string | Blob) => {
        console.log('file', file)
        const formData = new FormData();
        formData.append('file', file);
        const s3UploadResponse = await uploadFileToS3Mutation(formData)
        if (s3UploadResponse.status === 201) {
            const s3FileUrl = s3UploadResponse.data.data.url
            const addFileResponse = await addFileMutation({type: 'profileImage', url: s3FileUrl})
            console.log('addFileResponse', addFileResponse)
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
            console.log(getFileResponseData?.data?.data?.url)
            setProfileImageUrl(getFileResponseData?.data?.data?.url)
        }
    }, [getFileResponseData])

    const handleClickProfileImage = () => {
        fileRef.current?.click()
    }

    console.log(profileImageUrl)

    return (
        <AppLayout
            isShowHeader={true}
        >
            <ProfileImageBox>
                <ImageOuterBox
                    onClick={handleClickProfileImage}
                >
                    {
                        profileImageUrl &&
                        <Image
                            src={profileImageUrl}
                            alt={'profile image'}
                            layout={'fill'}
                            objectFit={'cover'}
                        />
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