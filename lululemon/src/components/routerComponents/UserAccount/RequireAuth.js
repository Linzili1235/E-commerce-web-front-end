import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {Main} from "../../mainPageComponents/Main";


export const RequireAuth = () => {
    const {auth} = useAuth()
    const location = useLocation()

    return (
        auth?.email ?
            <Outlet />
            // <Navigate to='/' replace={true}/>
            // where you can go back from sign in
            : <Navigate to='/signIn' state={{from: location}} replace={true}/>
    )
}