import { Outlet, useParams } from "react-router-dom"
import '../../styles/movies.css'
import SideNav from "../../components/Navigation/SideNav"
import Logo from "../../components/Logo"
import { useEffect, useState } from "react"

const Movies = () => {
    const { id } = useParams()
    const [scrolling, setScrolling] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                setScrolling(true)
            } else {
                setScrolling(false)
            }
        })
    }, [])

    return (
        <div className='moviesPage'>
            <Outlet />

        </div>
    )
}
export default Movies