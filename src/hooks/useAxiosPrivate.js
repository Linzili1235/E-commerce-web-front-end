import { axiosPrivate} from "../api/axios";
import {useRefreshToken} from "./useRefreshToken";
import useAuth from "./useAuth";
import {useEffect} from "react";


export const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const {auth} = useAuth()

    useEffect(() => {
        // interceptor needs to be removed or it will be more and more
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                // first time request
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                // error.config is the request config
                const prevRequest = error?.config
                // accessToken expired
                if (error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            // remove interceptors to prevent influence other requests
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }

    }, [auth, refresh])

    return axiosPrivate
}