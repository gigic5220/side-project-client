import '../styles/global.scss'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider,} from 'react-query'
import {RecoilRoot} from "recoil";
import AppLayout from "@/components/layout/AppLayout";
import {StyleSheetManager, ThemeProvider} from "styled-components";
import {theme} from "../styles/theme";
import {GlobalStyle} from "@/styles/global-style";

const queryClient = new QueryClient()
const App = ({Component, pageProps}: AppProps) => {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <StyleSheetManager
                    shouldForwardProp={() => true}
                >
                    <ThemeProvider theme={theme}>
                        <GlobalStyle/>
                        <AppLayout>
                            <Component {...pageProps} />
                        </AppLayout>
                    </ThemeProvider>
                </StyleSheetManager>
            </QueryClientProvider>
        </RecoilRoot>
    )
}

export default App

