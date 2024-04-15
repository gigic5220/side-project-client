import CommonSwiperComponent from "@/components/common/CommonSwiperComponent";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {theme} from "@/styles/theme";
import React from "react";
import {Group} from "@/type/group/type";
import {Swiper} from "swiper/types";
import styled from "styled-components";

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

type MyGroupListSwiperComponentProps = {
    myGroupList: Group[] | undefined
    onSwiperSlideChange: (swiper: Swiper) => void
}

const MyGroupListSwiperComponent = (props: MyGroupListSwiperComponentProps) => {

    const {
        myGroupList,
        onSwiperSlideChange
    } = props

    return (
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
    )
}

export default MyGroupListSwiperComponent