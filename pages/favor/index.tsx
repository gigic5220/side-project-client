import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import {useFavorPage} from "@/hooks/favor/hooks";
import FavorPageComponent from "@/components/pages/favor";

const FavorPage: FC = () => {

    const {
        myGroupList,
        myFavorList, myFavorListLoading,
        selectedFavorType,
        onSwiperSlideChange,
        handleClickFavorTypeTab,
        handleClickFavorCompleteStamp,
    } = useFavorPage()

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <FavorPageComponent
                myGroupList={myGroupList}
                myFavorList={myFavorList}
                selectedFavorType={selectedFavorType}
                onSwiperSlideChange={onSwiperSlideChange}
                handleClickFavorTypeTab={handleClickFavorTypeTab}
                handleClickFavorCompleteStamp={handleClickFavorCompleteStamp}
            />
        </AppLayoutComponent>
    );
};

export default FavorPage;