import {useRef, useState} from "react";
import {Swiper} from "swiper/types";

export const useSwiper = () => {
    const [currentSwiperIndex, setCurrentSwiperIndex] = useState<number>(0)
    const prevSwiperPaginationArrowRef = useRef(null);
    const nextSwiperPaginationArrowRef = useRef(null);

    const onBeforeSwiperInit = (swiper: Swiper) => {
        if (typeof swiper.params.navigation !== 'boolean') {
            if (swiper.params.navigation) {
                swiper.params.navigation.prevEl = prevSwiperPaginationArrowRef.current;
                swiper.params.navigation.nextEl = nextSwiperPaginationArrowRef.current;
            }
        }
        swiper.navigation.update();
    }

    const changeCurrentSwiperIndex = (index: number) => {
        setCurrentSwiperIndex(index)
    }

    return {
        prevSwiperPaginationArrowRef, nextSwiperPaginationArrowRef,
        currentSwiperIndex, changeCurrentSwiperIndex, onBeforeSwiperInit
    }
}