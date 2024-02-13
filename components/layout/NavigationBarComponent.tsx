import styled from "styled-components";
import {AiOutlineExclamation} from "react-icons/ai";
import {GrGroup} from "react-icons/gr";
import {MdOutlineCelebration, MdOutlinePersonOutline} from "react-icons/md";
import React from "react";
import {theme} from "@/styles/theme";
import Link from "next/link";

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
    isSelected: boolean;
}

const NavigationBarItemDiv = styled.div<NavigationBarItemDivProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({isSelected, theme}) => isSelected ? theme.fontColors.primary : theme.fontColors.placeholder};
  font-weight: ${({isSelected, theme}) => isSelected ? 700 : 400};
`

type NavigationBarItemComponentProps = {
    isSelected: boolean;
    icon: React.ReactNode;
    text: string;
}

const NavigationBarItemComponent = (props: NavigationBarItemComponentProps) => {
    const {
        isSelected,
        icon,
        text,
    } = props

    return (
        <NavigationBarItemDiv
            isSelected={isSelected}
        >
            {icon}
            {text}
        </NavigationBarItemDiv>
    )
}


const NAVIGATION_BAR_ITEMS = [
    {
        key: 'today',
        value: 'TODAY'
    },
    {
        key: 'group',
        value: 'GROUP'
    },
    {
        key: 'reward',
        value: 'REWARD'
    },
    {
        key: 'my',
        value: 'MY'
    },
]

type NavigationBarComponentProps = {
    routerPath: string;
}

const NavigationBarComponent = (props: NavigationBarComponentProps) => {

    const {
        routerPath,
    } = props;

    const renderIcon = (
        item: string,
        color: string
    ) => {
        switch (item) {
            case 'today':
                return <AiOutlineExclamation
                    color={color}
                    size={20}
                />
            case 'group':
                return <GrGroup
                    color={color}
                    size={20}
                />
            case 'reward':
                return <MdOutlineCelebration
                    color={color}
                    size={20}
                />
            case 'my':
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
                    const isSelected = routerPath?.includes(navigationBarItem.key)
                    return (
                        <Link
                            key={navigationBarItem.key}
                            href={`/${navigationBarItem.key}`}
                        >
                            <NavigationBarItemComponent
                                icon={renderIcon(navigationBarItem.key, isSelected ? theme.fontColors.primary : theme.fontColors.placeholder)}
                                text={navigationBarItem.value}
                                isSelected={isSelected}
                            />
                        </Link>
                    )
                })
            }
        </NavigationBarDiv>
    )
}

export default NavigationBarComponent