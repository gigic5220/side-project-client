import AppLayout from "@/components/layout/AppLayout";
import styled from "styled-components";

const Text = styled.span`
  color: red;
  font-size: 50px;
`

const Main = () => {

    return (
        <AppLayout
            isShowHeader={true}
        >
            <Text>
                RHYTHM
            </Text>
        </AppLayout>
    )
}

export default Main