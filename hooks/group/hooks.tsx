import {useMutation, useQuery} from "@tanstack/react-query";
import {
    callGetGroupList,
    callGetMyGroup,
    callGetMyGroupList,
    callPostGroup,
    callPostGroupJoinRequest,
    PostGroupJoinRequestParams,
    PostGroupParams
} from "@/repository/groupRepository";
import {callApi} from "@/api/CustomedAxios";
import React, {useEffect, useRef, useState} from "react";
import {useUser} from "@/hooks/useUser";
import {useAlert} from "@/hooks/useAlert";
import {useRouter} from "next/router";
import {User} from "@/type/auth/auth";
import {useSnackbar} from "@/hooks/useSnackbar";
import {copyTextToClipboard} from "@/util/common";
import {Group, GroupUserAssociation} from "@/type/group/type";

type UseGroupDetailProps = {
    groupId: string;
    pageType: 'join' | 'create' | 'update';
}
export const useGroupDetail = (props: UseGroupDetailProps) => {
    const {
        groupId,
        pageType
    } = props;

    const router = useRouter()
    const user: User | null = useUser();
    const [inviteCodeInputValue, setInviteCodeInputValue] = useState<string>('');
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
        groupId
    )

    const {
        groupList,
        groupListLoading,
        groupListFetched
    } = useGetGroupList(
        {
            inviteCode: inviteCodeInputValue,
        },
        inviteCodeInputValue.length > 5
    )

    const {
        postGroupJoinRequest,
        postGroupJoinRequestLoading
    } = usePostGroupJoinRequest(
        () => {
            openAlert({
                type: 'alert',
                message: '가입을 요청했어요. 그룹장의 수락을 기다려주세요!',
                onClickConfirm: () => router.push('/group')
            })
        }
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

    const onChangeInviteCodeInputValue = (value: string) => {
        setInviteCodeInputValue(value);
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

    const validateForm = () => {
        if (pageType === 'create') {
            return !!groupNameInputValue && !!nickNameInputValue
        } else if (pageType === 'update') {
            return !!myGroup && !!groupNameInputValue && !!nickNameInputValue && isFormEdited
        } else {
            return !!groupList && groupList.length > 0 && !!nickNameInputValue
        }
    }

    const handleClickSubmitButton = () => {
        const isFormValid = validateForm()
        if (!isFormValid) return
        if (pageType === 'create') {
            postGroup({
                name: groupNameInputValue,
                fileUrl: fileUrlInputValue,
                nickName: nickNameInputValue,
            });

        } else if (pageType === 'update') {
            putGroup({
                groupId,
                groupNameInputValue,
                nickNameInputValue,
                fileUrlInputValue,
            });
        } else {
            if (!!groupList && groupList.length > 0) {
                postGroupJoinRequest({
                    groupId: groupList[0].id,
                    fileUrl: fileUrlInputValue,
                    nickName: nickNameInputValue,
                });
            }
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
        myGroup, myGroupLoading,
        postFileLoading, postGroupLoading, postGroupJoinRequestLoading, putGroupLoading, deleteGroupLoading,
        groupList, groupListLoading, groupListFetched,
        isFormEdited, fileRef,
        inviteCodeInputValue, groupNameInputValue, nickNameInputValue, fileUrlInputValue,
        onChangeInviteCodeInputValue, onChangeGroupNameInputValue, onChangeNickNameInputValue, onChangeFile,
        handleClickProfileImageDiv, handleClickSubmitButton, handleClickCopyInviteCodeIcon, handleClickDeleteButton,
        validateForm,
    }
}

export const useGetMyGroupList = (queryParams?: Record<string, any>) => {
    const {
        data: myGroupList,
        isFetching: myGroupListLoading,
        isError: myGroupListError,
    } = useQuery<Group[]>({
        queryKey: ['myGroupList', queryParams],
        queryFn: () => callGetMyGroupList(queryParams)
    });

    return {
        myGroupList, myGroupListError, myGroupListLoading
    }
};

export const useGetGroupList = (queryParams?: Record<string, any>, enabled?: boolean) => {
    const {
        data: groupList,
        isFetching: groupListLoading,
        isError: groupListError,
        isFetched: groupListFetched,
    } = useQuery<Group[]>({
        queryKey: ['groupList', queryParams],
        queryFn: () => callGetGroupList(queryParams),
        enabled: !!enabled
    });

    return {
        groupList, groupListError, groupListLoading, groupListFetched
    }
};

export const useGetMyGroup = (
    id: string
) => {
    const {
        data: myGroup,
        isFetching: myGroupLoading,
        isError: myGroupError,
    } = useQuery<Group>({
        queryKey: ['myGroup', id],
        queryFn: () => callGetMyGroup(id),
        enabled: !!id
    });

    return {
        myGroup, myGroupLoading, myGroupError
    }
};

export const usePostGroupJoinRequest = (onSuccess: () => void) => {
    const {
        mutateAsync: postGroupJoinRequest,
        isPending: postGroupJoinRequestLoading
    } = useMutation({
        mutationFn: (params: PostGroupJoinRequestParams) => {
            return callPostGroupJoinRequest(params)
        },
        onSuccess: onSuccess
    });

    return {
        postGroupJoinRequest, postGroupJoinRequestLoading
    }
};

export const usePostGroup = (onSuccess: () => void) => {
    const {
        mutateAsync: postGroup,
        isPending: postGroupLoading
    } = useMutation({
        mutationFn: (params: PostGroupParams) => {
            return callPostGroup(params)
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