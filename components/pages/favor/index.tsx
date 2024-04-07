import React from "react";
import styled from "styled-components";
import {theme} from "@/styles/theme";
import SpacerComponent from "@/components/common/SpacerComponent";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {RiUserReceived2Line, RiUserShared2Line} from "react-icons/ri";
import TodaySentFavorCardComponent from "@/components/favor/TodaySentFavorCardComponent";
import TodayReceivedFavorCardComponent from "@/components/favor/TodayReceivedFavorCardComponent";
import {Favor} from "@/type/favor/type";
import CommonSwiperComponent from "@/components/common/CommonSwiperComponent";
import {Group} from "@/type/group/type";
import {Swiper} from "swiper/types";

const MyGroupListSwiperDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MyGroupSwiperElementDiv = styled.div`
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

type FavorPageComponentProps = {
    myGroupList: Group[] | undefined
    myFavorList: Favor[] | undefined
    selectedFavorType: 'received' | 'sent'
    onSwiperSlideChange: (swiper: Swiper) => void
    handleClickFavorTypeTab: (type: 'received' | 'sent') => void
    handleClickFavorCompleteStamp: (favorUserAssociationId: number, isComplete: boolean) => Promise<void>
}

const FavorPageComponent = (props: FavorPageComponentProps) => {

    const {
        myGroupList,
        myFavorList,
        selectedFavorType,
        onSwiperSlideChange,
        handleClickFavorTypeTab,
        handleClickFavorCompleteStamp,
    } = props

    return (
        <>
            <SpacerComponent height={12}/>
            <MyGroupListSwiperDiv>
                <CommonSwiperComponent
                    prevPaginationContent={<IoIosArrowBack size={24} color={theme.colors.primary}/>}
                    nextPaginationContent={<IoIosArrowForward size={24} color={theme.colors.primary}/>}
                    list={myGroupList}
                    element={(group, index) => {
                        return (
                            <MyGroupSwiperElementDiv
                                key={index + group.name}
                            >
                                {group.name}
                            </MyGroupSwiperElementDiv>
                        )
                    }}
                    onSlideChange={onSwiperSlideChange}
                />
            </MyGroupListSwiperDiv>
            <SpacerComponent height={24}/>
            <FavorTypeTabListComponent
                selectedFavorType={selectedFavorType}
                handleClickFavorTypeTab={handleClickFavorTypeTab}
            />
            <SpacerComponent height={32}/>
            <FavorTypeAnnounceDiv>
                내가
                <FavorTypeAnnounceEmphasisSpan>
                    {selectedFavorType === 'received' ? ' 받은 ' : ' 보낸 '}
                </FavorTypeAnnounceEmphasisSpan>
                FAVOR 목록이에요
            </FavorTypeAnnounceDiv>
            <MyFavorListComponent
                myFavorList={myFavorList}
                selectedFavorType={selectedFavorType}
                handleClickFavorCompleteStamp={handleClickFavorCompleteStamp}
            />
        </>
    )
}

export default FavorPageComponent

type MyFavorListComponentProps = {
    myFavorList: Favor[] | undefined
    selectedFavorType: 'received' | 'sent'
    handleClickFavorCompleteStamp: (favorUserAssociationId: number, isComplete: boolean) => Promise<void>
}

const MyFavorListComponent = (props: MyFavorListComponentProps) => {

    const {
        myFavorList,
        selectedFavorType,
        handleClickFavorCompleteStamp
    } = props

    return (
        <>
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
        </>
    )
}


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


