import React, {FC} from "react";
import styled from "styled-components";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {theme} from "@/styles/theme";
import SpacerComponent from "@/components/common/SpacerComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import DividerComponent from "@/components/common/DividerComponent";
import {MdContentCopy} from "react-icons/md";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import CircledUserPhotoListComponent from "@/components/group/CircledUserPhotoListComponent";
import {IoPerson} from "react-icons/io5";
import {Group} from "@/type/group/type";
import {useGroupPage} from "@/hooks/group/hooks";

const BodyDiv = styled.div`
`

const GroupListDiv = styled.div`

`

const GroupListElementDiv = styled.div`
  position: relative;
  border: 2px solid ${theme.colors.primary};
  border-radius: 24px;
  padding: 16px 16px 16px 16px;
  margin: 12px 0 12px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`


const GroupListElementHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const GroupListElementBodyDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 12px;
`

const GroupTitleDiv = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.fontColors.primary};
`

const GroupInviteCodeDialogButtonDiv = styled.div`
  font-size: 12px;
  color: ${theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
`

const GroupMemberCountDiv = styled.div`
  font-size: 16px;
  color: ${theme.fontColors.primary};
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`

const GroupAddButtonDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const GroupInviteCodeDialogDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const GroupInviteCodeDialogTitleSpan = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.fontColors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`

const GroupInviteCodeDialogSubTitleSpan = styled.span`
  font-size: 16px;
  color: ${theme.fontColors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const GroupInviteCodeDialogDetailDiv = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.fontColors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

const GroupPage: FC = () => {


    const {
        myGroupList,
        handleClickCreateGroupButton,
        handleClickJoinGroupButton,
        handleClickShowInviteCodeDialogButton,
        handleClickGroup,
        handleClickCopyInviteCodeIcon
    } = useGroupPage()


    return (
        <AppLayoutComponent
            isShowHeader
        >
            <BodyDiv>
                <SpacerComponent height={24}/>
                <PageTitleComponent
                    title={'나의 그룹'}
                    subTitle={'나의 그룹을 확인하고 관리해보세요'}
                />
                <SpacerComponent height={24}/>
                <GroupAddButtonDiv>
                    <CommonButtonComponent content={'그룹 만들기'} onClicked={handleClickCreateGroupButton}/>
                    <CommonButtonComponent content={'그룹 가입하기'} onClicked={handleClickJoinGroupButton}/>
                </GroupAddButtonDiv>
                <SpacerComponent height={24}/>
                <DividerComponent/>
                <SpacerComponent height={24}/>
                <GroupListDiv>
                    {
                        myGroupList?.map((myGroup: Group) =>
                            <GroupListElementDiv
                                key={myGroup.id}
                                onClick={() => handleClickGroup(myGroup.id)}
                            >
                                <GroupListElementHeaderDiv>
                                    <GroupTitleDiv>
                                        {myGroup.name}
                                    </GroupTitleDiv>
                                    <GroupInviteCodeDialogButtonDiv
                                        onClick={(event) => handleClickShowInviteCodeDialogButton(
                                            event,
                                            <GroupInviteCodeDialogDiv>
                                                <GroupInviteCodeDialogTitleSpan>
                                                    {myGroup.name}
                                                </GroupInviteCodeDialogTitleSpan>
                                                <SpacerComponent height={12}/>
                                                <GroupInviteCodeDialogSubTitleSpan>
                                                    초대코드를 원하는 멤버에게 알려주고,<br/>그룹에 참여할 수 있도록 해주세요!
                                                </GroupInviteCodeDialogSubTitleSpan>
                                                <SpacerComponent height={20}/>
                                                <GroupInviteCodeDialogDetailDiv>
                                                    {myGroup.code}
                                                    <MdContentCopy
                                                        onClick={() => handleClickCopyInviteCodeIcon(myGroup.code)}
                                                        size={24}
                                                        color={theme.colors.primary}
                                                    />
                                                </GroupInviteCodeDialogDetailDiv>
                                            </GroupInviteCodeDialogDiv>
                                        )}
                                    >
                                        초대코드 확인
                                    </GroupInviteCodeDialogButtonDiv>
                                </GroupListElementHeaderDiv>
                                <GroupListElementBodyDiv>
                                    <GroupMemberCountDiv>
                                        <IoPerson
                                            size={20}
                                            color={theme.colors.primary}
                                        />
                                        {myGroup.groupUserAssociations.length}
                                    </GroupMemberCountDiv>
                                    <CircledUserPhotoListComponent
                                        userList={myGroup.groupUserAssociations}
                                    />
                                </GroupListElementBodyDiv>
                            </GroupListElementDiv>
                        )
                    }
                    <SpacerComponent height={12}/>
                    <DividerComponent/>
                    <SpacerComponent height={12}/>

                </GroupListDiv>
            </BodyDiv>
        </AppLayoutComponent>
    );
};

export default GroupPage;


