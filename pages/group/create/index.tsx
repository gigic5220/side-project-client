import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {useGroupCreatePage} from "@/hooks/group/hooks";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import {GroupDetailProfileImageComponent} from "@/pages/group/[id]";
import BottomFloatingButtonComponent from "@/components/common/BottomFloatingButtonComponent";

const GroupCreatePage: FC = () => {

    const {
        fileRef,
        groupNameInputValue, onChangeGroupNameInputValue,
        nickNameInputValue, onChangeNickNameInputValue,
        fileUrlInputValue,
        isCreateGroupLoading,
        handleClickCreateButton, handleClickUploadButton,
        isFileUploadLoading, handleFileInputOnChangeFile,
        checkCreateFormValid
    } = useGroupCreatePage();

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <SpacerComponent height={20}/>
            <PageTitleComponent
                title={'그룹 만들기'}
            />
            <SpacerComponent height={20}/>
            <CommonInputComponent
                title={'그룹 이름'}
                isRequired
                value={groupNameInputValue}
                onChange={onChangeGroupNameInputValue}
                maxLength={10}
                placeholder={'그룹 이름'}
            />
            <SpacerComponent height={30}/>
            <CommonInputComponent
                title={'이 그룹에서 사용할 닉네임'}
                isRequired
                value={nickNameInputValue}
                onChange={onChangeNickNameInputValue}
                maxLength={10}
                placeholder={'닉네임'}
            />
            <SpacerComponent height={40}/>
            <GroupDetailProfileImageComponent
                handleClickUploadButton={handleClickUploadButton}
                isFileUploadLoading={isFileUploadLoading}
                fileRef={fileRef}
                fileUrlInputValue={fileUrlInputValue}
                handleFileInputOnChangeFile={handleFileInputOnChangeFile}
            />
            <BottomFloatingButtonComponent
                disabled={!checkCreateFormValid()}
                borderRadius={''}
                content={'만들기'}
                onClicked={handleClickCreateButton}
                isLoading={isCreateGroupLoading}
            />
        </AppLayoutComponent>
    );
};

export default GroupCreatePage;


