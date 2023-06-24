import axios, {api_routes} from "../api/axios";
import useAuth from "./useAuth";


export const useRefreshToken = () => {
    const {setAuth} = useAuth()

    const refresh = async () => {
        // this action is not private
        const res = await axios.get(api_routes.refreshToken, {
            // OK to carry cookie
            withCredentials: true
        })
        setAuth(prev => {
            console.log(JSON.stringify(res))
            console.log(res.data.accessToken)
            return {...prev, accessToken: res.data.accessToken}
        })
        return res.data.accessToken
    }
    return refresh

}