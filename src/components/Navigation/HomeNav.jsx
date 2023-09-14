import { NavLink } from "react-router-dom"
import Logo from "../Logo"
import '../../styles/nav.css';
import SearchBox from "./SearchBox"
import Hamburger from "./Hamburger"
import { useEffect, useState } from "react";
import SideNav from "./SideNav";

const HomeNav = () => {
    const [scrolled, setScrolled] = useState(false)

    const [isOpen, setIsOpen] = useState(false)

    function toggleOpen() {
        setIsOpen(prev => !prev)
    }


    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                setScrolled(true)
                setIsOpen(false)
            } else (
                setScrolled(false)
            )
        })
    }, [])

    return (
        <>
            <nav className={ `nav ${scrolled && 'scrolled'}` }>
                <Logo />
                <SearchBox />
                <div className="navBtns">
                    <button className="signinBtn">Sign in</button>
                    <Hamburger
                        className={ `${isOpen ? 'active' : null}` }
                        onClick={ toggleOpen }
                    />
                </div>
            </nav>
            <SideNav
                isOpen={ isOpen }
            // id={ id }
            />
        </>
    )
}
export default HomeNav