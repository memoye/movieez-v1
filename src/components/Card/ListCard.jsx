import '../../styles/card.css'
import { getImg } from '../../utils'

const ListCard = ({ id, poster_path, title, release_date }) => {
    return (
        <div className='listCard'>
            <div className="listCardText">
                <h4 className='movieTitle'></h4>
                <p className='releaseDate'></p>
            </div>
            
            <img src={ getImg(poster_path, false) } alt={ title } />
        </div>
    )
}
export default ListCard