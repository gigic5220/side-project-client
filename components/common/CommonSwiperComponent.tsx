import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from "styled-components";
import {useSwiper} from "@/hooks/useSwiper";

type PaginationDivProps = {
    $isShow?: boolean;
}

const PrevPaginationDiv = styled.div<PaginationDivProps>`
  opacity: ${({$isShow}) => $isShow ? 1 : 0};
`

const NextPaginationDiv = styled.div<PaginationDivProps>`
  opacity: ${({$isShow}) => $isShow ? 1 : 0};
`

type CommonSwiperComponentProps = {
    prevPaginationContent?: React.ReactNode;
    nextPaginationContent?: React.ReactNode;
    list: any;
    element: (item: any, index: number) => React.ReactNode;
    onSlideChange?: (swiper: any) => void;
}

export const CommonSwiperComponent = (props: CommonSwiperComponentProps) => {

    const {
        prevPaginationContent,
        nextPaginationContent,
        list,
        element,
        onSlideChange,
    } = props

    const {
        prevSwiperPaginationArrowRef, nextSwiperPaginationArrowRef,
        currentSwiperIndex, changeCurrentSwiperIndex, onBeforeSwiperInit
    } = useSwiper()

    return (
        <>
            {
                !!prevPaginationContent &&
                <PrevPaginationDiv
                    ref={prevSwiperPaginationArrowRef}
                    $isShow={currentSwiperIndex !== 0}
                >
                    {prevPaginationContent}
                </PrevPaginationDiv>
            }
            <Swiper
                onSlideChange={(swiper) => {
                    if (!!onSlideChange) onSlideChange(swiper)
                    changeCurrentSwiperIndex(swiper.activeIndex)
                }}
                modules={[Navigation]}
                navigation={{
                    prevEl: prevSwiperPaginationArrowRef?.current,
                    nextEl: nextSwiperPaginationArrowRef?.current,
                }}
                onBeforeInit={onBeforeSwiperInit}
            >
                {
                    list?.map((item: any, index: number) => {
                        return (
                            <SwiperSlide
                                key={index}
                            >
                                {element(item, index)}
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {
                !!nextPaginationContent &&
                <NextPaginationDiv
                    ref={nextSwiperPaginationArrowRef}
                    $isShow={currentSwiperIndex !== list?.length - 1}
                >
                    {nextPaginationContent}
                </NextPaginationDiv>
            }
        </>
    )
}

export default CommonSwiperComponent