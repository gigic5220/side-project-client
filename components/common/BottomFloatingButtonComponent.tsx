import React from 'react';
import styled from "styled-components";
import CommonButtonComponent, {CommonButtonComponentProps} from "@/components/common/CommonButtonComponent";

const BottomFloatingButtonDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`

const BottomFloatingButtonComponent = (props: CommonButtonComponentProps) => {

    return (
        <BottomFloatingButtonDiv>
            <CommonButtonComponent
                {...props}
                borderRadius={''}
            />
        </BottomFloatingButtonDiv>
    )
}

export default BottomFloatingButtonComponent