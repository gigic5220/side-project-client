import React, {FC} from "react";
import styled from "styled-components";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {theme} from "@/styles/theme";
import SpacerComponent from "@/components/common/SpacerComponent";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {RiUserReceived2Line, RiUserShared2Line} from "react-icons/ri";
import {useFavorPage} from "@/hooks/favor/hooks";
import TodaySentFavorCardComponent from "@/components/favor/TodaySentFavorCardComponent";
import TodayReceivedFavorCardComponent from "@/components/favor/TodayReceivedFavorCardComponent";
import {Favor} from "@/type/favor/type";
import CommonSwiperComponent from "@/components/common/CommonSwiperComponent";

const BodyDiv = styled.div`

`

const GroupSelectSwiperListDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SwiperSlideDiv = styled.div`
  color: ${({theme}) => theme.fontColors.primary};
  font-size: 24px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FavorTypeTabListDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  justify-content: center;
  align-items: center;
  height: 30px;
`

const FavorTypeTabDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FavorTypeAnnounceDiv = styled.div`
  height: 30px;
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.fontColors.primary};
  text-align: center;
`

const FavorTypeAnnounceEmphasisSpan = styled.span`
  font-weight: 700;
  color: ${({theme}) => theme.colors.primary};
`

const FavorPage: FC = () => {

    const {
        myGroupList, myFavorList, selectedFavorType, myFavorListLoading,
        onSwiperSlideChange,
        handleClickFavorTypeTab, handleClickFavorCompleteStamp,
    } = useFavorPage()

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <BodyDiv>
                <SpacerComponent height={12}/>
                <GroupSelectSwiperListDiv>
                    <CommonSwiperComponent
                        prevPaginationContent={<IoIosArrowBack size={24} color={theme.colors.primary}/>}
                        nextPaginationContent={<IoIosArrowForward size={24} color={theme.colors.primary}/>}
                        list={myGroupList}
                        element={(group, index) => {
                            return (
                                <SwiperSlideDiv
                                    key={index + group.name}
                                >
                                    {group.name}
                                </SwiperSlideDiv>
                            )
                        }}
                        onSlideChange={onSwiperSlideChange}
                    />
                </GroupSelectSwiperListDiv>
                <SpacerComponent height={24}/>
                <FavorTypeTabListComponent
                    handleClickFavorTypeTab={handleClickFavorTypeTab}
                    selectedFavorType={selectedFavorType}
                />
                <SpacerComponent height={32}/>
                <FavorTypeAnnounceDiv>
                    내가
                    <FavorTypeAnnounceEmphasisSpan>
                        {selectedFavorType === 'received' ? ' 받은 ' : ' 보낸 '}
                    </FavorTypeAnnounceEmphasisSpan>
                    FAVOR 목록이에요
                </FavorTypeAnnounceDiv>
                {
                    myFavorList?.map((favor: Favor, index: number) => {
                        if (selectedFavorType === 'sent') {
                            return <TodaySentFavorCardComponent
                                key={index}
                                favorUserAssociationList={favor.favorUserAssociations}
                                favorTitle={favor.title}
                                favorDetail={favor.detail}
                                isImportant={favor.isImportant}
                            />
                        } else {
                            return (
                                <TodayReceivedFavorCardComponent
                                    key={index}
                                    favorUserAssociationId={favor.favorUserAssociations[0].id}
                                    favorTitle={favor.title}
                                    favorDetail={favor.detail}
                                    requesterImageUrl={favor.favorUserAssociations[0].fileUrl}
                                    requesterName={favor.favorUserAssociations[0].nickName}
                                    isImportant={favor.isImportant}
                                    isComplete={favor.favorUserAssociations[0].isComplete}
                                    onClickComplete={handleClickFavorCompleteStamp}
                                />
                            )
                        }
                    })
                }
            </BodyDiv>
        </AppLayoutComponent>
    );
};

export default FavorPage;

type FavorTypeTabListComponentProps = {
    handleClickFavorTypeTab: (type: 'received' | 'sent') => void
    selectedFavorType: 'received' | 'sent'
}

const FavorTypeTabListComponent = (props: FavorTypeTabListComponentProps) => {

    const {
        handleClickFavorTypeTab,
        selectedFavorType
    } = props

    return (
        <FavorTypeTabListDiv>
            <FavorTypeTabDiv
                onClick={() => handleClickFavorTypeTab('received')}
            >
                <RiUserReceived2Line
                    size={selectedFavorType === 'received' ? 30 : 25}
                    color={selectedFavorType === 'received' ? theme.colors.primary : theme.colors.gray}
                />
            </FavorTypeTabDiv>
            <div
                style={{
                    width: 2,
                    height: 35,
                    backgroundColor: theme.colors.gray,
                }}
            />
            <FavorTypeTabDiv
                onClick={() => handleClickFavorTypeTab('sent')}
            >
                <RiUserShared2Line
                    size={selectedFavorType === 'sent' ? 30 : 25}
                    color={selectedFavorType === 'sent' ? theme.colors.primary : theme.colors.gray}
                />
            </FavorTypeTabDiv>
        </FavorTypeTabListDiv>
    )
}


