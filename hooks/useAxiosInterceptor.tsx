import api from '../api/CustomedAxios'
import {accessTokenAtom, refreshTokenAtom} from '../atom/userAtom'
import {useEffect, useRef} from 'react'
import {useRecoilState} from "recoil";
import {useAlert} from "@/hooks/useAlert";
import {AxiosResponse} from "axios";


export const useAxiosInterceptor = () => {
    const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom)
    const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenAtom)

    const {openAlert, closeAlert} = useAlert()

    const isRefreshed = useRef(false)

    const refreshAccessToken = async (refreshToken: string) => {
        return await fetch(
            process.env.BASE_URL + '/auth/token/refresh',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        refresh_token: refreshToken
                    }
                )
            }
        )
    }

    const recallFailedRequest = async (requestConfig: any) => {
        return await api.request(requestConfig)
    }

    const errorHandler = async (error: any) => {
        if (!!error?.response) {
            if (error.response?.status === 401 && !!accessToken && !!refreshToken) {
                if (isRefreshed.current) {
                    openAlert({
                        body: '로그인이 필요한 기능입니다.',
                        onClick: () => window.location.href = `/account?page=${encodeURIComponent(window.location.pathname + window.location.search)}`,
                        onClose: () => window.location.href = `/account?page=${encodeURIComponent(window.location.pathname + window.location.search)}`
                    })
                    isRefreshed.current = false
                    return
                }
                if (refreshToken) {
                    const fetchedData = await refreshAccessToken(refreshToken)
                    if (!!fetchedData) {
                        if (fetchedData?.status === 201) {
                            isRefreshed.current = true
                            const result = await fetchedData.json()
                            const {config} = error
                            const requestConfig = {
                                url: config.url,
                                method: config.method,
                                headers: {
                                    Authorization: `Bearer ${result.token}`
                                },
                                data: config.method !== 'get' ? JSON.parse(config.data) : null
                            }
                            setRefreshToken(result.refresh_token)
                            setAccessToken(result.token)
                            const recalledResult = await recallFailedRequest(requestConfig)
                            if (!!recalledResult) {
                                isRefreshed.current = false
                            }
                            return recalledResult
                        } else if (fetchedData?.status === 401) {
                            openAlert({
                                body: '로그인이 필요한 기능입니다.',
                                onClick: () => window.location.href = `/account?page=${encodeURIComponent(window.location.pathname + window.location.search)}`,
                                onClose: () => window.location.href = `/account?page=${encodeURIComponent(window.location.pathname + window.location.search)}`
                            })
                            return {isSuccess: false, result: error?.response}
                        } else {
                            //window.api.logout()
                            openAlert({
                                body: '일시적인 오류입니다. 다시 로그인 해주세요.',
                                onClick: () => window.location.href = `/account?page=${encodeURIComponent(window.location.pathname + window.location.search)}`,
                                onClose: () => window.location.href = `/account?page=${encodeURIComponent(window.location.pathname + window.location.search)}`
                            })
                            return {isSuccess: false, result: error?.response}
                        }
                    }
                }
            } else if (error.response.status === 401) {
                openAlert({
                    title: '',
                    body: '로그인이 필요한 기능입니다.',
                    onClick: () => window.location.href = `/account?page=${encodeURIComponent(window.location.pathname + window.location.search)}`,
                    onClose: () => window.location.href = `/account?page=${encodeURIComponent(window.location.pathname + window.location.search)}`
                })
                return {isSuccess: false, result: error?.response}
            }
        } else {
            console.log(error)
        }
    }

    const requestHandler = async (config: any) => {
        const isLoginRequest = config?.url === '/auth/email/login/'
        if (!!accessToken && !isLoginRequest) {
            config.headers = {
                Authorization: `Bearer ${accessToken}`
            }
        }
        return config
    }

    const responseHandler = (response: AxiosResponse) => {
        return response
    }

    const responseInterceptor = api.interceptors.response.use(
        (response: AxiosResponse) => responseHandler(response),
        (error) => errorHandler(error)
    )

    const requestInterceptor =
        api.interceptors.request.use(requestHandler)

    useEffect(() => {
        return () => {
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [responseInterceptor, requestInterceptor])
}