import '../styles/global.scss'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider,} from 'react-query'
import {RecoilRoot} from "recoil";
import {StyleSheetManager, ThemeProvider} from "styled-components";
import {theme} from "../styles/theme";
import {GlobalStyle} from "@/styles/global-style";
import Head from "next/head";
import AppWrapper from "@/components/layout/AppWrapper";
import {SessionProvider} from "next-auth/react";

const queryClient = new QueryClient()
const App = ({Component, pageProps: {session, ...pageProps}}: AppProps) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <StyleSheetManager
                        shouldForwardProp={() => true}
                    >
                        <ThemeProvider theme={theme}>
                            <GlobalStyle/>
                            <SessionProvider session={session}>
                                <AppWrapper>
                                    <Component {...pageProps} />
                                </AppWrapper>
                            </SessionProvider>
                        </ThemeProvider>
                    </StyleSheetManager>
                </QueryClientProvider>
            </RecoilRoot>
        </>
    )
}

export default App

