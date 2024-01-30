import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import styled from "styled-components";

const Text = styled.span`
  color: red;
  font-size: 50px;
`

const Main = () => {

    return (
        <AppLayoutComponent
            isShowHeader={true}
        >
            <Text>
                RHYTHM
            </Text>
        </AppLayoutComponent>
    )
}

export default Main