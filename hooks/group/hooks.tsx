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
import {useFullScreenLoadingSpinner} from "@/hooks/useFullScreenLoadingSpinner";
import {useDialog} from "@/hooks/useDialog";
import {useCopyToClipboard} from "@/hooks/useCopyToClipboard";
import {UseFileUpload, useFileUpload} from "@/hooks/useFileUpload";

export type UseGroupUpdatePage = {
    myGroupUserAssociationList: GroupUserAssociation[] | undefined;
    myGroupInviteCode: string | undefined;
    isFileUploadLoading: boolean;
    isUpdateGroupLoading: boolean;
    isDeleteGroupLoading: boolean;
    fileRef: React.RefObject<HTMLInputElement>;
    groupNameInputValue: string;
    onChangeGroupNameInputValue: (value: string) => void;
    nickNameInputValue: string;
    onChangeNickNameInputValue: (value: string) => void;
    fileUrlInputValue: string;
    handleFileInputOnChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickUploadButton: () => void;
    handleClickCopyInviteCodeIcon: (inviteCode: string) => void;
    checkUpdateFormValid: () => boolean;
    handleClickUpdateButton: () => void;
    handleClickDeleteButton: () => void;
}

type UseGroupUpdatePageProps = {
    groupId: number;
}
export const useGroupUpdatePage = (props: UseGroupUpdatePageProps): UseGroupUpdatePage => {
    const {
        groupId,
    } = props;

    const router = useRouter()
    const user: User | null = useUser();
    const [groupNameInputValue, setGroupNameInputValue] = useState<string>('');
    const [nickNameInputValue, setNickNameInputValue] = useState<string>('');
    const [fileUrlInputValue, setFileUrlInputValue] = useState<string>('');

    const originGroupName = useRef<string>(groupNameInputValue);
    const originNickName = useRef<string>(nickNameInputValue);
    const originFileUrl = useRef<string>(fileUrlInputValue);
    const [isFormEdited, setIsFormEdited] = useState<boolean>(false);

    const {openAlert} = useAlert()
    const {copyToClipboard} = useCopyToClipboard()

    const {
        fileRef,
        onChangeFile,
        isFileUploadLoading,
        handleClickUploadButton
    }: UseFileUpload = useFileUpload()

    const {
        myGroup,
        myGroupLoading,
    } = useGetMyGroup({
        groupId: groupId,
    })

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

    const onChangeGroupNameInputValue = (value: string) => {
        setGroupNameInputValue(value);
    }

    const onChangeNickNameInputValue = (value: string) => {
        setNickNameInputValue(value);
    }

    const checkUpdateFormValid = () => !!groupNameInputValue && !!nickNameInputValue && !!fileUrlInputValue

    const handleClickUpdateButton = () => {
        if (!checkUpdateFormValid()) return
        putGroup({
            groupId,
            groupName: groupNameInputValue,
            nickName: nickNameInputValue,
            fileUrl: fileUrlInputValue,
        });
    }

    const handleClickDeleteButton = () => deleteGroup(groupId)

    const handleClickCopyInviteCodeIcon = (inviteCode: string) => {
        copyToClipboard(inviteCode)
    }

    const handleFileInputOnChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeFile(event, (fileUrl: string | undefined) => {
            setFileUrlInputValue(fileUrl ?? '')
        })
    }

    useEffect(() => {
        if (myGroup) {
            const myGroupUserAssociation: GroupUserAssociation | undefined = myGroup.groupUserAssociations?.find(groupUserAssociations => groupUserAssociations.userId.toString() === user?.id.toString())
            setGroupNameInputValue(myGroup.name ?? '')
            originGroupName.current = myGroup.name ?? ''
            setNickNameInputValue(myGroupUserAssociation?.nickName ?? '')
            originNickName.current = myGroupUserAssociation?.nickName ?? ''
            setFileUrlInputValue(myGroupUserAssociation?.fileUrl ?? '')
            originFileUrl.current = myGroupUserAssociation?.fileUrl ?? ''
        }
    }, [myGroup])

    useEffect(() => {
        if (groupNameInputValue !== originGroupName.current || nickNameInputValue !== originNickName.current || fileUrlInputValue !== originFileUrl.current) {
            setIsFormEdited(true);
        } else {
            setIsFormEdited(false);
        }
    }, [groupNameInputValue, nickNameInputValue, fileUrlInputValue]);

    useFullScreenLoadingSpinner([myGroupLoading])

    return {
        groupNameInputValue, nickNameInputValue, fileUrlInputValue,
        myGroupUserAssociationList: myGroup?.groupUserAssociations,
        myGroupInviteCode: myGroup?.code,
        isUpdateGroupLoading: putGroupLoading,
        isDeleteGroupLoading: deleteGroupLoading,
        isFileUploadLoading,
        fileRef,
        handleFileInputOnChangeFile,
        handleClickUploadButton,
        onChangeGroupNameInputValue, onChangeNickNameInputValue,
        handleClickCopyInviteCodeIcon, handleClickUpdateButton, handleClickDeleteButton,
        checkUpdateFormValid,
    }
}

