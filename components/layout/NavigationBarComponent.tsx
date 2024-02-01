import styled from "styled-components";
import {AiOutlineExclamation} from "react-icons/ai";
import {GrGroup} from "react-icons/gr";
import {MdOutlineCelebration, MdOutlinePersonOutline} from "react-icons/md";
import React from "react";
import {theme} from "@/styles/theme";

const NavigationBarDiv = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: ${props => props.theme.colors.white};
  z-index: 100;
`

type NavigationBarItemDivProps = {
    $fontColor: string;
}

const NavigationBarItemDiv = styled.div<NavigationBarItemDivProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({$fontColor}) => $fontColor};
`

type NavigationBarItemComponentProps = {
    icon: React.ReactNode;
    text: string;
    fontColor: string;
    onClickedNavigationBarItem: () => void;
}

const NavigationBarItemComponent = (props: NavigationBarItemComponentProps) => {
    const {
        icon,
        text,
        fontColor,
        onClickedNavigationBarItem
    } = props

    return (
        <NavigationBarItemDiv
            onClick={onClickedNavigationBarItem}
            $fontColor={fontColor}
        >
            {icon}
            {text}
        </NavigationBarItemDiv>
    )
}


const NAVIGATION_BAR_ITEMS = [
    'TODAY',
    'GROUP',
    'REWARD',
    'MY'
]

type NavigationBarComponentProps = {
    selectedNavigationBarItem: string;
    onClickedNavigationBarItem: (selectedNavigationBarItem: string) => void;
}

const NavigationBarComponent = (props: NavigationBarComponentProps) => {

    const {
        selectedNavigationBarItem,
        onClickedNavigationBarItem
    } = props;

    const renderIcon = (
        item: string,
        color: string
    ) => {
        switch (item) {
            case 'TODAY':
                return <AiOutlineExclamation
                    color={color}
                    size={20}
                />
            case 'GROUP':
                return <GrGroup
                    color={color}
                    size={20}
                />
            case 'REWARD':
                return <MdOutlineCelebration
                    color={color}
                    size={20}
                />
            case 'MY':
                return <MdOutlinePersonOutline
                    color={color}
                    size={20}
                />
        }
    }

    return (
        <NavigationBarDiv>
            {
                NAVIGATION_BAR_ITEMS.map(navigationBarItem => {
                    const isSelected = selectedNavigationBarItem === navigationBarItem;
                    return (
                        <NavigationBarItemComponent
                            onClickedNavigationBarItem={() => onClickedNavigationBarItem(navigationBarItem)}
                            key={navigationBarItem}
                            icon={renderIcon(navigationBarItem, isSelected ? theme.fontColors.primary : theme.fontColors.placeholder)}
                            text={navigationBarItem}
                            fontColor={isSelected ? theme.fontColors.primary : theme.fontColors.placeholder}
                        />
                    )
                })
            }
        </NavigationBarDiv>
    )
}

export default NavigationBarComponent