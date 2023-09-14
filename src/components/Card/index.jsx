import { HiHeart, HiOutlineBookOpen } from 'react-icons/hi2'
import '../../styles/card.css'
import { convertToUTC, getImg } from '../../utils'
import Button from '../Button'
import Ratings from './Ratings'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Card = ({ poster_path, id, vote_average, popularity, title, release_date, first_air_date, media_type, name }) => {
    const [poster] = useState(getImg(poster_path, false))


    return (

        <div data-testid='movie-card'
            className='card'
        >
            <Link
                to={ `/movies/${id}` }
            >
                <div className='moviePoster'>
                    { poster_path ?
                        <img data-testid='movie-poster'
                            src={ poster }
                            draggable={ false }
                            alt={ title }

                        />
                        :
                        <img data-testid='movie-poster'
                            src={ `https://dummyimage.com/250x400/eee.png?text=${media_type === 'movie' ? title : name}` }
                            draggable={ false }
                            alt={ title }
                        />
                    }
                </div>
                <div>
                    { <h3 data-testid='movie-title' className='movieTitle' >{ title }</h3> }
                    { <h3 data-testid='movie-title' className='movieTitle' >{ name }</h3> }

                    {
                        media_type === 'movie' ?
                            <p data-testid='movie-release-date' className='releaseDate'>{ release_date }  </p> :
                            <p data-testid='movie-release-date' className='releaseDate'>{ first_air_date }  </p>
                    }
                </div>
                { media_type === 'tv' && <span className='tvLabel'>TV Series</span> }
                <Ratings
                    vote_average={ vote_average }
                    popularity={ popularity }
                />
            </Link>
            <Button
                className={ "likeBtn" }
            >
                <HiHeart />
            </Button>
        </div >
    )
}
export default Card