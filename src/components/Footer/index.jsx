import { BiLogoFacebookSquare, BiLogoInstagram, BiLogoTwitter, BiLogoYoutube } from "react-icons/bi"
import { Link } from "react-router-dom"
import '../../styles/footer.css'

const Footer = () => {
    const socialMedia = [
        { name: 'facebook', url: 'https://facebook.com/brownjr01/', icon: <BiLogoFacebookSquare /> },
        { name: 'instagram', url: 'https://www.instagram.com/memoye_io/', icon: <BiLogoInstagram /> },
        { name: 'x', url: 'https://twitter.com/memoye_io', icon: <BiLogoTwitter /> },
        { name: 'youtube', url: 'https://youtube.com', icon: <BiLogoYoutube /> }
    ]



    return (
        <footer className="footer">
            <div className="sm">
                {
                    socialMedia
                        .map((profile) => {
                            return (
                                <a className="smLinks"
                                    key={ profile.name }
                                    target={ '_blank' }
                                    href={ profile.url }>{ profile.icon }</a>
                            )
                        })
                }
            </div>
            <div className="formalities">
                <a href="/">Conditions of Use</a>
                <a href="/">Privacy & Policy</a>
                <a href="/">Press Room</a>
            </div>
            <div className="signature">
                <p>Made with ❤️ by <a href="https://github.com/memoye" target="_blank">Brown</a></p>
            </div>
        </footer >
    )
}
export default Footer