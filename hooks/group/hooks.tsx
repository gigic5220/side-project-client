import {useMutation, useQuery} from "@tanstack/react-query";
import {callGetMyGroup, callGetMyGroupList} from "@/repository/groupRepository";
import {callApi} from "@/api/CustomedAxios";
import React, {useEffect, useRef, useState} from "react";
import {useUser} from "@/hooks/useUser";
import {useAlert} from "@/hooks/useAlert";
import {useRouter} from "next/router";
import {User} from "@/type/auth/auth";
import {useSnackbar} from "@/hooks/useSnackbar";
import {copyTextToClipboard} from "@/util/common";

type UseGroupDetailProps = {
    groupId: string;
}
export const useGroupDetail = (props: UseGroupDetailProps) => {
    const {
        groupId
    } = props;

    const router = useRouter()
    const user: User | null = useUser();
    const [groupNameInputValue, setGroupNameInputValue] = useState<string>('');
    const [nickNameInputValue, setNickNameInputValue] = useState<string>('');
    const [fileUrlInputValue, setFileUrlInputValue] = useState<string>('');
    const fileRef = useRef<HTMLInputElement>(null)
    const originGroupName = useRef<string>(groupNameInputValue);
    const originNickName = useRef<string>(nickNameInputValue);
    const originFileUrl = useRef<string>(fileUrlInputValue);
    const [isGroupDetailLoaded, setIsGroupDetailLoaded] = useState<boolean>(false);
    const [isFormEdited, setIsFormEdited] = useState<boolean>(false);

    const {openAlert} = useAlert()
    const {openSnackbar} = useSnackbar()

    const {
        myGroup,
        myGroupLoading,
    } = useGetMyGroup(
        groupId,
        !!groupId
    )

    const {
        postGroup,
        postGroupLoading
    } = usePostGroup(
        () => {
            openAlert({
                type: 'alert',
                message: '그룹을 만들었어요!',
                onClickConfirm: () => router.push('/group')
            })
        }
    )

    const {
        putGroup,
        putGroupLoading
    } = usePutGroup(
        () => {
            openAlert({
                type: 'alert',
                message: '그룹이 수정되었어요',
                onClickConfirm: () => router.push('/group')
            })
        }
    )

    const {
        deleteGroup,
        deleteGroupLoading
    } = useDeleteGroup(
        () => {
            openAlert({
                type: 'alert',
                message: '그룹이 삭제되었어요',
                onClickConfirm: () => router.push('/group')
            })
        }
    )

    const {
        postFile,
        postFileLoading
    } = useUploadFile()

    const onChangeGroupNameInputValue = (value: string) => {
        setGroupNameInputValue(value);
    }

    const onChangeNickNameInputValue = (value: string) => {
        setNickNameInputValue(value);
    }

    const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : ''
        const formData = new FormData();
        formData.append('file', file);
        const uploadResponse = await postFile(formData)
        if (uploadResponse?.status === 201) {
            setFileUrlInputValue(uploadResponse.data.url);
        }
    };

    const handleClickProfileImageDiv = () => {
        fileRef.current?.click()
    }

    const validateForm = (
        groupNameInputValue: string,
        nickNameInputValue: string,
        fileUrlInputValue: string,
        groupId: string,
        myGroup: Group | undefined
    ) => {
        if (myGroup) {
            return groupId && groupNameInputValue && nickNameInputValue && fileUrlInputValue;
        } else {
            return groupNameInputValue && nickNameInputValue && fileUrlInputValue;
        }
    }

    const handleClickSubmitButton = () => {
        const isFormValid = validateForm(groupNameInputValue, nickNameInputValue, fileUrlInputValue, groupId, myGroup)
        if (!isFormValid) return
        if (myGroup) {
            putGroup({
                groupId,
                groupNameInputValue,
                nickNameInputValue,
                fileUrlInputValue,
            });
        } else {
            postGroup({
                groupNameInputValue,
                nickNameInputValue,
                fileUrlInputValue
            });
        }
    }

    const handleClickDeleteButton = () => {
        if (myGroup) {
            deleteGroup(groupId)
        }
    }

    const handleClickCopyInviteCodeIcon = (inviteCode: string) => {
        copyTextToClipboard(inviteCode).then(() => {
            openSnackbar('초대코드가 복사되었어요')
        })
    }

    useEffect(() => {
        if (myGroup) {
            const myGroupUserAssociation: GroupUserAssociation | undefined = myGroup.groupUserAssociations.find(groupUserAssociations => groupUserAssociations.userId.toString() === user?.id.toString())
            setGroupNameInputValue(myGroup.name)
            originGroupName.current = myGroup.name
            setNickNameInputValue(myGroupUserAssociation?.nickName ?? '')
            originNickName.current = myGroupUserAssociation?.nickName ?? ''
            setFileUrlInputValue(myGroupUserAssociation?.fileUrl ?? '')
            originFileUrl.current = myGroupUserAssociation?.fileUrl ?? ''
            setIsGroupDetailLoaded(true)
        }
    }, [myGroup])

    useEffect(() => {
        if (groupNameInputValue !== originGroupName.current || nickNameInputValue !== originNickName.current || fileUrlInputValue !== originFileUrl.current) {
            setIsFormEdited(true);
        } else {
            setIsFormEdited(false);
        }
    }, [groupNameInputValue, nickNameInputValue, fileUrlInputValue]);

    return {
        myGroup, myGroupLoading, postFileLoading, postGroupLoading, putGroupLoading, deleteGroupLoading,
        isFormEdited, fileRef,
        groupNameInputValue, nickNameInputValue, fileUrlInputValue,
        onChangeGroupNameInputValue, onChangeNickNameInputValue, onChangeFile,
        handleClickProfileImageDiv, handleClickSubmitButton, handleClickCopyInviteCodeIcon, handleClickDeleteButton
    }
}

