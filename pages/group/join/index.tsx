import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {useGroupDetail} from "@/hooks/group/hooks";
import GroupFormComponent from "@/components/group/GroupFormComponent";

const GroupCreatePage: FC = () => {

    const {
        postFileLoading, postGroupLoading,
        groupList, groupListLoading, groupListFetched,
        isFormEdited, fileRef,
        inviteCodeInputValue, onChangeInviteCodeInputValue,
        nickNameInputValue, onChangeNickNameInputValue,
        fileUrlInputValue,
        onChangeFile,
        handleClickProfileImageDiv, handleClickSubmitButton,
    } = useGroupDetail({
        groupId: ''
    });

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <GroupFormComponent
                pageType={'join'}
                joinGroup={!!groupList ? groupList[0] : undefined}
                groupListLoading={groupListLoading}
                groupListFetched={groupListFetched}
                postFileLoading={postFileLoading}
                fileRef={fileRef} onChangeFile={onChangeFile}
                inviteCode={inviteCodeInputValue}
                onChangeInviteCode={onChangeInviteCodeInputValue}
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


