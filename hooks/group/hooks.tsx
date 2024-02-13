import {useMutation, useQuery} from "@tanstack/react-query";
import {callGetMyGroup, callGetMyGroupList} from "@/repository/groupRepository";
import {callApi} from "@/api/CustomedAxios";
import React, {useEffect, useRef, useState} from "react";
import {useUser} from "@/hooks/useUser";
import {useAlert} from "@/hooks/useAlert";
import {useRouter} from "next/router";


type UseGroupFormProps = {
    groupId: string | null;
}
export const useGroupDetail = (props: UseGroupFormProps) => {
    const {
        groupId
    } = props;

    const router = useRouter()
    const user = useUser();
    const [groupNameInputValue, setGroupNameInputValue] = useState<string>('');
    const [nickNameInputValue, setNickNameInputValue] = useState<string>('');
    const [fileUrlInputValue, setFileUrlInputValue] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null)
    const originGroupName = useRef(groupNameInputValue);
    const originNickName = useRef(nickNameInputValue);
    const originFileUrl = useRef(fileUrlInputValue);
    const [isGroupDetailLoaded, setIsGroupDetailLoaded] = useState(false);
    const [isFormEdited, setIsFormEdited] = useState(false);

    const {openAlert} = useAlert()

    const {
        myGroup,
        myGroupLoading
    } = useGetMyGroup(
        groupId as string,
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
                onClickClose: () => router.push('/')
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
                onClickClose: () => router.push('/')
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

    const handleClickSubmitButton = () => {
        if (myGroup) {
            if (putGroupLoading || !groupId || !groupNameInputValue || !nickNameInputValue || !fileUrlInputValue) return;
            putGroup({
                groupId,
                groupNameInputValue,
                nickNameInputValue,
                fileUrlInputValue
            });
        } else {
            if (postGroupLoading || !groupNameInputValue || !nickNameInputValue || !fileUrlInputValue) return;
            postGroup({
                groupNameInputValue,
                nickNameInputValue,
                fileUrlInputValue
            });
        }
    }

    useEffect(() => {
        if (myGroup && !isGroupDetailLoaded) {
            const myGroupUserAssociation: GroupUserAssociation | undefined = myGroup.groupUserAssociations.find(groupUserAssociations => groupUserAssociations.userId.toString() === user?.id.toString())
            setGroupNameInputValue(myGroup.name)
            originGroupName.current = myGroup.name
            setNickNameInputValue(myGroupUserAssociation?.nickName ?? '')
            originNickName.current = myGroupUserAssociation?.nickName ?? ''
            setFileUrlInputValue(myGroupUserAssociation?.fileUrl ?? null)
            originFileUrl.current = myGroupUserAssociation?.fileUrl ?? null
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
        myGroup, myGroupLoading, postFileLoading, postGroupLoading, putGroupLoading,
        isFormEdited, fileRef,
        groupNameInputValue, nickNameInputValue, fileUrlInputValue,
        onChangeGroupNameInputValue, onChangeNickNameInputValue, onChangeFile,
        handleClickProfileImageDiv, handleClickSubmitButton
    }
}

export const useGetMyGroupList = () => {
    const {
        data: myGroupList,
        isLoading: myGroupListLoading,
        isError: myGroupListError,
    } = useQuery<Group[]>({
        queryKey: ['myGroupList'],
        queryFn: callGetMyGroupList
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
        isLoading: myGroupLoading,
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