export const useGetMyGroupList = () => {
    const {
        data: myGroupList,
        isPending: myGroupListLoading,
        isError: myGroupListError,
    } = useQuery<Group[]>({
        queryKey: ['myGroupList'],
        queryFn: callGetMyGroupList,
    });

    return {
        myGroupList, myGroupListError, myGroupListLoading
    }
};

export const useGetMyGroup = (
    id: string,
    enabled: boolean
) => {
    const {
        data: myGroup,
        isPending: myGroupLoading,
        isError: myGroupError,
    } = useQuery<Group>({
        queryKey: ['myGroup', id],
        queryFn: () => callGetMyGroup(id),
        enabled: enabled
    });

    return {
        myGroup, myGroupLoading, myGroupError
    }
};

type PostGroupParams = {
    groupNameInputValue: string;
    nickNameInputValue: string;
    fileUrlInputValue: string;
}
export const usePostGroup = (onSuccess: () => void) => {
    const {
        mutateAsync: postGroup,
        isPending: postGroupLoading
    } = useMutation({
        mutationFn: (params: PostGroupParams) => {
            return callApi('post', '/group', {
                'name': params.groupNameInputValue,
                'fileUrl': params.fileUrlInputValue,
                'nickName': params.nickNameInputValue
            })
        },
        onSuccess: onSuccess
    });

    return {
        postGroup, postGroupLoading
    }
};

type PutGroupParams = {
    groupId: string;
    groupNameInputValue: string;
    nickNameInputValue: string;
    fileUrlInputValue: string;
}

export const usePutGroup = (onSuccess: () => void) => {
    const {
        mutateAsync: putGroup,
        isPending: putGroupLoading
    } = useMutation({
        mutationFn: (params: PutGroupParams) => callApi('put', `/group/${params.groupId}`, {
            'name': params.groupNameInputValue,
            'fileUrl': params.fileUrlInputValue,
            'nickName': params.nickNameInputValue
        }),
        onSuccess: onSuccess
    });

    return {
        putGroup, putGroupLoading
    }
};

export const useDeleteGroup = (onSuccess: () => void) => {
    const {
        mutateAsync: deleteGroup,
        isPending: deleteGroupLoading
    } = useMutation({
        mutationFn: (id: String) => callApi('delete', `/group/delete/${id}`,),
        onSuccess: onSuccess
    });

    return {
        deleteGroup, deleteGroupLoading
    }
};

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