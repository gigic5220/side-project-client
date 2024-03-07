import React, {useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import {callApi} from "@/api/CustomedAxios";

export type UseFileUpload = {
    fileRef: React.RefObject<HTMLInputElement>;
    handleClickUploadButton: () => void;
    isFileUploadLoading: boolean;
    onChangeFile: (event: React.ChangeEvent<HTMLInputElement>, onSuccess?: (fileUrl: string | undefined) => void) => void;
}

export const useFileUpload = (): UseFileUpload => {
    const fileRef = useRef<HTMLInputElement>(null)
    const handleClickUploadButton = () => {
        fileRef.current?.click()
    }

    const {
        postFile,
        postFileLoading
    } = useUploadFile()

    const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>, onSuccess?: (fileUrl: string | undefined) => void) => {
        const file = event.target.files ? event.target.files[0] : ''
        const formData = new FormData();
        formData.append('file', file);
        const uploadResponse = await postFile(formData)
        if (uploadResponse?.status === 201 && !!onSuccess) {
            onSuccess(uploadResponse.data.url)
        }
    }
    return {
        fileRef,
        handleClickUploadButton,
        isFileUploadLoading: postFileLoading,
        onChangeFile
    }
}

export const useUploadFile = () => {
    const {
        mutateAsync: postFile,
        isPending: postFileLoading
    } = useMutation({
        mutationFn: (formData: FormData) => callApi('post', '/upload', formData),
    });

    return {
        postFile, postFileLoading
    }
};
