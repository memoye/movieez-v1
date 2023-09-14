import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import '../../styles/movies.css'
import { useState, useEffect, useRef } from 'react'
import { BASE_URL } from '../../utils'
import axios from 'axios'
import Loading from '../../components/Loading'
import Button from '../../components/Button'
import { PiStarFill, PiTicketFill } from 'react-icons/pi'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import Actor from '../../components/Actor'
import { BiBookmark, BiHeart, BiListUl, BiShare } from 'react-icons/bi'
import { SlShare } from 'react-icons/sl'
import Card from '../../components/Card'


const DetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [moreCast, setMoreCast] = useState(false)

    const recommended = useRef()

    const [isLoading, setIsLoading] = useState(false)
    const [movieInfo, setMovieInfo] = useState({})
    const [error, setError] = useState('')
    const [credits, setCredits] = useState({}) //.cast .crew to get cast and crew
    const [recommendations, setRecommendations] = useState([])
    const [videos, setVideos] = useState([])
    const [keywords, setKeywords] = useState([])
    const [trailer, setTrailer] = useState('')

    const fetchMovie = () => {
        // Define the URL with query parameters

        setIsLoading(true)

        const apiUrl = `https://api.themoviedb.org/3/movie/${id}`;
        const apiKey = import.meta.env.VITE_TMDB_API_KEY; // Replace with your actual API key
        const appendToResponse = 'credits,similar,keywords,recommendations,videos';

        // Create the full URL with query parameters
        const fullUrl = `${apiUrl}?api_key=${apiKey}&append_to_response=${appendToResponse}`;

        // Fetch the resource
        fetch(fullUrl)
            .then((response) => {
                setIsLoading(false)
                if (!response.ok) {
                    setError('Something went wrong, please reload')
                    throw new Error('Network response was not ok')
                }
                return response.json();
            })
            .then((data) => {
                // set movie details and appended endpoints
                setMovieInfo(data)
                setVideos(data.videos.results)
                setTrailer(data.videos.results.filter(vid => (vid.type === 'Trailer'))[0])
                //  appended endpoints like data.credits, data.similar, data.keywords
            })
            .catch((error) => {
                setError(error.message)
                console.error('Error fetching movie details:', error);
            });

    }

    function getByMostPopular(group, job) {
        if (group === 'crew') {
            return (credits?.crew
                ?.filter(member => member.known_for_department === job)
                ?.sort((a, b) => b.popularity - a.popularity)[0])
        } else if (group == 'cast') {
            return (credits?.cast
                ?.filter(member => member.known_for_department === job)
                // ?.sort((a, b) => b.popularity - a.popularity)

            )
        } else {
            return (credits?.crew
                ?.filter(member => member.known_for_department === job)
                ?.sort((a, b) => b.popularity - a.popularity)
            )
        }
    }


    function handleRecommended(id) {
        navigate(`/movies/${id}`)
    }

    function handleMoreCast() {
        setMoreCast(prev => !prev)
    }

    useEffect(() => {

        if (id !== undefined) fetchMovie(id)
    }, [id])

    useEffect(() => {
        const { credits, recommendations, keywords } = movieInfo

        setCredits(credits)
        setRecommendations(recommendations?.results)
        setKeywords(keywords?.keywords)

    }, [movieInfo])

    if (isLoading) return <Loading />

    if (error) return (
        // <p className='error'>Something went wrong, Please <a href={ `/movies/${id}` } >try again</a></p >
        <Navigate to={ '/movie' } />

    )

    const { title, release_date, overview, runtime } = movieInfo
    return (
        <main className='details'>
            <div className="hs-responsive-embed-youtube">
                { <iframe src={ `https://www.youtube.com/embed/${trailer?.key}` } title={ trailer?.name } allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> }
            </div>
            <section className='movieInfo'>
                <section className='detailsLeft'>
                    <div className='detailsText_heading'>
                        <p className='detailsText_title'><span data-testid={ 'movie-title' }> { title } </span> • <span data-testid={ 'movie-release-date' }> { release_date }</span>  • <span>{ `   ${movieInfo.adult ? '18+' : 'PG-13'} ` }</span> •  <span data-testid={ 'movie-runtime' }>{ runtime } mins</span> </p>
                        <div className='genresContainer'>
                            {
                                movieInfo?.genres
                                    ?.map((genre) => (
                                        <Button className={ 'genre' } key={ genre.id }>
                                            { genre.name }
                                        </Button>
                                    ))
                            }
                        </div>

                    </div>
                    <div>
                        <p data-testid={ 'movie-overview' } className='movieOverview' >{ overview } </p>
                        <p className='movie_star'>Director: <span>{ getByMostPopular('crew', 'Directing')?.name }</span></p>
                        <p className='movie_star'>Writer(s): <span>{ getByMostPopular('_', 'Writing')?.slice(0, 3)?.map(writer => writer.name).join(', ') }</span></p>
                        <p className='movie_star'>Stars: <span>{ getByMostPopular('cast', 'Acting')?.slice(0, 4)?.map(actor => actor.name).join(', ') }</span></p>
                    </div>
                    <div className='popularityNrecommendation'>
                        <Button
                            filled
                        >
                            Popularity { movieInfo.popularity }
                        </Button>

                        <select
                            onChange={ (e) => {
                                handleRecommended(e.target.value)
                            }
                            }
                            className='recommendations'
                            name="recommendations"
                            id="recommendations">
                            <option className='rec_title'>You might also like</option>
                            {
                                recommendations
                                    ?.map(movie => <option value={ movie.id } key={ movie.id }>{ movie.title } </option>)
                            }
                        </select>
                    </div>

                </section>

                <aside className='detailsAside'>

                    <div className='sideActions'>
                        <Button>
                            <BiHeart />
                        </Button>
                        <Button>
                            <SlShare />
                        </Button>
                        <Button>
                            <BiBookmark />
                        </Button>

                        <div className='detailsRatingInfo detailsText_title '>
                            <PiStarFill color='#ff0' />
                            <span>{ movieInfo?.vote_average?.toFixed(1) } </span>
                            <span> | </span>
                            { movieInfo?.vote_count }
                        </div>
                    </div>
                    <div className='moreSideActions'>
                        <Button filled>
                            <PiTicketFill color='#fff' fontSize={ '20px' } /> See Showtimes
                        </Button>

                        <Button>
                            <BiListUl color='#000' fontSize={ '20px' } /> More watch options
                        </Button>
                    </div>
                </aside>
            </section>

            <section>
                <h2 className='title castTitle'>Top Cast <span
                    onClick={ handleMoreCast }
                ><HiOutlineArrowRight className={ `topCastArrow ${moreCast && 'moreCast'}` } /></span> </h2>
                <div className="castGrid">
                    {
                        getByMostPopular('cast', 'Acting')
                            ?.slice(0, (moreCast ? 12 : 4))
                            ?.map(actor => (
                                <Actor
                                    key={ actor.id }
                                    { ...actor }
                                />))
                    }
                </div>
            </section>

            <section className='similarMovies'>
                <h2 className='title'>Similar</h2>
                <div className='cardsGrid'>
                    {
                        movieInfo?.similar?.results
                            ?.map(movie => (<Card
                                key={ movie.id }
                                { ...movie }
                            />))
                    }
                </div>
            </section>
        </main >
    )
}
export default DetailsPage
