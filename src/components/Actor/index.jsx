import { getImg } from "../../utils"

const Actor = ({ profile_path, character, name, id }) => {


    return (
        <div className="actor">
            <div className="profile_img">
                <img src={ profile_path ? getImg(profile_path, true) : `https://dummyimage.com/200x200/be123c/000.gif?text=${name}` } alt={ name } />
            </div>
            <div className="profile_text">
                <h3 className="name">{ name }</h3>
                <p style={ { textAlign: 'center', color: 'var(--rose-700)' } }>as</p>
                <p className="character">{ character }</p>
            </div>
        </div>
    )
}
export default Actor