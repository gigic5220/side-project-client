import React from 'react';
import styled from "styled-components";
import SpacerComponent from "@/components/common/SpacerComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/free-mode";
import {FreeMode} from 'swiper/modules';
import CircledUserPhotoListComponent from "@/components/group/CircledUserPhotoListComponent";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import {Group} from "@/type/group/type";
import {Favor} from "@/type/favor/type";
import {theme} from "@/styles/theme";
import {FaCheck} from "react-icons/fa";
import {FaExclamation} from "react-icons/fa6";


const GroupDetailFormItemTitleP = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: ${({theme}) => theme.fontColors.primary};
  align-self: start;
`

const FavorDetailFormImportanceSettingDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const FavorDetailFormImportanceCheckboxDiv = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid ${({theme}) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`

type BottomFloatingButtonDivProps = {
    $$isUpdatePage: boolean;
}

const BottomFloatingButtonDiv = styled.div<BottomFloatingButtonDivProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: grid;
  grid-template-columns: ${({$$isUpdatePage}) => $$isUpdatePage ? '100px 1fr' : '1fr'};
`

const SwiperSlideDiv = styled(SwiperSlide)`
  width: auto;
`

const NoGroupDiv = styled.div`
  font-size: 14px;
  color: ${({theme}) => theme.fontColors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 44px;
  margin: 0 auto;
`

const NoSelectedGroupDiv = styled.div`
  font-size: 14px;
  color: ${({theme}) => theme.fontColors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 73px;
`

type GroupListSwiperElementDivProps = {
    $isSelected: boolean;
}

const GroupListSwiperElementDiv = styled.div<GroupListSwiperElementDivProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  border: 1px solid ${({theme}) => theme.colors.primary};
  padding: 12px;
  background-color: ${({$isSelected, theme}) => $isSelected ? theme.colors.primary : theme.colors.white};
  font-size: 14px;
  color: ${({$isSelected, theme}) => $isSelected ? theme.fontColors.white : theme.fontColors.primary};
`

type GroupListDivProps = {
    $isLoading: boolean | undefined;
}

const GroupListDiv = styled.div<GroupListDivProps>`
  height: 44px;
  display: ${({$isLoading}) => $isLoading ? 'flex' : ''};
  justify-content: ${({$isLoading}) => $isLoading ? 'center' : ''};
  align-items: ${({$isLoading}) => $isLoading ? 'center' : ''};
`

type GroupMemberListDivProps = {
    $isLoading: boolean | undefined;
}

const GroupMemberListDiv = styled.div<GroupMemberListDivProps>`
  height: 73px;
  display: ${({$isLoading}) => $isLoading ? 'flex' : ''};
  justify-content: ${({$isLoading}) => $isLoading ? 'center' : ''};
  align-items: ${({$isLoading}) => $isLoading ? 'center' : ''};
`

type FavorFormComponentProps = {
    selectedGroup?: Group | undefined;
    selectedGroupLoading?: boolean;
    myGroupList?: Group[] | undefined;
    myGroupListLoading?: boolean;
    myFavor?: Favor | undefined;
    myFavorLoading?: boolean;
    selectedUserIdList?: string[];
    handleClickGroup: (groupId: string) => void;
    handleClickGroupMember: (userId: string) => void;
    favorTitle: string;
    onChangeFavorTitle: (value: string) => void;
    favorDetail: string;
    onChangeFavorDetail: (value: string) => void;
    isImportant: boolean;
    onSubmit: () => void;
    onSubmitLoading: boolean;
    isFormEdited: boolean;
    onDelete?: () => void;
    onDeleteLoading?: boolean;
    handleCheckImportanceCheckBox: () => void;
}

const FavorFormComponent = (props: FavorFormComponentProps) => {

    const {
        selectedGroup,
        selectedGroupLoading,
        myGroupList,
        myGroupListLoading,
        myFavor,
        myFavorLoading,
        selectedUserIdList,
        handleClickGroup,
        handleClickGroupMember,
        favorTitle,
        onChangeFavorTitle,
        favorDetail,
        onChangeFavorDetail,
        isImportant,
        onSubmit,
        onSubmitLoading,
        isFormEdited,
        onDelete,
        onDeleteLoading,
        handleCheckImportanceCheckBox
    } = props;

    return (
        <>
            <SpacerComponent height={24}/>
            <PageTitleComponent
                title={`${!!myFavor ? 'FAVOR' : 'FAVOR 만들기'}`}
            />
            <SpacerComponent height={20}/>
            <FavorDetailFormImportanceSettingDiv
                onClick={handleCheckImportanceCheckBox}
            >
                <FavorDetailFormImportanceCheckboxDiv>
                    {
                        isImportant ?
                            <FaCheck
                                size={20}
                                color={theme.colors.secondary}
                            /> : null
                    }
                </FavorDetailFormImportanceCheckboxDiv>
                <FaExclamation
                    size={20}
                    color={theme.colors.secondary}
                />
                <GroupDetailFormItemTitleP>
                    중요한 FAVOR로 설정하기
                </GroupDetailFormItemTitleP>
            </FavorDetailFormImportanceSettingDiv>
            <GroupDetailFormItemTitleP>
                그룹 선택하기
            </GroupDetailFormItemTitleP>
            <GroupListDiv
                $isLoading={myGroupListLoading}
            >
                {
                    myGroupListLoading ?
                        <LoadingSpinnerComponent/> :
                        (
                            myGroupList && myGroupList.length > 0 ?
                                <Swiper
                                    spaceBetween={30}
                                    freeMode={true}
                                    modules={[FreeMode]}
                                    slidesPerView={'auto'}
                                >
                                    {
                                        myGroupList.map((group, index) =>
                                            <SwiperSlideDiv
                                                key={index}
                                                onClick={() => handleClickGroup(group.id.toString())}
                                            >
                                                <GroupListSwiperElementDiv
                                                    $isSelected={selectedGroup?.id.toString() === group.id.toString()}
                                                >
                                                    {group.name}
                                                </GroupListSwiperElementDiv>
                                            </SwiperSlideDiv>
                                        )
                                    }
                                </Swiper> :
                                <NoGroupDiv>
                                    아직 그룹이 없어요<br/>
                                    그룹이 없어도 FAVOR를 만들 수 있어요!
                                </NoGroupDiv>
                        )
                }
            </GroupListDiv>
            <GroupDetailFormItemTitleP>
                멤버 선택하기
            </GroupDetailFormItemTitleP>
            <GroupMemberListDiv
                $isLoading={selectedGroupLoading}
            >
                {
                    selectedGroup ?
                        (
                            selectedGroupLoading ?
                                <LoadingSpinnerComponent/> :
                                (myGroupList && myGroupList.length > 0 && selectedGroup?.groupUserAssociations && selectedGroup?.groupUserAssociations.length > 0) &&
                                <CircledUserPhotoListComponent
                                    onClick={handleClickGroupMember}
                                    isSelected={
                                        (userId: string): boolean => {
                                            return !!selectedUserIdList?.includes(userId)
                                        }
                                    }
                                    userList={selectedGroup.groupUserAssociations}
                                    photoWidth={50}
                                    photoHeight={50}
                                    isShowNickName
                                />
                        ) :
                        <NoSelectedGroupDiv>
                            그룹을 먼저 선택해 주세요
                        </NoSelectedGroupDiv>
                }
            </GroupMemberListDiv>

            <SpacerComponent height={20}/>
            <CommonInputComponent
                title={'할 일'}
                isRequired
                value={favorTitle}
                onChange={onChangeFavorTitle}
                maxLength={10}
                placeholder={'할 일'}
            />
            <SpacerComponent height={40}/>
            <CommonInputComponent
                title={'간단한 내용'}
                value={favorDetail}
                onChange={onChangeFavorDetail}
                maxLength={10}
                placeholder={'간단한 내용'}
            />
            <SpacerComponent height={40}/>
            <BottomFloatingButtonDiv
                $$isUpdatePage={!!myFavor}
            >
                {
                    myFavor && onDelete &&
                    <CommonButtonComponent
                        $backgroundColor={'#ec6060'}
                        $borderRadius={''}
                        content={'삭제하기'}
                        onClicked={onDelete}
                        isLoading={onDeleteLoading}
                        $boxShadow={''}
                    />
                }
                <CommonButtonComponent
                    disabled={!favorTitle || !favorDetail || (!!true && !isFormEdited)}
                    $borderRadius={''}
                    content={`FAVOR ${myFavor ? '수정하기' : '만들기'}`}
                    onClicked={onSubmit}
                    isLoading={onSubmitLoading}
                    $boxShadow={''}
                />
            </BottomFloatingButtonDiv>
        </>
    )
}

export default FavorFormComponent