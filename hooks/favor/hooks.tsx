import React, {useCallback, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {User} from "@/type/auth/auth";
import {useUser} from "@/hooks/useUser";
import {useAlert} from "@/hooks/useAlert";
import {useGetMyGroup, useGetMyGroupList} from "@/hooks/group/hooks";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    callDeleteMyFavor,
    callGetMyFavor,
    callGetMyFavorList,
    callPostMyFavor,
    callPutMyFavor
} from "@/repository/favorRepository";
import {Favor} from "@/type/favor/type";
import {callPutMyFavorUserAssociation} from "@/repository/favorUserAssociationRepository";
import {Swiper} from "swiper/types";
import {useFullScreenLoadingSpinner} from "@/hooks/useFullScreenLoadingSpinner";
import {Group} from "@/type/group/type";


export const useFavorCreatePage = () => {

    const router = useRouter()
    const user: User | null = useUser();
    const [favorTitleInputValue, setFavorTitleInputValue] = useState<string>('');
    const [favorDetailInputValue, setFavorDetailInputValue] = useState<string>('');
    const [isImportant, setIsImportant] = useState<boolean>(false);
    const [selectedGroupId, setSelectedGroupId] = useState<number>();
    const [selectedUserIdList, setSelectedUserIdList] = useState<string[]>([]);

    const {openAlert} = useAlert()

    const {
        myGroup,
        myGroupLoading,
    } = useGetMyGroup({
        groupId: selectedGroupId,
        userId: Number(user?.id)
    })

    const {
        myGroupList,
        myGroupListLoading,
    } = useGetMyGroupList({})

    const {
        postFavor,
        postFavorLoading
    } = usePostFavor(
        () => {
            openAlert({
                type: 'alert',
                message: 'FAVOR를 만들었어요!',
                onClickConfirm: () => router.push('/favor')
            })
        }
    )

    const onChangeFavorTitleInputValue = (value: string) => {
        setFavorTitleInputValue(value);
    }

    const onChangeFavorDetailInputValue = (value: string) => {
        setFavorDetailInputValue(value);
    }

    const handleCheckImportanceCheckBox = () => {
        setIsImportant(!isImportant);
    }

    const handleClickGroup = (groupId: number) => {
        setSelectedGroupId(groupId)
    }

    const handleClickGroupMember = (userId: string) => {
        if (selectedUserIdList.includes(userId)) {
            const removedSelectedUserIdList = selectedUserIdList.filter(selectedUserId => selectedUserId !== userId)
            setSelectedUserIdList(removedSelectedUserIdList);
        } else {
            const pushedSelectedUserIdList = [...selectedUserIdList, userId]
            setSelectedUserIdList(pushedSelectedUserIdList);
        }
    }

    const handleClickCreateButton = () => {
        postFavor({
            favorTitleInputValue,
            favorDetailInputValue,
            selectedGroupId,
            selectedUserIdList,
            isImportant
        });
    }

    return {
        myGroup, myGroupLoading,
        myGroupList, myGroupListLoading,
        isImportant,
        selectedGroupId, handleClickGroup,
        selectedUserIdList, handleClickGroupMember,
        favorTitleInputValue, favorDetailInputValue,
        onChangeFavorTitleInputValue, onChangeFavorDetailInputValue,
        handleClickCreateButton, handleCheckImportanceCheckBox,
        postFavorLoading
    }
}

