import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {useGroupDetailPage} from "@/hooks/group/hooks";
import GroupFormComponent from "@/components/group/GroupFormComponent";

const GroupCreatePage: FC = () => {

    const {
        postFileLoading, postGroupLoading,
        isFormEdited, fileRef,
        groupNameInputValue, onChangeGroupNameInputValue,
        nickNameInputValue, onChangeNickNameInputValue,
        fileUrlInputValue,
        onChangeFile,
        handleClickProfileImageDiv, handleClickSubmitButton,
        validateForm
    } = useGroupDetailPage({
        pageType: 'create'
    });

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <GroupFormComponent
                pageType={'create'}
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
                validateForm={validateForm}
            />
        </AppLayoutComponent>
    );
};

export default GroupCreatePage;


