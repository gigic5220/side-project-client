import api from '../api/CustomedAxios'
import {useEffect} from 'react'
import {AxiosResponse} from "axios";
import {getSession} from "next-auth/react";
import {useAlert} from "@/hooks/useAlert";


export const useAxiosInterceptor = () => {

    const {openAlert} = useAlert()

    const errorHandler = async (error: any) => {

        openAlert({
            type: 'alert',
            message: '일시적인 오류입니다.'
        })

        console.log('errorHandler error', error)
    }

    const requestHandler = async (config: any) => {
        const session = await getSession();

        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session?.accessToken}`
        }

        return config
    }

    const responseHandler = (response: AxiosResponse) => {
        return response
    }

    useEffect(() => {

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