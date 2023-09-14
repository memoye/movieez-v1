import { useEffect, useState } from "react"
import { BASE_URL, getImg, previewStr } from "../../utils"
import axios from "axios";
import { imdb, loadImg, rt } from "../../assets";
import '../../styles/hero.css';
import Loading from "../../components/Loading";
import Ratings from "../../components/Card/Ratings";
import Button from "../../components/Button";
import { HiPlayCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

// ... (imports and other code)
const sample = {
    adult: false,
    backdrop_path: "/4Yon9Qmg3U4onL0OywXAHSkFTUG.jpg",
    genre_ids: [28, 18],
    id: 1163045,
    original_language: "yo",
    original_title: "Jagun Jagun",
    overview: "A young man determined to become a powerful warrior joins an elite army, encountering the wrath of a maniacal warlord and the love of a fierce woman.",
    popularity: 606.008,
    poster_path: "/n0GXumEMtwgYj2M3YW4Iu0veYJg.jpg",
    release_date: "2023-08-10",
    title: "Jagun Jagun",
    video: false,
    vote_average: 6.5,
    vote_count: 41
}


const Hero = () => {
    const endpoint = 'movie/popular'
    const navigate = useNavigate()
    const params = { language: 'en-US', page: '1', region: 'ng' }
    const [isLoading, setIsLoading] = useState(false)
    const [popular, setPopular] = useState([])
    const [dispIndex, setDispIndex] = useState(0)
    const [topMovie, setTopMovie] = useState(sample)


    function fetchData() {
        setIsLoading(true)

        const options = {
            method: 'GET',
            url: BASE_URL + endpoint,
            params: params,
            headers: {
                accept: 'application/json',
                Authorization: import.meta.env.VITE_TMDB_ACCESS_TOKEN
            }
        }

        axios
            .request(options)
            .then(function (response) {
                if (response.status === 200) {
                    setPopular(response.data.results)
                } else {
                    throw new Error('something went wrong! Please refresh the page')
                }
                setIsLoading(false)
            })
            .catch(function (error) {
                setIsLoading(false)
                console.error(error)
            })
    }

    function handleCarousel(index) {
        setDispIndex(index)
    }

    useEffect(() => {
        fetchData();

    }, [])

    useEffect(() => {
        setTopMovie(popular[dispIndex])
    }, [dispIndex]);

    function openDetails() {
        navigate(`/movies/${topMovie?.id}`)

    }

    // Use a separate useEffect to log the popular state after it's updated
    useEffect(() => {
        setTopMovie(popular[dispIndex])
    }, [popular]); // Add popular as a dependency here

    if (isLoading) return <Loading />


    return (

        <div className="hero" >
            { topMovie && <img src={ getImg(topMovie?.backdrop_path, true) } alt={ topMovie?.title } /> }
            <div className="herotext">
                <img className="topPoster" src={ getImg(topMovie?.poster_path, true) } alt={ topMovie?.title } />
                <h1 className="herotext_title">{ topMovie?.title }</h1>
                { topMovie && <Ratings
                    { ...topMovie }
                /> }
                <p className="heroText_desc">{ topMovie && previewStr(topMovie.overview) }</p>
                <Button
                    filled={ true }
                    className={ 'hero_CTA' }
                    onClick={ openDetails }
                >
                    <HiPlayCircle /> <span>Watch Trailer</span>
                </Button>
            </div>
            <div className="sideCtrl">
                {
                    [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] //sorry... 😬
                        .map((btn, index) => (
                            <button
                                key={ btn.id }
                                onClick={ () => {
                                    handleCarousel(index)
                                } }
                                className={ `sideCtrlBtn ${(index === dispIndex) && 'displaying'}` }
                            >{ btn.id }</button>
                        ))
                }
            </div>
        </div >
    )
}

export default Hero;
