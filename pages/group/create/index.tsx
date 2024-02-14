import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {useGroupDetail} from "@/hooks/group/hooks";
import GroupFormComponent from "@/components/group/GroupFormComponent";

const GroupCreatePage: FC = () => {

    const {
        postFileLoading, postGroupLoading,
        isFormEdited, fileRef,
        groupNameInputValue, onChangeGroupNameInputValue,
        nickNameInputValue, onChangeNickNameInputValue,
        fileUrlInputValue,
        onChangeFile,
        handleClickProfileImageDiv, handleClickSubmitButton
    } = useGroupDetail({
        groupId: ''
    });

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <GroupFormComponent
                postFileLoading={postFileLoading}
                fileRef={fileRef} onChangeFile={onChangeFile}
                groupName={groupNameInputValue}
                onChangeGroupName={onChangeGroupNameInputValue}
                nickName={nickNameInputValue}
                onChangeNickName={onChangeNickNameInputValue}
                onSubmitLoading={postGroupLoading}
                fileUrl={fileUrlInputValue}
                isFormEdited={isFormEdited}
                onSubmit={handleClickSubmitButton}
                handleClickProfileImageDiv={handleClickProfileImageDiv}
            />
        </AppLayoutComponent>
    );
};

export default GroupCreatePage;


