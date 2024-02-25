import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {User} from "@/type/auth/auth";
import {useUser} from "@/hooks/useUser";
import {useAlert} from "@/hooks/useAlert";
import {useGetMyGroup, useGetMyGroupList} from "@/hooks/group/hooks";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    callDeleteMyFavor,
    callGetMyFavor,
    callGetMyFavorList,
    callPostMyFavor,
    callPutMyFavor
} from "@/repository/favorRepository";
import {Favor, FavorUserAssociation} from "@/type/favor/type";

type UseFavorDetailProps = {
    favorId: string;
}
export const useFavorDetail = (props: UseFavorDetailProps) => {
    const {
        favorId
    } = props;

    const router = useRouter()
    const user: User | null = useUser();
    const [favorTitleInputValue, setFavorTitleInputValue] = useState<string>('');
    const [favorDetailInputValue, setFavorDetailInputValue] = useState<string>('');
    const originFavorTitle = useRef<string>(favorTitleInputValue);
    const originFavorDetail = useRef<string>(favorDetailInputValue);
    const [isImportant, setIsImportant] = useState<boolean>(false);
    const [isFavorDetailLoaded, setIsFavorDetailLoaded] = useState<boolean>(false);
    const [isFormEdited, setIsFormEdited] = useState<boolean>(false);
    const [selectedGroupId, setSelectedGroupId] = useState<string>();
    const [selectedUserIdList, setSelectedUserIdList] = useState<string[]>([]);

    const {openAlert} = useAlert()

    const {
        myGroup,
        myGroupLoading,
    } = useGetMyGroup(
        selectedGroupId!
    )

    const {
        myGroupList,
        myGroupListLoading,
    } = useGetMyGroupList()

    const {
        myFavor,
        myFavorLoading,
    } = useGetMyFavor(
        favorId!,
        !!favorId
    )

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

    const handleClickGroup = (groupId: string) => {
        setSelectedGroupId(groupId)
    }

    const handleClickGroupMember = (userId: string) => {
        if (selectedUserIdList.includes(userId)) return
        const pushedSelectedUserIdList = [...selectedUserIdList, userId]
        setSelectedUserIdList(pushedSelectedUserIdList);
    }

    const validateForm = (
        favorTitleInputValue: string,
        favorDetailInputValue: string,
        favorId: string,
        myFavor: Favor | undefined
    ) => {
        if (myFavor) {
            return favorId && favorTitleInputValue && favorDetailInputValue;
        } else {
            return favorTitleInputValue && favorDetailInputValue;
        }
    }

    const handleClickSubmitButton = () => {
        const isFormValid = validateForm(
            favorTitleInputValue,
            favorDetailInputValue,
            favorId,
            myFavor
        )
        if (!isFormValid) return
        if (myFavor) {
            putFavor({
                id: favorId,
                params: {
                    favorTitleInputValue,
                    favorDetailInputValue,
                    selectedGroupId,
                    selectedUserIdList,
                    isImportant
                }
            })
        } else {
            postFavor({
                favorTitleInputValue,
                favorDetailInputValue,
                selectedGroupId,
                selectedUserIdList,
                isImportant
            });
        }
    }

    const handleClickDeleteButton = () => {
        if (myFavor) {
            deleteFavor(favorId)
        }
    }


    useEffect(() => {
        if (myFavor) {
            const myFavorUserAssociation: FavorUserAssociation | undefined = myFavor.favorUserAssociations.find(favorUserAssociations => favorUserAssociations.userId.toString() === user?.id.toString())
            setFavorTitleInputValue(myFavor.title)
            originFavorTitle.current = myFavor.title
            setFavorDetailInputValue(myFavor?.detail ?? '')
            originFavorDetail.current = myFavor?.detail ?? ''
            setIsFavorDetailLoaded(true)
            setIsImportant(myFavor?.isImportant ?? false)
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
        postFavorLoading, putFavorLoading, deleteFavorLoading,
        isFormEdited,
        favorTitleInputValue, favorDetailInputValue,
        onChangeFavorTitleInputValue, onChangeFavorDetailInputValue,
        handleClickSubmitButton, handleClickDeleteButton, handleCheckImportanceCheckBox
    }
}

export const useGetMyFavor = (
    id: string,
    enabled: boolean
) => {
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

export const useGetMyFavorList = (type: string) => {
    const {
        data: myFavorList,
        isFetching: myFavorListLoading
    } = useQuery<Favor[]>({
        queryKey: ['myFavorList', type],
        queryFn: () => callGetMyFavorList(type),
    });

    return {
        myFavorList, myFavorListLoading
    }
};