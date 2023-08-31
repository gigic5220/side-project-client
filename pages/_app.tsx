import '../styles/global.scss'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider,} from 'react-query'
import {RecoilRoot} from "recoil";
import AppLayout from "@/Components/layout/AppLayout";
import {ThemeProvider} from "styled-components";
import {theme} from "../styles/theme";
import {GlobalStyle} from "@/styles/global-style";

const queryClient = new QueryClient()
const App = ({Component, pageProps}: AppProps) => {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle/>
                    <AppLayout>
                        <Component {...pageProps} />
                    </AppLayout>
                </ThemeProvider>
            </QueryClientProvider>
        </RecoilRoot>
    )
}

export default App

