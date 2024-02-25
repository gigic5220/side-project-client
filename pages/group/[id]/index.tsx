import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {useRouter} from "next/router";
import {useGroupDetail} from "@/hooks/group/hooks";
import GroupFormComponent from "@/components/group/GroupFormComponent";

const GroupDetailPage: FC = () => {
    const router = useRouter()
    const {id} = router.query
    const groupId: string = typeof id === 'string' ? id : ''

    const {
        myGroup, myGroupLoading, postFileLoading, putGroupLoading, deleteGroupLoading,
        isFormEdited, fileRef,
        groupNameInputValue, onChangeGroupNameInputValue,
        nickNameInputValue, onChangeNickNameInputValue,
        fileUrlInputValue,
        onChangeFile,
        handleClickProfileImageDiv, handleClickSubmitButton, handleClickCopyInviteCodeIcon, handleClickDeleteButton
    } = useGroupDetail({
        groupId: groupId
    });

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <GroupFormComponent
                pageType={'update'}
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
                handleClickCopyInviteCodeIcon={handleClickCopyInviteCodeIcon}
                isFormEdited={isFormEdited}
                onDelete={handleClickDeleteButton}
                onDeleteLoading={deleteGroupLoading}
            />
        </AppLayoutComponent>
    );
};

export default GroupDetailPage;


