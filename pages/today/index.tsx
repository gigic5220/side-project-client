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
import DividerComponent from "@/components/common/DividerComponent";

const BodyDiv = styled.div`

`

const GroupSelectSwiperListDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

type GroupSelectDivProps = {
    $backgroundColor: string;
    $boxShadow: string;
}

const GroupSelectDiv = styled.div<GroupSelectDivProps>`
  display: inline-block;
  background-color: ${({$backgroundColor}) => $backgroundColor};
  padding: 4px 8px 4px 8px;
  border-radius: 24px;
  color: ${({theme}) => theme.fontColors.white};
  box-shadow: ${({$boxShadow}) => $boxShadow};
`

const GroupSwiperElementDiv = styled.div`
  border-radius: 24px;
  border: 1px solid ${({theme}) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  width: 80%;
`

const SelectedGroupInfoHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const SelectedGroupInfoBodyDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const GroupMemberCircledPhotoListDiv = styled.div`
  display: flex;
  gap: 4px;
`

const GroupTitleSpan = styled.span`
  font-weight: 700;
  font-size: 24px;
  color: ${({theme}) => theme.fontColors.primary};
`

const SwiperSlideDiv = styled(SwiperSlide)`
  color: ${({theme}) => theme.fontColors.primary};
  font-size: 24px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonTabListDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`

type ButtonTabDivProps = {
    $isSelected: boolean;
}

const ButtonTabDiv = styled.div<ButtonTabDivProps>`
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: ${({theme, $isSelected}) => $isSelected ? theme.colors.primary : theme.colors.gray};
  box-shadow: ${({theme, $isSelected}) => $isSelected ? '2px 2px 4px 0 rgba(0, 0, 0, 0.4)' : ''};
  color: ${({theme, $isSelected}) => $isSelected ? theme.fontColors.white : theme.fontColors.white};
`

const TodayFavorDiv = styled.div`
  margin: 16px 0 16px 0;
  display: grid;
  grid-template-columns: 1fr 60px;
  justify-content: center;
  align-items: center;
`

const TodayFavorInfoDiv = styled.div`

`

const TodayFavorCheckStampDiv = styled.div`
  border: 2px solid ${({theme}) => theme.colors.primary};
  border-radius: 12px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.fontColors.placeholder};
  font-size: 12px;
`

const TodayFavorRequesterDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
  font-size: 16px;
`


const TodayFavorTitleDiv = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({theme}) => theme.fontColors.primary};
`

const TodayFavorDetailDiv = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.fontColors.primary};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TodayPage: FC = () => {
    const [isOpened, setIsOpened] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<string>('항겨리와 나')
    const [selectedTap, setSelectedTap] = useState<string>('FAVOR')

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const getTodayFavorCardColor = (type: string, colorTheme: string): string => {
        if (type === 'primary') {
            if (colorTheme === 'red') {
                return theme.favorCardColors.redPrimary;
            } else {
                return theme.favorCardColors.redPrimary;
            }
        } else {
            if (colorTheme === 'red') {
                return theme.favorCardColors.redSecondary;
            } else {
                return theme.favorCardColors.redSecondary;
            }
        }
    }

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
                        {/*<SwiperSlide
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <GroupSwiperElementDiv>
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
                            </GroupSwiperElementDiv>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GroupSwiperElementDiv>
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
                            </GroupSwiperElementDiv>
                        </SwiperSlide>*/}
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
                <ButtonTabListDiv>
                    <ButtonTabDiv
                        $isSelected={selectedTap === 'FAVOR'}
                        onClick={() => setSelectedTap('FAVOR')}
                    >
                        FAVOR
                    </ButtonTabDiv>
                    <ButtonTabDiv
                        $isSelected={selectedTap === 'SCHEDULE'}
                        onClick={() => setSelectedTap('SCHEDULE')}
                    >
                        SCHEDULE
                    </ButtonTabDiv>
                </ButtonTabListDiv>
                <SpacerComponent height={24}/>
                <TodayFavorDiv>
                    <TodayFavorInfoDiv>
                        <TodayFavorRequesterDiv>
                            {/*<CircledUserPhotoComponent
                                $borderColor={theme.colors.primary}
                                photoUrl={SampleImage.src}
                                $width={20}
                                $height={20}
                            />
                            항겨리*/}
                        </TodayFavorRequesterDiv>
                        <SpacerComponent height={8}/>
                        <TodayFavorTitleDiv>
                            밥 사주기
                        </TodayFavorTitleDiv>
                    </TodayFavorInfoDiv>
                    <TodayFavorCheckStampDiv>
                        완료 도장
                    </TodayFavorCheckStampDiv>
                </TodayFavorDiv>
                <DividerComponent $width={'80%'}/>
                <TodayFavorDiv>
                    <TodayFavorInfoDiv>
                        <TodayFavorRequesterDiv>
                            {/*<CircledUserPhotoComponent
                                $borderColor={theme.colors.primary}
                                photoUrl={SampleImage.src}
                                $width={20}
                                $height={20}
                            />
                            항겨리*/}
                        </TodayFavorRequesterDiv>
                        <SpacerComponent height={8}/>
                        <TodayFavorTitleDiv>
                            음쓰버리기
                        </TodayFavorTitleDiv>
                    </TodayFavorInfoDiv>
                    <TodayFavorCheckStampDiv>
                        완료 도장
                    </TodayFavorCheckStampDiv>
                </TodayFavorDiv>
                <DividerComponent $width={'80%'}/>
                <TodayFavorDiv>
                    <TodayFavorInfoDiv>
                        <TodayFavorRequesterDiv>
                            {/*<CircledUserPhotoComponent
                                $borderColor={theme.colors.primary}
                                photoUrl={SampleImage.src}
                                $width={20}
                                $height={20}
                            />
                            항겨리*/}
                        </TodayFavorRequesterDiv>
                        <SpacerComponent height={8}/>
                        <TodayFavorTitleDiv>
                            물티슈 사기
                        </TodayFavorTitleDiv>
                    </TodayFavorInfoDiv>
                    <TodayFavorCheckStampDiv>
                        완료 도장
                    </TodayFavorCheckStampDiv>
                </TodayFavorDiv>

                {/*<TodayFavorCardComponent
                    isOpened={isOpened}
                    favorCardPrimaryColor={getTodayFavorCardColor('primary', 'red')}
                    favorCardSecondaryColor={getTodayFavorCardColor('secondary', 'red')}
                    requesterName={'항겨리'}
                    favorTitle={'밥 사주기'}
                    favorDetail={'순대국밥'}
                    requesterConfirmedStampImageUrl={undefined}
                    accepterCompletedStampImageUrl={undefined}
                    changeIsOpened={() => setIsOpened(!isOpened)}
                />*/}
            </BodyDiv>
        </AppLayoutComponent>
    );
};

export default TodayPage;


