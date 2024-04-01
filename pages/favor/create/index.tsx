import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {useFavorCreatePage} from "@/hooks/favor/hooks";
import SpacerComponent from "@/components/common/SpacerComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import {FaCheck} from "react-icons/fa";
import {theme} from "@/styles/theme";
import {FaExclamation} from "react-icons/fa6";
import {LoadingSpinnerComponent} from "@/components/common/LoadingSpinnerComponent";
import CircledUserPhotoListComponent from "@/components/group/CircledUserPhotoListComponent";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import styled from "styled-components";
import BottomFloatingButtonComponent from "@/components/common/BottomFloatingButtonComponent";
import CommonSwiperComponent from "@/components/common/CommonSwiperComponent";

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

const GroupDetailFormItemTitleP = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: ${({theme}) => theme.fontColors.primary};
  align-self: start;
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

type GroupListSwiperElementDivProps = {
    $isSelected: boolean;
}

const GroupListSwiperElementDiv = styled.div<GroupListSwiperElementDivProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  border: 1px solid ${({theme}) => theme.colors.primary};
  padding: 8px 12px 8px 12px;
  background-color: ${({$isSelected, theme}) => $isSelected ? theme.colors.primary : theme.colors.white};
  font-size: 14px;
  color: ${({$isSelected, theme}) => $isSelected ? theme.fontColors.white : theme.fontColors.primary};
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

const NoSelectedGroupDiv = styled.div`
  font-size: 14px;
  color: ${({theme}) => theme.fontColors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 73px;
`

const FavorCreatePage: FC = () => {

    const {
        myGroup, myGroupLoading,
        myGroupList, myGroupListLoading,
        selectedUserIdList,
        favorTitleInputValue, favorDetailInputValue,
        onChangeFavorTitleInputValue, onChangeFavorDetailInputValue,
        handleClickGroup, handleClickGroupMember,
        handleCheckImportanceCheckBox, isImportant, handleClickCreateButton
    } = useFavorCreatePage();

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <SpacerComponent height={24}/>
            <PageTitleComponent
                title={'FAVOR 만들기'}
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
                                <CommonSwiperComponent
                                    list={myGroupList}
                                    element={(group, index) => (
                                        <GroupListSwiperElementDiv
                                            $isSelected={myGroup?.id.toString() === group.id.toString()}
                                            onClick={() => handleClickGroup(group.id)}
                                        >
                                            {group.name}
                                        </GroupListSwiperElementDiv>
                                    )}
                                />
                                /*<Swiper
                                    spaceBetween={15}
                                    freeMode={true}
                                    modules={[FreeMode]}
                                    slidesPerView={'auto'}
                                >
                                    {
                                        myGroupList.map((group, index) =>
                                            <SwiperSlideDiv
                                                key={index}
                                                onClick={() => handleClickGroup(group.id)}
                                            >
                                                <GroupListSwiperElementDiv
                                                    $isSelected={myGroup?.id.toString() === group.id.toString()}
                                                >
                                                    {group.name}
                                                </GroupListSwiperElementDiv>
                                            </SwiperSlideDiv>
                                        )
                                    }
                                </Swiper>*/ :
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
                $isLoading={myGroupLoading}
            >
                {
                    myGroup ?
                        (
                            myGroupLoading ?
                                <LoadingSpinnerComponent/> :
                                (myGroupList && myGroupList.length > 0 && myGroup?.groupUserAssociations && myGroup?.groupUserAssociations.length > 0) ?
                                    <CircledUserPhotoListComponent
                                        onClick={handleClickGroupMember}
                                        isSelected={
                                            (userId: string): boolean => {
                                                return !!selectedUserIdList?.includes(userId)
                                            }
                                        }
                                        userList={myGroup.groupUserAssociations}
                                        photoWidth={50}
                                        photoHeight={50}
                                        isShowNickName
                                    /> :
                                    <NoSelectedGroupDiv>
                                        아직 그룹에 멤버가 없어요!
                                    </NoSelectedGroupDiv>
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
                value={favorTitleInputValue}
                onChange={onChangeFavorTitleInputValue}
                maxLength={10}
                placeholder={'할 일'}
            />
            <SpacerComponent height={40}/>
            <CommonInputComponent
                title={'간단한 내용'}
                value={favorDetailInputValue}
                onChange={onChangeFavorDetailInputValue}
                maxLength={10}
                placeholder={'간단한 내용'}
            />
            <SpacerComponent height={40}/>
            <BottomFloatingButtonComponent
                content={'FAVOR 만들기'}
                onClicked={handleClickCreateButton}
                borderRadius={''}
            />
        </AppLayoutComponent>
    );
};

export default FavorCreatePage;


