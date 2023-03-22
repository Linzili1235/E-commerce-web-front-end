import { useLocation } from "react-router-dom";
import DefaultFooter from "./DefaultFooter";
import SimpleFooter from "./SimpleFooter";

export const Footer = () => {
    const location = useLocation()
    const { pathname } = location

    const getFooter = () => {
        if (pathname === '/mybag' || pathname === '/review' || pathname === 'payment') {
            return <SimpleFooter />;
        } else {
            return <DefaultFooter />;
        }
    }

    const footer = getFooter()
    return <>
        {footer}
    </>
}