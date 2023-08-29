import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider,} from 'react-query'
import {RecoilRoot} from "recoil";
import AppLayout from "@/Components/layout/AppLayout";
import {DefaultTheme, ThemeProvider} from "styled-components";

const theme: DefaultTheme = {}

const queryClient = new QueryClient()
const App = ({Component, pageProps}: AppProps) => {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <AppLayout>
                        <Component {...pageProps} />
                    </AppLayout>
                </ThemeProvider>
            </QueryClientProvider>
        </RecoilRoot>
    )
}

export default App

