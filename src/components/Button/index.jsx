import '../../styles/button.css'

const Button = ({ children, filled, className, onClick }) => {
    return (
        <button
            onClick={ onClick && onClick }
            className={ `${'button'} ${filled && 'filled'} ${className && className}` }>

            { children }
        </button>
    )
}
export default Button