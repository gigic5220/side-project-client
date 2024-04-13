import React, {useEffect, useRef, useState} from 'react';
import {theme} from "@/styles/theme";
import {TiArrowSortedDown} from "react-icons/ti";
import styled from "styled-components";

type SelectBoxDivProps = {
    $isShowList: boolean;
}

const SelectBoxDiv = styled.div<SelectBoxDivProps>`
  position: relative;
  display: grid;
  padding: 0 8px 0 12px;
  grid-template-columns: 1fr 30px;
  align-items: center;
  border: 2px solid ${({theme}) => theme.colors.primary};
  height: 40px;
  border-radius: ${({$isShowList}) => $isShowList ? '12px 12px 0 0' : '12px'};
`

type SelectBoxSelectedItemDivProps = {
    $isSelected: boolean;
}

const SelectBoxSelectedItemDiv = styled.div<SelectBoxSelectedItemDivProps>`
  display: flex;
  color: ${({$isSelected}) => $isSelected ? theme.fontColors.primary : theme.fontColors.placeholder};
`

const SelectBoxShowItemListButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SelectBoxItemListDiv = styled.div`
  position: absolute;
  padding: 8px 12px 8px 12px;
  top: 40px;
  left: -2px;
  right: -2px;
  border: 2px solid ${({theme}) => theme.colors.primary};
  border-radius: 4px 4px 12px 12px;
  background-color: ${({theme}) => theme.colors.white};
  z-index: 999;
`

const SelectBoxItemDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0 8px 0;
`

export type SelectBoxItem = {
    key: string;
    name: string;
}

type CommonSelectBoxComponentProps = {
    placeholder: string;
    selectedItemKey: string | null;
    itemList: SelectBoxItem[];
    onClickItem: (selectBoxItem: SelectBoxItem) => void;
}

const CommonSelectBoxComponent = (props: CommonSelectBoxComponentProps) => {

    const {
        placeholder,
        selectedItemKey,
        itemList,
        onClickItem
    } = props

    const [isShowList, setIsShowList] = useState(false)
    const selectBoxRef = useRef<HTMLDivElement>(null);  // Ref 객체 생성

    const onClickSelectBox = (itemList: SelectBoxItem[]) => {
        if (itemList.length < 1) return
        setIsShowList(prev => !prev)
    }

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!!selectBoxRef.current && !selectBoxRef.current.contains(target)) {
                setIsShowList(false);
            }
        }
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <SelectBoxDiv
            $isShowList={isShowList}
            ref={selectBoxRef}
            onClick={() => onClickSelectBox(itemList)}
        >
            <SelectBoxSelectedItemDiv
                $isSelected={!!selectedItemKey}
            >
                {itemList.find((item) => item.key === selectedItemKey)?.name ?? placeholder}
            </SelectBoxSelectedItemDiv>
            <SelectBoxShowItemListButtonDiv>
                <TiArrowSortedDown
                    size={24}
                    color={itemList.length < 1 ? theme.colors.gray : theme.colors.secondary}
                />
            </SelectBoxShowItemListButtonDiv>
            {
                isShowList &&
                <SelectBoxItemListDiv>
                    {
                        itemList.map((item, index) =>
                            <SelectBoxItemDiv
                                key={index}
                                onClick={() => onClickItem(item)}
                            >
                                {item.name}
                            </SelectBoxItemDiv>
                        )
                    }
                </SelectBoxItemListDiv>
            }
        </SelectBoxDiv>
    )
}

export default CommonSelectBoxComponent