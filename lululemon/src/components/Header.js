import './Header.scss'
import {TopNav} from "./Header/TopNav";
import {MainNav} from "./Header/MainNav";

export const Header = () => {
    return <section className="header">
            <TopNav/>
            <MainNav/>
    </section>
}