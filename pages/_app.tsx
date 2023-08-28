import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider,} from 'react-query'
import {RecoilRoot} from "recoil";
import AppLayout from "@/Components/layout/AppLayout";

const queryClient = new QueryClient()
const App = ({Component, pageProps}: AppProps) => {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>
            </QueryClientProvider>
        </RecoilRoot>
    )
}

export default App

