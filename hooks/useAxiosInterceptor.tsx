import api, {callApi} from '../api/CustomedAxios'
import {useEffect, useRef} from 'react'
import {AxiosResponse} from "axios";
import {getSession} from "next-auth/react";


export const useAxiosInterceptor = () => {
    const accessToken = useRef<string | undefined>()
    const refreshToken = useRef<string | undefined>()

    //const {openAlert, closeAlert} = useAlert()
    const isRefreshed = useRef(false)

    const errorHandler = async (error: any) => {
        if (!!error?.response) {
            if (error.response?.status === 401 && !!accessToken.current && !!refreshToken.current) {
                if (!!isRefreshed.current) {
                    /*openAlert({
                        body: '로그인이 필요한 기능입니다.',
                        onClick: () => window.location.href = `/account?page=${encodeURIComponent(window.location.pathname + window.location.search)}`,
                        onClose: () => window.location.href = `/account?page=${encodeURIComponent(window.location.pathname + window.location.search)}`
                    })*/
                    isRefreshed.current = false
                    return
                }
                const {config} = error
                const session = await getSession()
                if (!!session) {
                    isRefreshed.current = true
                    const response = await callApi(
                        config.method,
                        config.url,
                        config.method !== 'get' ? JSON.parse(config.data) : null
                    )
                }
            }
        } else {
            console.log(error)
        }
    }

    const requestHandler = async (config: any) => {
        return config
    }

    const responseHandler = (response: AxiosResponse) => {
        return response
    }

    useEffect(() => {

        const getToken = async () => {
            const session = await getSession();
            console.log('useEffect', session)
            accessToken.current = session?.accessToken
            refreshToken.current = session?.refreshToken
        };

        getToken();

        const responseInterceptor = api.interceptors.response.use(
            (response: AxiosResponse) => responseHandler(response),
            (error) => errorHandler(error)
        )

        const requestInterceptor =
            api.interceptors.request.use(requestHandler)

        return () => {
            console.log('eject')
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [])
}