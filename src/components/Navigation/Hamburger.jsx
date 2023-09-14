import '../../styles/hamburger.css'

const Hamburger = (props) => {
    const { onClick, className } = props

    return (
        <button className={ `hamburger ${className && className}` }
            onClick={ onClick && onClick }
        >
            <span />
            <span />
        </button>
    )
}
export default Hamburger