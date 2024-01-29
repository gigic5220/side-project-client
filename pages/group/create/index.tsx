import React, {FC, useState} from "react";
import styled from "styled-components";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import AppLayout from "@/components/layout/AppLayout";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import {useMutation} from "@tanstack/react-query";
import {callApi} from "@/api/CustomedAxios";
import {useAlert} from "@/hooks/useAlert";
import {useRouter} from "next/router";

const BodyDiv = styled.div`
`

const GroupCreatePage: FC = () => {
    const router = useRouter()

    const [groupName, setGroupName] = useState('');

    const changeGroupName = (value: string) => {
        setGroupName(value);
    }

    const {openAlert} = useAlert()

    const {
        mutateAsync: postGroup,
        isPending: postGroupLoading
    } = useMutation({
        mutationFn: () => callApi('post', '/group', {'name': groupName}),
        onSuccess: () => {
            openAlert({
                type: 'alert',
                message: '그룹을 만들었어요. 그룹초대코드가 생성되었어요.',
                onClickClose: () => router.push('/')
            })
        }
    });

    return (
        <AppLayout
            isShowHeader
        >
            <BodyDiv>
                <PageTitleComponent
                    title={'그룹 만들기'}
                />
                <CommonInputComponent
                    value={groupName}
                    onChange={changeGroupName}
                    maxLength={10}
                    placeholder={'그룹 이름'}
                />
                <CommonButtonComponent
                    content={'그룹 만들기'}
                    onClicked={postGroup}
                    isLoading={postGroupLoading}
                />
            </BodyDiv>
        </AppLayout>
    );
};

export default GroupCreatePage;


