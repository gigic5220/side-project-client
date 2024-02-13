import React, {FC, useState} from "react";
import styled from "styled-components";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {theme} from "@/styles/theme";
import SpacerComponent from "@/components/common/SpacerComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import {useRouter} from "next/router";
import DividerComponent from "@/components/common/DividerComponent";
import {useDialog} from "@/hooks/useDialog";
import {MdContentCopy} from "react-icons/md";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import {useGetMyGroupList} from "@/hooks/group/hooks";
import Link from "next/link";
import CircledUserPhotoListComponent from "@/components/group/CircledUserPhotoListComponent";

const BodyDiv = styled.div`
`

const GroupListDiv = styled.div`

`

const GroupListElementDiv = styled.div`
  position: relative;
  border: 2px solid ${theme.colors.primary};
  border-radius: 24px;
  padding: 12px;
  height: 71px;
  margin: 12px 0 12px 0;
`

const GroupListElementHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const GroupListElementBodyDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const GroupMemberCircledPhotoListDiv = styled.div`
  display: flex;
  gap: 4px;
`

const GroupTitleDiv = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.fontColors.primary};
`

const GroupDaysDiv = styled.div`
  font-size: 16px;
  color: ${theme.fontColors.primary};
  display: flex;
  align-self: end;
`

const GroupAddButtonDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const GroupListElementSettingModalDiv = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  width: 80px;
  height: 80px;
  background-color: ${({theme}) => theme.colors.white};
  border: 3px solid ${({theme}) => theme.colors.gray};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  z-index: 200;
`