export type UseGroupCreatePage = {
    fileRef: React.RefObject<HTMLInputElement>;
    groupNameInputValue: string;
    onChangeGroupNameInputValue: (value: string) => void;
    nickNameInputValue: string;
    onChangeNickNameInputValue: (value: string) => void;
    fileUrlInputValue: string;
    handleFileInputOnChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickCreateButton: () => void;
    handleClickUploadButton: () => void;
    isCreateGroupLoading: boolean;
    isFileUploadLoading: boolean;
    checkCreateFormValid: () => boolean;
}

export const useGroupCreatePage = (): UseGroupCreatePage => {

    const router = useRouter()
    const [groupNameInputValue, setGroupNameInputValue] = useState<string>('');
    const [nickNameInputValue, setNickNameInputValue] = useState<string>('');
    const [fileUrlInputValue, setFileUrlInputValue] = useState<string>('');

    const {openAlert} = useAlert()
    const {copyToClipboard} = useCopyToClipboard()

    const {
        fileRef,
        onChangeFile,
        isFileUploadLoading,
        handleClickUploadButton
    }: UseFileUpload = useFileUpload()

    const {
        postGroup,
        postGroupLoading
    } = usePostGroup(
        () => {
            openAlert({
                type: 'alert',
                message: '그룹을 만들었어요',
                onClickConfirm: () => router.push('/group')
            })
        }
    )

    const onChangeGroupNameInputValue = (value: string) => {
        setGroupNameInputValue(value);
    }

    const onChangeNickNameInputValue = (value: string) => {
        setNickNameInputValue(value);
    }

    const checkCreateFormValid = () => {
        return !!groupNameInputValue && !!nickNameInputValue
    }

    const handleClickCreateButton = () => {
        if (!checkCreateFormValid()) return
        postGroup({
            'name': groupNameInputValue,
            'nickName': nickNameInputValue,
            'fileUrl': fileUrlInputValue,
        });
    }

    const handleClickCopyInviteCodeIcon = (inviteCode: string) => {
        copyToClipboard(inviteCode)
    }

    const handleFileInputOnChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeFile(event, (fileUrl: string | undefined) => {
            setFileUrlInputValue(fileUrl ?? '')
        })
    }

    return {
        groupNameInputValue, nickNameInputValue, fileUrlInputValue,
        isCreateGroupLoading: postGroupLoading,
        isFileUploadLoading,
        fileRef,
        handleFileInputOnChangeFile,
        handleClickUploadButton,
        onChangeGroupNameInputValue, onChangeNickNameInputValue,
        handleClickCreateButton, checkCreateFormValid,
    }
}