export const useFavorUpdatePage = () => {
    const router = useRouter()
    const user: User | null = useUser();
    const [favorTitleInputValue, setFavorTitleInputValue] = useState<string>('');
    const [favorDetailInputValue, setFavorDetailInputValue] = useState<string>('');
    const originFavorTitle = useRef<string>(favorTitleInputValue);
    const originFavorDetail = useRef<string>(favorDetailInputValue);
    const [isImportant, setIsImportant] = useState<boolean>(false);
    const [isFormEdited, setIsFormEdited] = useState<boolean>(false);
    const [selectedGroupId, setSelectedGroupId] = useState<number>();
    const [selectedUserIdList, setSelectedUserIdList] = useState<string[]>([]);

    const {openAlert} = useAlert()

    const {
        myGroup,
        myGroupLoading,
    } = useGetMyGroup({
        groupId: selectedGroupId,
        userId: Number(user?.id),
    })

    const {
        myGroupList,
        myGroupListLoading,
    } = useGetMyGroupList({})

    const {
        myFavor,
        myFavorLoading,
    } = useGetMyFavor({
        id: Number(router.query.id),
        enabled: !!Number(router.query.id)
    })

    const {
        putFavor,
        putFavorLoading
    } = usePutFavor(
        () => {
            openAlert({
                type: 'alert',
                message: '그룹이 수정되었어요',
                onClickConfirm: () => router.push('/favor')
            })
        }
    )

    const {
        deleteFavor,
        deleteFavorLoading
    } = useDeleteFavor(
        () => {
            openAlert({
                type: 'alert',
                message: 'FAVOR가 삭제되었어요',
                onClickConfirm: () => router.push('/favor')
            })
        }
    )

    const onChangeFavorTitleInputValue = (value: string) => {
        setFavorTitleInputValue(value);
    }

    const onChangeFavorDetailInputValue = (value: string) => {
        setFavorDetailInputValue(value);
    }

    const handleCheckImportanceCheckBox = () => {
        setIsImportant(!isImportant);
    }

    const handleClickGroup = (groupId: number) => {
        setSelectedGroupId(groupId)
    }

    const handleClickGroupMember = (userId: string) => {
        if (selectedUserIdList.includes(userId)) {
            const removedSelectedUserIdList = selectedUserIdList.filter(selectedUserId => selectedUserId !== userId)
            setSelectedUserIdList(removedSelectedUserIdList);
        } else {
            const pushedSelectedUserIdList = [...selectedUserIdList, userId]
            setSelectedUserIdList(pushedSelectedUserIdList);
        }
    }

    const isFormValid = () => {
        return !!router.query.id && !!favorTitleInputValue && !!favorDetailInputValue;
    }

    const handleClickUpdateButton = () => {
        if (!isFormValid()) return
        putFavor({
            id: Number(router.query.id),
            params: {
                favorTitleInputValue,
                favorDetailInputValue,
                selectedGroupId,
                selectedUserIdList,
                isImportant
            }
        })
    }

    const handleClickDeleteButton = () => {
        deleteFavor({id: Number(router.query.id)})
    }

    useEffect(() => {
        if (myFavor) {
            setFavorTitleInputValue(myFavor.title)
            originFavorTitle.current = myFavor.title
            setFavorDetailInputValue(myFavor?.detail ?? '')
            originFavorDetail.current = myFavor?.detail ?? ''
            setIsImportant(myFavor?.isImportant ?? false)
            setSelectedGroupId(myFavor.groupId)
        }
    }, [myFavor])

    useEffect(() => {
        if (favorTitleInputValue !== originFavorTitle.current || favorDetailInputValue !== originFavorDetail.current) {
            setIsFormEdited(true);
        } else {
            setIsFormEdited(false);
        }
    }, [favorTitleInputValue, favorDetailInputValue]);

    return {
        myGroup, myGroupLoading,
        myGroupList, myGroupListLoading,
        myFavor, myFavorLoading,
        isImportant,
        selectedGroupId, handleClickGroup,
        selectedUserIdList, handleClickGroupMember,
        isUpdateFavorLoading: putFavorLoading,
        isDeleteFavorLoading: deleteFavorLoading,
        isFormEdited,
        isFormValid,
        favorTitleInputValue, favorDetailInputValue,
        onChangeFavorTitleInputValue, onChangeFavorDetailInputValue,
        handleClickUpdateButton, handleClickDeleteButton, handleCheckImportanceCheckBox
    }
}

type UseFavorPageProps = {
    myGroupListServerSideData?: Group[]
}

