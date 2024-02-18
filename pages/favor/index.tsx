import React, {FC, useRef, useState} from "react";
import styled from "styled-components";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {theme} from "@/styles/theme";
import SpacerComponent from "@/components/common/SpacerComponent";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation} from 'swiper/modules';
import TodayFavorCard from "@/components/favor/TodayFavorCard";
import {RiUserReceived2Line, RiUserShared2Line} from "react-icons/ri";
import {useGetMyFavorList} from "@/hooks/favor/hooks";

const BodyDiv = styled.div`

`

const GroupSelectSwiperListDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SwiperSlideDiv = styled(SwiperSlide)`
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

const TodayPage: FC = () => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [selectedFavorType, setSelectedFavorType] = useState<string>('received');

    const handleClickFavorTypeTab = (type: string) => {
        if (type === selectedFavorType) return;
        setSelectedFavorType(type);
    }

    const {
        myFavorList,
        myFavorListLoading,
    } = useGetMyFavorList()

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <BodyDiv>
                <SpacerComponent height={12}/>
                <GroupSelectSwiperListDiv>
                    <div
                        ref={prevRef}
                    >
                        <IoIosArrowBack
                            size={24}
                            color={theme.colors.primary}
                        />
                    </div>
                    <Swiper
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            if (typeof swiper.params.navigation !== 'boolean') {
                                if (swiper.params.navigation) {
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                }
                            }
                            swiper.navigation.update();
                        }}
                        loop={true}
                    >
                        <SwiperSlideDiv>
                            항겨리와 나
                        </SwiperSlideDiv>
                        <SwiperSlideDiv>
                            가족
                        </SwiperSlideDiv>
                        <SwiperSlideDiv>
                            친구
                        </SwiperSlideDiv>
                    </Swiper>
                    <div
                        ref={nextRef}
                    >
                        <IoIosArrowForward
                            size={24}
                            color={theme.colors.primary}
                        />
                    </div>
                </GroupSelectSwiperListDiv>
                <SpacerComponent height={24}/>
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
                <SpacerComponent height={24}/>
                {
                    myFavorList?.map((favor, index) => {
                        return (
                            <TodayFavorCard
                                key={index}
                                favorTitle={favor.title}
                                requesterImageUrl={favor.groupUserAssociation.fileUrl}
                                requesterName={favor.groupUserAssociation.nickName}
                            />
                        )
                    })
                }
            </BodyDiv>
        </AppLayoutComponent>
    );
};

export default TodayPage;


