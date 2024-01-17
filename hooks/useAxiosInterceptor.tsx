import api, {callApi} from '../api/CustomedAxios'
import {useEffect, useRef} from 'react'
import {AxiosResponse} from "axios";
import {getSession} from "next-auth/react";
import {useAlert} from "@/hooks/useAlert";


export const useAxiosInterceptor = () => {
    const accessToken = useRef<string | undefined>()
    const refreshToken = useRef<string | undefined>()

    const {openAlert} = useAlert()
    const isRefreshed = useRef(false)

    const errorHandler = async (error: any) => {
        if (!!error?.response) {
            if (error.response?.status === 401 && !!accessToken.current && !!refreshToken.current) {
                const {config} = error
                const session = await getSession()
                if (!!isRefreshed.current) {
                    isRefreshed.current = false
                    openAlert({
                        type: 'alert',
                        message: '로그인이 필요한 기능입니다',
                        onClickClose: () => window.location.href = '/'
                    })
                    return
                }
                if (!!session) {
                    isRefreshed.current = true
                    await callApi(config.method, config.url, config.method !== 'get' ? JSON.parse(config.data) : null)
                }
            } else {
                openAlert({
                    type: 'alert',
                    message: error.response?.data?.message || '서버 오류입니다. 잠시 후 시도해 주세요.',
                    onClickClose: () => window.location.href = '/'
                })
            }
        } else {
            throw error;
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
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [])
}