import React from "react";
import SpacerComponent from "@/components/common/SpacerComponent";
import {useFavorPage} from "@/hooks/favor/hooks";
import {Group} from "@/type/group/type";
import MyGroupListSwiperComponent from "@/components/favor/MyGroupListSwiperComponent";
import SelectFavorTypeComponent from "@/components/favor/SelectFavorTypeComponent";
import MyFavorListComponent from "@/components/favor/MyFavorListComponent";
import SelectedFavorTypeTextComponent from "@/components/favor/SelectedFavorTypeTextComponent";

type FavorPageComponentProps = {
    myGroupListServerSideData: Group[]
}

const FavorPageComponent = (props: FavorPageComponentProps) => {

    const {
        myGroupList,
        myFavorList, myFavorListLoading,
        selectedFavorType,
        onSwiperSlideChange,
        handleClickFavorTypeTab,
        handleClickFavorCompleteStamp,
    } = useFavorPage({
        myGroupListServerSideData: props.myGroupListServerSideData
    })

    return (
        <>
            <SpacerComponent height={12}/>
            <MyGroupListSwiperComponent
                myGroupList={myGroupList}
                onSwiperSlideChange={onSwiperSlideChange}
            />
            <SpacerComponent height={24}/>
            <SelectFavorTypeComponent
                selectedFavorType={selectedFavorType}
                handleClickFavorTypeTab={handleClickFavorTypeTab}
            />
            <SpacerComponent height={32}/>
            <SelectedFavorTypeTextComponent
                selectedFavorType={selectedFavorType}
            />
            <MyFavorListComponent
                myFavorList={myFavorList}
                selectedFavorType={selectedFavorType}
                handleClickFavorCompleteStamp={handleClickFavorCompleteStamp}
            />
        </>
    )
}

export default FavorPageComponent


