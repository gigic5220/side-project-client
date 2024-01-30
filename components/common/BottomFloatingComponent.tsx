import React from 'react';
import styled from "styled-components";

const FloatingButtonDiv = styled.div`
  position: fixed;
  bottom: 100px;
  left: 24px;
  right: 24px;
`

type FloatingButtonComponentProps = {
    child: React.ReactNode
}

const FloatingButtonComponent = (props: FloatingButtonComponentProps) => {

    return (
        <FloatingButtonDiv>
            {props.child}
        </FloatingButtonDiv>
    )
}

export default FloatingButtonComponent