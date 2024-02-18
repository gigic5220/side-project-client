import styled from "styled-components";
import {GrGroup} from "react-icons/gr";
import {MdOutlineCelebration, MdOutlineChecklistRtl, MdOutlinePersonOutline} from "react-icons/md";
import React, {useEffect, useRef, useState} from "react";
import {theme} from "@/styles/theme";
import Link from "next/link";
import {GoPlusCircle} from "react-icons/go";
import LogoComponent from "@/components/common/LogoComponent";
import DividerComponent from "@/components/common/DividerComponent";

const BackgroundDimDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`

const NavigationBarDiv = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: ${props => props.theme.colors.white};
  z-index: 1000;
`

type NavigationBarItemDivProps = {
    $isSelected: boolean;
}

const NavigationBarItemDiv = styled.div<NavigationBarItemDivProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({$isSelected, theme}) => $isSelected ? theme.fontColors.primary : theme.fontColors.placeholder};
  font-weight: ${({$isSelected, theme}) => $isSelected ? 700 : 400};
`

const AddModalDiv = styled.div`
  position: fixed;
  padding: 16px 4px 16px 4px;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  border: 4px solid ${props => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  background-color: ${props => props.theme.colors.white};
  z-index: 1002;
`

const AddModalItemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: ${props => props.theme.fontColors.primary};
  z-index: 1001;
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
            $isSelected={isSelected}
        >
            {icon}
            {text}
        </NavigationBarItemDiv>
    )
}


const NAVIGATION_BAR_ITEMS = [
    {
        key: 'favor',
        value: 'FAVOR'
    },
    {
        key: 'group',
        value: 'GROUP'
    },
    {
        key: 'add',
        value: ''
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

    const [isShowAddModal, setIsShowAddModal] = useState(false)
    const addModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (addModalRef.current && !addModalRef.current.contains(event.target)) {
                setIsShowAddModal(prev => !prev)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [addModalRef]);

    const renderIcon = (
        item: string,
        color: string
    ) => {
        switch (item) {
            case 'favor':
                return <MdOutlineChecklistRtl
                    color={color}
                    size={20}
                />
            case 'group':
                return <GrGroup
                    color={color}
                    size={20}
                />
            case 'add':
                return <GoPlusCircle
                    onClick={() => setIsShowAddModal(prev => !prev)}
                    color={theme.colors.primary}
                    size={28}
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
        <>
            <NavigationBarDiv>
                {
                    NAVIGATION_BAR_ITEMS.map(navigationBarItem => {
                        const isSelected = routerPath?.includes(navigationBarItem.key)
                        if (navigationBarItem.key === 'add') {
                            return (
                                <NavigationBarItemComponent
                                    key={navigationBarItem.key}
                                    icon={renderIcon(navigationBarItem.key, isSelected ? theme.fontColors.primary : theme.fontColors.placeholder)}
                                    text={navigationBarItem.value}
                                    isSelected={isSelected}
                                />
                            )
                        }
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
            {
                isShowAddModal &&
                <>
                    <BackgroundDimDiv/>
                    <AddModalDiv
                        ref={addModalRef}
                    >
                        <Link
                            href={`/favor/create`}
                        >
                            <AddModalItemDiv>
                                <LogoComponent width={60}/> 추가
                            </AddModalItemDiv>
                        </Link>
                        <DividerComponent $width={'90%'}/>
                        <Link
                            href={`/group/create`}
                        >
                            <AddModalItemDiv>
                                그룹 추가
                            </AddModalItemDiv>
                        </Link>
                        <DividerComponent $width={'90%'}/>
                        <AddModalItemDiv>
                            멤버 추가
                        </AddModalItemDiv>
                    </AddModalDiv>
                </>
            }
        </>
    )
}

export default NavigationBarComponent