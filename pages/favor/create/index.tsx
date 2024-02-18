import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import FavorFormComponent from "@/components/favor/FavorFormComponent";
import {useFavorDetail} from "@/hooks/favor/hooks";

const FavorCreatePage: FC = () => {

    const {
        myGroup, myGroupLoading,
        myGroupList, myGroupListLoading,
        myFavor, myFavorLoading,
        postFavorLoading, putFavorLoading, deleteFavorLoading,
        isFormEdited,
        selectedUserIdList,
        favorTitleInputValue, favorDetailInputValue,
        onChangeFavorTitleInputValue, onChangeFavorDetailInputValue,
        handleClickSubmitButton, handleClickGroup, handleClickGroupMember,
        handleCheckImportanceCheckBox, isImportant
    } = useFavorDetail({
        favorId: ''
    });

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <FavorFormComponent
                myFavor={myFavor} myFavorLoading={myFavorLoading}
                selectedGroup={myGroup} selectedGroupLoading={myGroupLoading}
                myGroupList={myGroupList} myGroupListLoading={myGroupListLoading}
                selectedUserIdList={selectedUserIdList}
                isFormEdited={isFormEdited}
                favorTitle={favorTitleInputValue}
                onChangeFavorTitle={onChangeFavorTitleInputValue}
                favorDetail={favorDetailInputValue}
                onChangeFavorDetail={onChangeFavorDetailInputValue}
                onSubmit={handleClickSubmitButton}
                onSubmitLoading={postFavorLoading}
                handleClickGroup={handleClickGroup}
                handleClickGroupMember={handleClickGroupMember}
                handleCheckImportanceCheckBox={handleCheckImportanceCheckBox}
                isImportant={isImportant}
            />
        </AppLayoutComponent>
    );
};

export default FavorCreatePage;


