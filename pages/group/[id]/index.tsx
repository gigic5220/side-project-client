import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {useRouter} from "next/router";
import {useGroupDetail} from "@/hooks/group/hooks";
import GroupFormComponent from "@/components/group/GroupFormComponent";

const GroupDetailPage: FC = () => {
    const router = useRouter()
    const {id} = router.query
    const groupId: string | null = typeof id === 'string' ? id : null

    const {
        myGroup, myGroupLoading, postFileLoading, putGroupLoading,
        isFormEdited, fileRef,
        groupNameInputValue, onChangeGroupNameInputValue,
        nickNameInputValue, onChangeNickNameInputValue,
        fileUrlInputValue,
        onChangeFile, handleClickProfileImageDiv, handleClickSubmitButton
    } = useGroupDetail({
        groupId: groupId
    });

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <GroupFormComponent
                myGroup={myGroup} myGroupLoading={myGroupLoading} postFileLoading={postFileLoading}
                fileRef={fileRef} onChangeFile={onChangeFile}
                groupName={groupNameInputValue}
                onChangeGroupName={onChangeGroupNameInputValue}
                nickName={nickNameInputValue}
                onChangeNickName={onChangeNickNameInputValue}
                onSubmit={handleClickSubmitButton}
                onSubmitLoading={putGroupLoading}
                fileUrl={fileUrlInputValue}
                handleClickProfileImageDiv={handleClickProfileImageDiv}
                isFormEdited={isFormEdited}
            />
        </AppLayoutComponent>
    );
};

export default GroupDetailPage;