export const useGroupJoinPage = () => {

    const router = useRouter()
    const user: User | null = useUser();
    const [inviteCodeInputValue, setInviteCodeInputValue] = useState<string>('');
    const [nickNameInputValue, setNickNameInputValue] = useState<string>('');
    const [fileUrlInputValue, setFileUrlInputValue] = useState<string>('');

    const {openAlert} = useAlert()
    const {
        fileRef,
        onChangeFile,
        isFileUploadLoading,
        handleClickUploadButton
    }: UseFileUpload = useFileUpload()

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

    const onChangeInviteCodeInputValue = (value: string) => {
        setInviteCodeInputValue(value);
    }

    const onChangeNickNameInputValue = (value: string) => {
        setNickNameInputValue(value);
    }

    const checkUpdateFormValid = () => {
        return !!groupList && groupList.length > 0 && !!nickNameInputValue
    }

    const handleFileInputOnChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeFile(event, (fileUrl: string | undefined) => {
            setFileUrlInputValue(fileUrl ?? '')
        })
    }

    const handleClickJoinButton = () => {
        if (!!groupList && groupList.length > 0) {
            postGroupJoinRequest({
                groupId: groupList[0].id,
                fileUrl: fileUrlInputValue,
                nickName: nickNameInputValue,
            });
        }
    }

    return {
        isGroupListLoading: groupListLoading,
        isGroupListFetched: groupListFetched,
        isFileUploadLoading,
        fileUrlInputValue,
        joinTargetGroup: !!groupList && groupList.length > 0 ? groupList[0] : null,
        fileRef, handleFileInputOnChangeFile, handleClickUploadButton,
        inviteCodeInputValue, onChangeInviteCodeInputValue,
        nickNameInputValue, onChangeNickNameInputValue,
        handleClickJoinButton, checkUpdateFormValid
    }
}

export const useGroupPage = () => {
    const router = useRouter()
    const {openDialog, closeDialog} = useDialog();
    const {openSnackbar} = useSnackbar()

    const {
        myGroupList,
        myGroupListLoading,
    } = useGetMyGroupList({});

    const handleClickCreateGroupButton = () => {
        router.push('/group/create')
    }

    const handleClickJoinGroupButton = () => {
        router.push('/group/join')
    }

    const handleClickGroup = (groupId: number) => {
        router.push(`/group/${groupId}`)
    }

    const handleClickCopyInviteCodeIcon = (inviteCode: string) => {
        copyTextToClipboard(inviteCode).then(() => {
            openSnackbar('초대코드가 복사되었어요')
        })
    }

    const handleClickShowInviteCodeDialogButton = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, dialogComponent: React.ReactNode) => {
        event.stopPropagation()
        openDialog({
            children: (
                dialogComponent
            ),
            onClickClose: closeDialog
        })
    }

    useFullScreenLoadingSpinner([myGroupListLoading])

    return {
        myGroupList,
        handleClickCreateGroupButton,
        handleClickJoinGroupButton,
        handleClickShowInviteCodeDialogButton,
        handleClickGroup,
        handleClickCopyInviteCodeIcon
    }
}

type UseGetMyGroupListProps = {
    queryParams?: Record<string, any>;
    enabled?: boolean;
    initialData?: Group[] | undefined;
}
export const useGetMyGroupList = (props: UseGetMyGroupListProps) => {

    const {
        queryParams,
        enabled,
        initialData
    } = props

    const {
        data: myGroupList,
        isFetching: myGroupListLoading,
        isError: myGroupListError,
    } = useQuery<Group[]>({
        queryKey: ['myGroupList', queryParams],
        queryFn: () => callGetMyGroupList(queryParams),
        enabled: !!enabled,
        initialData: initialData
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

type UseGetMyGroupProps = {
    groupId?: number;
    userId?: number;
}

export const useGetMyGroup = (props: UseGetMyGroupProps) => {
    const {
        groupId,
        userId
    } = props

    const {
        data: rawMyGroup,
        isFetching: myGroupLoading,
        isError: myGroupError,
    } = useQuery<Group>({
        queryKey: ['myGroup', groupId],
        queryFn: () => callGetMyGroup(groupId!),
        enabled: !!groupId
    });

    let myGroup = rawMyGroup

    if (!!rawMyGroup && !!userId) {
        myGroup = {
            ...rawMyGroup,
            groupUserAssociations: rawMyGroup.groupUserAssociations.filter((groupUserAssociation) => groupUserAssociation.userId !== userId)
        }
    }

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


export const usePutGroup = (onSuccess: () => void) => {

    type PutGroupParams = {
        groupId: number;
        groupName: string;
        nickName: string;
        fileUrl: string;
    }

    const {
        mutateAsync: putGroup,
        isPending: putGroupLoading
    } = useMutation({
        mutationFn: (params: PutGroupParams) => callApi('put', `/group/${params.groupId}`, {
            'name': params.groupName,
            'fileUrl': params.nickName,
            'nickName': params.fileUrl
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
        mutationFn: (id: number) => callApi('delete', `/group/delete/${id}`,),
        onSuccess: onSuccess
    });

    return {
        deleteGroup, deleteGroupLoading
    }
};