export const useFavorPage = (props: UseFavorPageProps) => {

    const router = useRouter()

    const [selectedGroupId, setSelectedGroupId] = useState<number>();
    const [selectedFavorType, setSelectedFavorType] = useState<'received' | 'sent'>('received');

    const {
        myGroupList,
        myGroupListLoading,
    } = useGetMyGroupList({
        enabled: false,
        initialData: props.myGroupListServerSideData
    })

    const {
        myFavorList,
        myFavorListLoading,
        refetchMyFavorList
    } = useGetMyFavorList(
        selectedFavorType,
        selectedGroupId,
        !!selectedGroupId
    )

    const {
        putFavorUserAssociation,
    } = usePutFavorUserAssociation(selectedFavorType, selectedGroupId)


    useEffect(() => {
        const groupList = props.myGroupListServerSideData || myGroupList;
        if (!!groupList && groupList.length > 0) {
            setSelectedGroupId(groupList[0].id);
        }
    }, [myGroupList, props.myGroupListServerSideData])

    const handleClickFavorTypeTab = (type: 'received' | 'sent') => {
        if (type === selectedFavorType) return;
        setSelectedFavorType(type);
    }

    const handleClickFavorCompleteStamp = useCallback(async (favorUserAssociationId: number, isComplete: boolean) => {
        await putFavorUserAssociation({
            id: favorUserAssociationId,
            isComplete: isComplete
        })
        refetchMyFavorList()
    }, [putFavorUserAssociation, refetchMyFavorList])

    const handleClickFavor = (favorId: number) => {
        router.push(`/favor/${favorId}`)
    }

    const onSwiperSlideChange = (swiper: Swiper) => {
        if (!!myGroupList && myGroupList.length > 0) {
            const activeIndex: number = swiper.activeIndex;
            setSelectedGroupId(myGroupList[activeIndex].id)
        }
    }

    useFullScreenLoadingSpinner([myGroupListLoading])

    useEffect(() => {
        refetchMyFavorList()
    }, [selectedGroupId])

    return {
        myGroupList, myFavorList, selectedFavorType,
        myFavorListLoading,
        onSwiperSlideChange,
        handleClickFavorTypeTab, handleClickFavorCompleteStamp, handleClickFavor
    }
}

type UseGetMyFavorProps = {
    id: number;
    enabled: boolean;
}

export const useGetMyFavor = (props: UseGetMyFavorProps) => {


    const {
        id,
        enabled
    } = props;

    const {
        data: myFavor,
        isFetching: myFavorLoading,
        isError: myFavorError,
    } = useQuery<Favor>({
        queryKey: ['myFavor', id],
        queryFn: () => callGetMyFavor(id),
        enabled: enabled
    });

    return {
        myFavor, myFavorLoading, myFavorError
    }
};

export const usePostFavor = (onSuccess: () => void) => {
    const {
        mutateAsync: postFavor,
        isPending: postFavorLoading
    } = useMutation({
        mutationFn: callPostMyFavor,
        onSuccess: onSuccess
    });

    return {
        postFavor, postFavorLoading
    }
};

export const usePutFavor = (onSuccess: () => void) => {
    const {
        mutateAsync: putFavor,
        isPending: putFavorLoading
    } = useMutation({
        mutationFn: callPutMyFavor,
        onSuccess: onSuccess
    });

    return {
        putFavor, putFavorLoading
    }
};

export const useDeleteFavor = (onSuccess: () => void) => {
    const {
        mutateAsync: deleteFavor,
        isPending: deleteFavorLoading
    } = useMutation({
        mutationFn: callDeleteMyFavor,
        onSuccess: onSuccess
    });

    return {
        deleteFavor, deleteFavorLoading
    }
}

export const useGetMyFavorList = (type: string, groupId: number | undefined, enabled: boolean) => {
    const {
        data: myFavorList,
        isFetching: myFavorListLoading,
        refetch: refetchMyFavorList
    } = useQuery<Favor[]>({
        queryKey: ['myFavorList', type, groupId],
        queryFn: () => callGetMyFavorList(type, groupId),
        enabled: enabled,
    });

    return {
        myFavorList, myFavorListLoading, refetchMyFavorList
    }
};

export const usePutFavorUserAssociation = (favorType: string, groupId: number | undefined) => {
    const queryClient = useQueryClient()
    const {
        mutateAsync: putFavorUserAssociation,
        isPending: putFavorUserAssociationLoading
    } = useMutation({
        mutationFn: callPutMyFavorUserAssociation,
        onMutate: (callPutMyFavorUserAssociationParam) => {
            const prevMyFavorList = queryClient.getQueryData(['myFavorList', favorType, groupId]);
            queryClient.setQueryData(['myFavorList', favorType, groupId], (old: Favor[]) => {
                return old.map((favor) => {
                    return {
                        ...favor,
                        favorUserAssociations: favor.favorUserAssociations.map((favorUserAssociation) => {
                            if (favorUserAssociation.id === callPutMyFavorUserAssociationParam.id) {
                                return {
                                    ...favorUserAssociation,
                                    isComplete: callPutMyFavorUserAssociationParam.isComplete
                                }
                            } else {
                                return favorUserAssociation
                            }
                        })
                    }
                })
            })

            return {prevMyFavorList}
        },
        onError: (error, callPutMyFavorUserAssociationParam, context) => {
            queryClient.setQueryData(['myFavorList', favorType, groupId], context?.prevMyFavorList)
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['myFavorList', favorType, groupId]})
        }
    });

    return {
        putFavorUserAssociation, putFavorUserAssociationLoading
    }
};