const GroupListElementSettingModalItemDiv = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.fontColors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`

const GroupListElementSettingModalItemDividerDiv = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({theme}) => theme.colors.gray};
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

    const router = useRouter();
    const {openDialog, closeDialog} = useDialog();
    const {
        myGroupList,
        myGroupListLoading,
        myGroupListError
    } = useGetMyGroupList();

    const [openedHandleModalGroupId, setOpenedHandleModalGroupId] = useState<number | null>(null);

    const showGroupInviteCodeDialog = (myGroup: Group) => {
        openDialog({
            children: (
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
                        AB3AF2
                        <MdContentCopy
                            size={24}
                            color={theme.colors.primary}
                        />
                    </GroupInviteCodeDialogDetailDiv>
                </GroupInviteCodeDialogDiv>
            ),
            onClickClose: closeDialog
        })
    }

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
                {/*<GroupAddButtonDiv
                        onClick={() => {
                            router.push('/group/create');
                        }}
                    >
                        <FaPlus
                            size={16}
                            color={theme.colors.primary}
                        />
                        <GroupAddButtonTextDiv>
                            그룹 추가/초대코드
                        </GroupAddButtonTextDiv>
                    </GroupAddButtonDiv>*/}
                <SpacerComponent height={24}/>
                <GroupAddButtonDiv>
                    <CommonButtonComponent content={'그룹 만들기'} onClicked={() => router.push('/group/create')}/>
                    <CommonButtonComponent content={'초대코드 입력'} onClicked={() => {
                    }}/>
                </GroupAddButtonDiv>
                <SpacerComponent height={24}/>
                <DividerComponent/>
                <SpacerComponent height={24}/>
                <GroupListDiv>
                    {
                        myGroupList?.map((myGroup: Group) =>
                            <Link
                                key={myGroup.id}
                                href={`/group/${myGroup.id}`}
                            >
                                <GroupListElementDiv>
                                    <GroupListElementHeaderDiv>
                                        <CircledUserPhotoListComponent
                                            userList={myGroup.groupUserAssociations}
                                        />
                                        {/*<IoMdSettings
                                            onClick={() => {
                                                setOpenedHandleModalGroupId((prev) => prev === myGroup.id ? null : myGroup.id);
                                            }}
                                            size={24}
                                            color={theme.colors.primary}
                                        />*/}
                                    </GroupListElementHeaderDiv>
                                    <SpacerComponent height={8}/>
                                    <GroupListElementBodyDiv>
                                        <GroupTitleDiv>
                                            {myGroup.name}
                                        </GroupTitleDiv>
                                        <GroupDaysDiv>
                                            D + 375
                                        </GroupDaysDiv>
                                    </GroupListElementBodyDiv>
                                    {/*{
                                        openedHandleModalGroupId === myGroup.id &&
                                        <GroupListElementSettingModalDiv>
                                            <GroupListElementSettingModalItemDiv>
                                                수정
                                            </GroupListElementSettingModalItemDiv>
                                            <GroupListElementSettingModalItemDividerDiv/>
                                            <GroupListElementSettingModalItemDiv>
                                                삭제
                                            </GroupListElementSettingModalItemDiv>
                                        </GroupListElementSettingModalDiv>
                                    }*/}
                                </GroupListElementDiv>
                            </Link>
                        )
                    }
                    {/*<GroupListElementDiv>
                        <GroupListElementHeaderDiv>
                            <GroupMemberCircledPhotoListDiv>
                                <CircledUserPhotoComponent
                                    $borderColor={theme.colors.primary}
                                    photoUrl={SampleImage.src}
                                />
                                <CircledUserPhotoComponent
                                    $borderColor={theme.colors.primary}
                                    photoUrl={SampleImage2.src}
                                />
                            </GroupMemberCircledPhotoListDiv>
                            <IoMdSettings
                                size={24}
                                color={theme.colors.primary}
                            />
                        </GroupListElementHeaderDiv>
                        <SpacerComponent height={8}/>
                        <GroupListElementBodyDiv>
                            <GroupTitleDiv>
                                항겨리와 나
                            </GroupTitleDiv>
                            <GroupDaysDiv>
                                D + 375
                            </GroupDaysDiv>
                        </GroupListElementBodyDiv>
                    </GroupListElementDiv>
                    <GroupListElementDiv>
                        <GroupListElementHeaderDiv>
                            <GroupMemberCircledPhotoListDiv>
                                <CircledUserPhotoComponent
                                    $borderColor={theme.colors.primary}
                                    photoUrl={SampleImage.src}
                                />
                                <CircledUserPhotoComponent
                                    $borderColor={theme.colors.primary}
                                    photoUrl={SampleImage2.src}
                                />
                            </GroupMemberCircledPhotoListDiv>
                            <IoMdSettings
                                size={24}
                                color={theme.colors.primary}
                            />
                        </GroupListElementHeaderDiv>
                        <SpacerComponent height={8}/>
                        <GroupListElementBodyDiv>
                            <GroupTitleDiv>
                                항겨리와 나
                            </GroupTitleDiv>
                            <GroupDaysDiv>
                                D + 375
                            </GroupDaysDiv>
                        </GroupListElementBodyDiv>
                    </GroupListElementDiv>*/}
                    <SpacerComponent height={12}/>
                    <DividerComponent/>
                    <SpacerComponent height={12}/>

                </GroupListDiv>
                {/*<GroupSwiperElementDiv>
                    <SelectedGroupInfoHeaderDiv>
                        <GroupMemberCircledPhotoListDiv>
                            <CircledUserPhotoComponent
                                $borderColor={theme.colors.primary}
                                photoUrl={SampleImage.src}
                            />
                            <CircledUserPhotoComponent
                                $borderColor={theme.colors.primary}
                                photoUrl={SampleImage2.src}
                            />
                        </GroupMemberCircledPhotoListDiv>
                        <IoMdSettings
                            size={24}
                            color={theme.colors.primary}
                        />
                    </SelectedGroupInfoHeaderDiv>
                    <SelectedGroupInfoBodyDiv>
                        <GroupTitleSpan>
                            항겨리와 나
                        </GroupTitleSpan>
                    </SelectedGroupInfoBodyDiv>
                </GroupSwiperElementDiv>*/}
            </BodyDiv>
        </AppLayoutComponent>
    );
};

export default GroupPage;


